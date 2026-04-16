(function () {
    function detectDevice() {
        const ua = navigator.userAgent.toLowerCase();

        // 1. Kiểm tra thiết bị có hỗ trợ cảm ứng (Touch)
        const hasTouch = ('ontouchstart' in window) || (navigator.maxTouchPoints > 0) || (navigator.msMaxTouchPoints > 0);

        // 2. Nhận diện chuỗi User-Agent cho Mobile và Tablet
        // Android tablet thường chứa 'android' nhưng KHÔNG chứa 'mobile'
        const isMobileUA = /android.*mobile|webos|iphone|ipod|blackberry|iemobile|opera mini/.test(ua);
        const isTabletUA = (/ipad|android/.test(ua) && !/mobile/.test(ua));

        // Đặc trị: Từ iOS 13+, iPad Pro tự giả lập User-Agent thành Macintosh (Desktop) 
        // -> Cần kiểm tra nền tảng MacIntel kết hợp với màn hình cảm ứng
        const isIPadOS = navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1;

        // 3. Đánh giá tổng hợp
        if (isMobileUA && hasTouch) {
            return 'is-mobile';
        } else if ((isTabletUA || isIPadOS) && hasTouch) {
            return 'is-tablet';
        } else {
            return 'is-desktop';
        }
    }

    // Gắn class tương ứng vào thẻ <body> ngay khi JS khởi chạy
    const deviceClass = detectDevice();
    
    // Đảm bảo DOM đã sẵn sàng (chạy ở <head> hay <body> đều ok)
    if (document.body) {
        document.body.classList.add(deviceClass);
    } else {
        document.addEventListener('DOMContentLoaded', () => {
            document.body.classList.add(deviceClass);
        });
    }
})();
