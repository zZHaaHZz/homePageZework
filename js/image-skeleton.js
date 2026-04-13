/**
 * image-skeleton.js
 * ─────────────────────────────────────────────────────────────────────────────
 * Skeleton Loader toàn hệ thống cho <img> và <svg> của Zework.
 *
 * Cách hoạt động:
 *  1. Quét toàn bộ <img> đủ điều kiện (không quá nhỏ, không bị loại trừ).
 *  2. Bọc mỗi ảnh vào <div class="skeleton-placeholder"> giữ chỗ + shimmer.
 *  3. Ẩn ảnh bằng class .img-hidden cho đến khi tải xong.
 *  4. Khi sự kiện load hoàn tất → gỡ placeholder, thêm .img-fade-in.
 *  5. Xử lý ảnh đã cache (complete = true) để không bị frozen skeleton.
 *
 * Điều kiện KHÔNG áp skeleton:
 *  - Ảnh có class "no-skeleton"
 *  - Ảnh có attribute "data-no-skeleton"
 *  - Ảnh có kích thước tự nhiên <= SKIP_SIZE_PX (icon nhỏ)
 *  - Ảnh là con của .video-skeleton (đã có skeleton riêng)
 *  - Ảnh nằm trong <header> logo (tránh layout shift header)
 *
 * ─────────────────────────────────────────────────────────────────────────────
 */

(function () {
    'use strict';

    /* ── Cấu hình ── */
    const SKIP_SIZE_PX  = 40;               // pixel — ảnh <= size này sẽ bị bỏ qua
    const FAILSAFE_MS   = 8000;             // ms  — timeout fail-safe gỡ skeleton
    const SKIP_SELECTORS = [               // selector — các container loại trừ
        '.video-skeleton',
        '.logo',                           // logo header
        '.video-skeleton *'
    ].join(', ');

    /* ── Utility: kiểm tra xem phần tử có thuộc vùng loại trừ không ── */
    function isExcluded(el) {
        if (el.classList.contains('no-skeleton'))    return true;
        if (el.hasAttribute('data-no-skeleton'))     return true;
        if (el.closest('.video-skeleton'))           return true;
        if (el.closest('.logo'))                     return true;  // logo header/footer
        return false;
    }

    /* ── Utility: lấy class display của ảnh để gán đúng cho wrapper ── */
    function getDisplayType(el) {
        const cs = window.getComputedStyle(el);
        const d  = cs.getPropertyValue('display');
        return (d === 'block' || d === 'flex' || d === 'grid') ? 'sk-block' : '';
    }

    /* ── Hàm bọc ảnh vào skeleton placeholder ── */
    function wrapWithSkeleton(img) {
        if (isExcluded(img)) return;

        // Bỏ qua ảnh không có src thực
        if (!img.src || img.src === window.location.href) return;

        // Tạo wrapper
        const wrapper = document.createElement('div');
        wrapper.className = 'skeleton-placeholder ' + getDisplayType(img);

        // Copy các style thiết yếu để wrapper khớp kích thước
        const cs = window.getComputedStyle(img);
        const w  = img.getAttribute('width')  || cs.width;
        const h  = img.getAttribute('height') || cs.height;

        if (w && w !== 'auto' && w !== '0px') wrapper.style.width  = (w.includes('px') || w.includes('%') || w.includes('rem') || w.includes('em')) ? w : (w + 'px');
        if (h && h !== 'auto' && h !== '0px') wrapper.style.height = (h.includes('px') || h.includes('%') || h.includes('rem') || h.includes('em')) ? h : (h + 'px');

        // Kế thừa border-radius nếu có
        const br = cs.getPropertyValue('border-radius');
        if (br && br !== '0px') wrapper.style.borderRadius = br;

        // Chèn wrapper vào DOM trước ảnh
        img.parentNode.insertBefore(wrapper, img);
        wrapper.appendChild(img);

        // Ẩn ảnh trong khi chờ tải
        img.classList.add('img-hidden');

        /* ── Hàm kết thúc skeleton ── */
        function revealImage() {
            img.classList.remove('img-hidden');
            img.classList.add('img-fade-in');

            // Unwrap: đưa ảnh trở lại vị trí cũ rồi xóa wrapper shimmer
            if (wrapper.parentNode) {
                wrapper.parentNode.insertBefore(img, wrapper);
                wrapper.parentNode.removeChild(wrapper);
            }
        }

        // Nếu ảnh đã được cache → hiện ngay
        if (img.complete && img.naturalWidth > 0) {
            // Dùng requestAnimationFrame để tránh blocking paint
            requestAnimationFrame(revealImage);
            return;
        }

        // Bỏ qua ảnh quá nhỏ (icon) sau khi tải xong kích thước tự nhiên
        img.addEventListener('load', function onLoad() {
            img.removeEventListener('load', onLoad);
            img.removeEventListener('error', onError);

            if (img.naturalWidth > 0 && img.naturalWidth <= SKIP_SIZE_PX &&
                img.naturalHeight > 0 && img.naturalHeight <= SKIP_SIZE_PX) {
                // Ảnh icon nhỏ → hiện ngay không cần fade
                img.classList.remove('img-hidden');
                if (wrapper.parentNode) {
                    wrapper.parentNode.insertBefore(img, wrapper);
                    wrapper.parentNode.removeChild(wrapper);
                }
                return;
            }

            revealImage();
        }, { once: true });

        // Xử lý lỗi tải ảnh → cũng gỡ skeleton để không bị đóng băng
        function onError() {
            img.removeEventListener('load', revealImage);
            img.removeEventListener('error', onError);
            revealImage();
        }
        img.addEventListener('error', onError, { once: true });

        // Fail-safe: nếu sau FAILSAFE_MS vẫn còn skeleton → gỡ luôn
        setTimeout(function () {
            if (img.classList.contains('img-hidden')) {
                console.warn('[ImageSkeleton] Fail-safe triggered for:', img.src);
                revealImage();
            }
        }, FAILSAFE_MS);
    }

    /* ── Khởi tạo: quét tất cả <img> ── */
    function init() {
        const images = document.querySelectorAll('img');

        images.forEach(function (img) {
            try {
                wrapWithSkeleton(img);
            } catch (e) {
                // Không để lỗi của một ảnh phá vỡ toàn bộ
                console.warn('[ImageSkeleton] Error wrapping image:', e);
            }
        });

        console.log('[ImageSkeleton] Initialized — processed ' + images.length + ' images.');
    }

    /* ── Chạy khi DOM sẵn sàng ── */
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        // DOM đã tải xong (script defer hoặc cuối body)
        init();
    }

})();
