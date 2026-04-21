/**
 * ZeWork Shared Header Component
 * Quản lý tập trung Header cho toàn bộ website
 */

document.addEventListener('DOMContentLoaded', () => {
    renderHeader();
});

function renderHeader() {
    const headerPlaceholder = document.getElementById('header-placeholder');
    if (!headerPlaceholder) return;

    // 1. Xác định prefix đường dẫn (../)
    const subdirs = ['/zework-mobile', '/bang-gia', '/tinh-nang-zework', '/bai-viet', '/lien-he-zework', '/bao-mat', '/dieu-khoan', '/ve-zework'];
    const isSubdir = subdirs.some(dir => window.location.pathname.includes(dir));
    const prefix = isSubdir ? '../' : '';

    // 2. Xác định trang hiện tại để active menu
    const pathname = window.location.pathname;
    let activeItem = '';
    if (pathname.includes("/zework-mobile")) activeItem = 'didong';
    else if (pathname.includes("/bang-gia")) activeItem = 'banggia';
    else if (pathname.includes("/tinh-nang")) activeItem = 'tinhnang';
    else if (pathname.includes("/bai-viet")) activeItem = 'baiviet';
    else if (pathname.includes("/lien-he")) activeItem = 'lienhe';
    else if (pathname === "/" || pathname.endsWith("index.html")) activeItem = 'trangchu';

    const headerHTML = `
    <header>
        <div class="content-header">
            <a href="${prefix}index.html">
                <div class="logo">
                    <img src="${prefix}img/logoZework.svg" alt="Zework" class="logo-img" width="40" height="40">
                    <h1>ZEWORK</h1>
                </div>
            </a>
            <div class="menu">
                <ul class="ul-menu">
                    <li><a href="${prefix}" class="${activeItem === 'trangchu' ? 'active-menu' : ''}">Trang chủ</a></li>
                    <li><a href="${prefix}tinh-nang-zework/" class="${activeItem === 'tinhnang' ? 'active-menu' : ''}">Tính năng</a></li>
                    <li><a href="${prefix}bang-gia/" class="${activeItem === 'banggia' ? 'active-menu' : ''}">Bảng giá</a></li>
                    <li><a href="${prefix}zework-mobile/" class="${activeItem === 'didong' ? 'active-menu' : ''}">Đồng bộ Mobile</a></li>
                    <li><a href="${prefix}bai-viet/" class="${activeItem === 'baiviet' ? 'active-menu' : ''}">Bài viết</a></li>
                    <li><a href="${prefix}lien-he-zework/" class="${activeItem === 'lienhe' ? 'active-menu' : ''}">Liên hệ</a></li>
                </ul>
            </div>
            <div class="btn-header">
                <button class="btn-header-login">Đăng nhập</button>
                <button class="btn-header-signup">Đăng ký</button>
                <button class="menu-mobile"><i class="fas fa-bars"></i></button>
                <button class="close-menu" style="display:none;"><i class="fas fa-times"></i></button>
            </div>
        </div>
    </header>

    <div class="mobile-menu-popup" id="mobileMenu">
        <ul class="ul-menu">
            <li><a href="${prefix}">Trang chủ</a></li>
            <li><a href="${prefix}tinh-nang-zework/">Tính năng</a></li>
            <li><a href="${prefix}bang-gia/">Bảng giá</a></li>
            <li><a href="${prefix}zework-mobile/">Đồng bộ Mobile</a></li>
            <li><a href="${prefix}bai-viet/">Bài viết</a></li>
            <li><a href="${prefix}lien-he-zework/">Liên hệ</a></li>
        </ul>
        <div class="mobile-auth">
            <button class="btn-signup">Đăng ký</button>
            <button class="btn-login">Đăng nhập</button>
        </div>
    </div>
    `;

    headerPlaceholder.innerHTML = headerHTML;

    // Sau khi render xong, cần khởi tạo lại các sự kiện menu di động
    initHeaderEvents();
}

function initHeaderEvents() {
    const btnMenu = document.querySelector('.menu-mobile');
    const btnClose = document.querySelector('.close-menu');
    const popupMenu = document.querySelector('.mobile-menu-popup');

    if (btnMenu && btnClose && popupMenu) {
        btnMenu.addEventListener('click', () => {
            popupMenu.classList.add('show');
            btnMenu.style.display = "none";
            btnClose.style.display = "block";
            document.body.style.overflow = 'hidden';
        });

        btnClose.addEventListener('click', () => {
            popupMenu.classList.remove('show');
            btnMenu.style.display = "block";
            btnClose.style.display = "none";
            document.body.style.overflow = '';
        });

        // Tự động đóng menu khi click vào link hoặc button
        const mobileInteractives = popupMenu.querySelectorAll('a, button');
        mobileInteractives.forEach(item => {
            item.addEventListener('click', () => {
                popupMenu.classList.remove('show');
                btnMenu.style.display = "block";
                btnClose.style.display = "none";
                document.body.style.overflow = '';
            });
        });
    }
}
