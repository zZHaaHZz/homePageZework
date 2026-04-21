/**
 * ZeWork Shared Footer Component
 * Quản lý tập trung Footer cho toàn bộ website
 */

document.addEventListener('DOMContentLoaded', () => {
    renderFooter();
});

function renderFooter() {
    const footerPlaceholder = document.getElementById('footer-placeholder');
    if (!footerPlaceholder) return;

    // 1. Xác định prefix đường dẫn (../)
    const subdirs = ['/zework-mobile', '/bang-gia', '/tinh-nang-zework', '/bai-viet', '/lien-he-zework', '/bao-mat', '/dieu-khoan', '/ve-zework'];
    const isSubdir = subdirs.some(dir => window.location.pathname.includes(dir));
    const prefix = isSubdir ? '../' : '';

    const footerHTML = `
    <footer>
        <div class="CTA">
            <h1>Trải nghiệm miễn phí <div class="hyphen"><svg id="fi_13132410" fill="currentColor"
                        enable-background="new 0 0 110 110" height="110" viewBox="0 0 110 110" width="110"
                        xmlns="http://www.w3.org/2000/svg">
                        <path d="m96 46h-82c-4.971 0-9 4.029-9 9s4.029 9 9 9h82c4.971 0 9-4.029 9-9s-4.029-9-9-9z">
                        </path>
                    </svg></div>1 phút để bắt đầu</h1>
            <p>Hơn 2.000 doanh nghiệp đang dùng Zework để quản lý và chăm sóc khách hàng hiệu quả hơn mỗi ngày </p>
            <div class="footer-cta-buttons" style="margin-top: 3.2rem;">
                <button class="experience">Trải nghiệm miễn phí ngay</button>
                <button class="btn-consult open-consult-modal">
                    <i class="fas fa-headset"></i> Nhận tư vấn 1–1
                </button>
            </div>
        </div>
        <div class="main-footer">
            <div class="left-main-footer">
                <div class="logo-footer">
                    <a href="${prefix}">
                        <div class="logo">
                            <img src="${prefix}img/logoZework.svg" alt="Zework" class="logo-img" loading="lazy" width="40"
                                height="40">
                            <h1>ZEWORK</h1>
                        </div>
                    </a>
                </div>
                <p>Nền tảng quản lý dữ liệu tập trung, tối ưu quy trình chăm sóc khách hàng</p>

                <div class="footer-download-container">
                    <p class="download-caption">Bản cài đặt cho máy tính</p>
                    <div class="box-download">
                        <button class="downMacOs">
                            <svg fill="currentColor" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg"
                                style="width: 2.2rem;">
                                <g fill="currentColor" id="Mac" fill="#222">
                                    <path fill="currentColor"
                                        d="m24.69 62.05a10.17 10.17 0 0 1 -3.58-.67c-4.55-1.71-6.74-6.57-8.5-10.47-.43-.95-.84-1.85-1.25-2.64-2.94-5.74-3.36-14.27-1-20.76 1.42-3.93 3.68-6.64 6.52-7.83 5.25-2.23 9.18-1.11 12.33-.21a13.89 13.89 0 0 0 3.65.74 2 2 0 0 1 0 4 17.28 17.28 0 0 1 -4.75-.89c-2.81-.8-5.72-1.63-9.68 0-1.76.74-3.29 2.7-4.31 5.51-2 5.43-1.64 12.82.8 17.57.46.89.88 1.83 1.33 2.82 1.54 3.4 3.27 7.25 6.27 8.37 2.3.87 4 .21 6.07-.54a12.16 12.16 0 0 1 4.27-1 2 2 0 0 1 0 4 9.2 9.2 0 0 0 -2.88.77 14.76 14.76 0 0 1 -5.29 1.23z">
                                    </path>
                                    <path fill="currentColor"
                                        d="m41 62.05a14.76 14.76 0 0 1 -5.29-1.21 9.2 9.2 0 0 0 -2.88-.77 2 2 0 0 1 0-4 12.26 12.26 0 0 1 4.28 1c2 .76 3.77 1.41 6.07.54 3-1.12 4.73-5 6.26-8.37.45-1 .88-1.93 1.33-2.82.18-.36.36-.74.52-1.13a2 2 0 1 1 3.71 1.53c-.2.49-.42 1-.65 1.43-.42.81-.82 1.71-1.25 2.65-1.76 3.91-3.95 8.77-8.51 10.48a10.17 10.17 0 0 1 -3.59.67z">
                                    </path>
                                    <path fill="currentColor"
                                        d="m52.13 27.31a2 2 0 0 1 -1.71-1 7 7 0 0 0 -3.13-3c-3.95-1.67-6.86-.84-9.68 0a17.65 17.65 0 0 1 -4.75.88 2 2 0 0 1 0-4 14.32 14.32 0 0 0 3.66-.73c3.15-.9 7.07-2 12.33.2a10.88 10.88 0 0 1 5 4.6 2 2 0 0 1 -1.71 3z">
                                    </path>
                                    <path
                                        d="m32.55 18.67a7.77 7.77 0 0 1 -1-.06 2 2 0 0 1 -1.75-2c-.06-8 4.75-13.87 12-14.67a2 2 0 0 1 2.2 1.77 14 14 0 0 1 -4 11.56 10.9 10.9 0 0 1 -7.45 3.4zm7.52-12.23c-3.31 1.17-5.54 4.08-6.1 8a8 8 0 0 0 3.23-2 10 10 0 0 0 2.87-6z">
                                    </path>
                                    <path fill="currentColor"
                                        d="m53.17 48.06a2 2 0 0 1 -1.17-.34c-3.67-2.51-6.17-7.34-6.37-12.3a13.91 13.91 0 0 1 5.2-11.67 2 2 0 1 1 2.52 3.11 9.89 9.89 0 0 0 -3.72 8.39 12 12 0 0 0 4.63 9.16 2 2 0 0 1 .52 2.78 2 2 0 0 1 -1.61.87z">
                                    </path>
                                </g>
                            </svg>
                            <span>macOS</span>
                        </button>
                        <button class="downWin">
                            <svg fill="currentColor" version="1.1" id="fi_888882" xmlns="http://www.w3.org/2000/svg"
                                xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 512 512"
                                style="width: 2.1rem;" xml:space="preserve">
                                <path style="fill:#F44336;" d="M201.302,49.754l-192,24.939C3.949,75.384-0.044,79.963,0,85.36v149.333
	c0,5.891,4.776,10.667,10.667,10.667h192c5.891,0,10.667-4.776,10.667-10.667V60.314c-0.004-3.064-1.325-5.978-3.627-8
	C207.388,50.32,204.339,49.391,201.302,49.754z"></path>
                                <path style="fill:#4CAF50;" d="M508.374,13.36c-2.286-2.06-5.35-3.032-8.405-2.667l-256,33.387
	c-5.352,0.691-9.346,5.27-9.301,10.667v179.947c0,5.891,4.776,10.667,10.667,10.667h256c5.891,0,10.667-4.776,10.667-10.667V21.36
	C511.997,18.296,510.675,15.382,508.374,13.36z"></path>
                                <path style="fill:#2196F3;" d="M202.667,266.693h-192C4.776,266.693,0,271.469,0,277.36v149.333
	c-0.044,5.397,3.949,9.976,9.301,10.667l192,25.045c0.455,0.031,0.911,0.031,1.365,0c5.891,0,10.667-4.776,10.667-10.667V277.36
	C213.334,271.469,208.558,266.693,202.667,266.693z"></path>
                                <path style="fill:#FFC107;" d="M501.334,266.693h-256c-5.891,0-10.667,4.776-10.667,10.667v179.947
	c-0.044,5.397,3.949,9.976,9.301,10.667l256,33.387c0.455,0.031,0.911,0.031,1.365,0c5.891,0,10.667-4.776,10.667-10.667v0V277.36
	C512,271.469,507.225,266.693,501.334,266.693z"></path>
                            </svg>
                            <span>Windows</span>
                        </button>
                    </div>
                    <p class="secondary-webapp-note">
                        Bạn chỉ cần tải app khi muốn <b>Gọi</b>. Các tính năng khác hãy trải nghiệm ngay trên bản
                        Web
                        tại
                        <a href="https://app.zework.com" target="_blank">app.zework.com</a>
                    </p>

                    <a href="https://apps.apple.com/us/app/zework/id6761233933" target="_blank"
                        class="btn-download-app-device" style="margin-top: 1.6rem;">
                        <svg class="svg-appstore" viewBox="0 0 540 160" xmlns="http://www.w3.org/2000/svg"
                            fill="#000000">
                            <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                            <g id="SVGRepo_iconCarrier">
                                <g transform="scale(4.00216 4.0011)">
                                    <path fill="#FFF"
                                        d="M134.032 35.268a3.83 3.83 0 0 1-3.834 3.83H4.729a3.835 3.835 0 0 1-3.839-3.83V4.725A3.84 3.84 0 0 1 4.729.89h125.468a3.834 3.834 0 0 1 3.834 3.835l.001 30.543z">
                                    </path>
                                    <path fill="#A6A6A6"
                                        d="M130.198 39.989H4.729A4.73 4.73 0 0 1 0 35.268V4.726A4.733 4.733 0 0 1 4.729 0h125.468a4.735 4.735 0 0 1 4.729 4.726v30.542c.002 2.604-2.123 4.721-4.728 4.721z">
                                    </path>
                                    <path
                                        d="M134.032 35.268a3.83 3.83 0 0 1-3.834 3.83H4.729a3.835 3.835 0 0 1-3.839-3.83V4.725A3.84 3.84 0 0 1 4.729.89h125.468a3.834 3.834 0 0 1 3.834 3.835l.001 30.543z">
                                    </path>
                                    <path fill="#FFF"
                                        d="M30.128 19.784c-.029-3.223 2.639-4.791 2.761-4.864-1.511-2.203-3.853-2.504-4.676-2.528-1.967-.207-3.875 1.177-4.877 1.177-1.022 0-2.565-1.157-4.228-1.123-2.14.033-4.142 1.272-5.24 3.196-2.266 3.923-.576 9.688 1.595 12.859 1.086 1.554 2.355 3.287 4.016 3.226 1.625-.066 2.232-1.035 4.193-1.035 1.943 0 2.513 1.035 4.207.996 1.744-.027 2.842-1.56 3.89-3.127 1.255-1.779 1.759-3.533 1.779-3.623-.04-.014-3.386-1.292-3.42-5.154zM26.928 10.306c.874-1.093 1.472-2.58 1.306-4.089-1.265.056-2.847.875-3.758 1.944-.806.942-1.526 2.486-1.34 3.938 1.421.106 2.88-.717 3.792-1.793z">
                                    </path>
                                    <linearGradient id="footer_a" gradientUnits="userSpaceOnUse" x1="-23.235" y1="97.431"
                                        x2="-23.235" y2="61.386"
                                        gradientTransform="matrix(4.0022 0 0 4.0011 191.95 -349.736)">
                                        <stop offset="0" stop-color="#1a1a1a" stop-opacity=".1"></stop>
                                        <stop offset=".123" stop-color="#212121" stop-opacity=".151"></stop>
                                        <stop offset=".308" stop-color="#353535" stop-opacity=".227"></stop>
                                        <stop offset=".532" stop-color="#575757" stop-opacity=".318"></stop>
                                        <stop offset=".783" stop-color="#858585" stop-opacity=".421"></stop>
                                        <stop offset="1" stop-color="#b3b3b3" stop-opacity=".51"></stop>
                                    </linearGradient>
                                    <path fill="url(#footer_a)"
                                        d="M130.198 0H62.993l26.323 39.989h40.882a4.733 4.733 0 0 0 4.729-4.724V4.726A4.734 4.734 0 0 0 130.198 0z">
                                    </path>
                                    <g fill="#FFF">
                                        <path
                                            d="M53.665 31.504h-2.271l-1.244-3.909h-4.324l-1.185 3.909H42.43l4.285-13.308h2.646l4.304 13.308zm-3.89-5.549L48.65 22.48c-.119-.355-.343-1.191-.671-2.507h-.04c-.132.566-.343 1.402-.632 2.507l-1.106 3.475h3.574zM64.663 26.588c0 1.632-.443 2.922-1.33 3.869-.794.843-1.781 1.264-2.958 1.264-1.271 0-2.185-.453-2.74-1.361v5.035h-2.132V25.062c0-1.025-.027-2.076-.079-3.154h1.875l.119 1.521h.04c.711-1.146 1.79-1.719 3.238-1.719 1.132 0 2.077.447 2.833 1.342.755.897 1.134 2.075 1.134 3.536zm-2.172.078c0-.934-.21-1.704-.632-2.311-.461-.631-1.08-.947-1.856-.947-.526 0-1.004.176-1.431.523-.428.35-.708.807-.839 1.373a2.784 2.784 0 0 0-.099.649v1.601c0 .697.214 1.286.642 1.768.428.48.984.721 1.668.721.803 0 1.428-.311 1.875-.928.448-.619.672-1.435.672-2.449zM75.7 26.588c0 1.632-.443 2.922-1.33 3.869-.795.843-1.781 1.264-2.959 1.264-1.271 0-2.185-.453-2.74-1.361v5.035h-2.132V25.062c0-1.025-.027-2.076-.079-3.154h1.875l.119 1.521h.04c.71-1.146 1.789-1.719 3.238-1.719 1.131 0 2.076.447 2.834 1.342.754.897 1.134 2.075 1.134 3.536zm-2.173.078c0-.934-.211-1.704-.633-2.311-.461-.631-1.078-.947-1.854-.947-.526 0-1.004.176-1.433.523-.428.35-.707.807-.838 1.373-.065.264-.1.479-.1.649v1.601c0 .697.215 1.286.641 1.768.428.479.984.721 1.67.721.804 0 1.429-.311 1.875-.928.448-.619.672-1.435.672-2.449zM88.04 27.771c0 1.133-.396 2.054-1.183 2.765-.866.776-2.075 1.165-3.625 1.165-1.432 0-2.58-.276-3.446-.829l.493-1.777c.935.554 1.962.83 3.08.83.804 0 1.429-.182 1.875-.543.447-.362.673-.846.673-1.45 0-.541-.187-.994-.554-1.363-.369-.368-.979-.711-1.836-1.026-2.33-.869-3.496-2.14-3.496-3.812 0-1.092.412-1.986 1.234-2.685.822-.698 1.912-1.047 3.268-1.047 1.211 0 2.22.211 3.021.632l-.535 1.738c-.754-.408-1.605-.612-2.557-.612-.752 0-1.342.185-1.764.553-.355.329-.535.73-.535 1.206 0 .525.205.961.613 1.303.354.315 1 .658 1.934 1.026 1.146.462 1.988 1 2.527 1.618.543.618.813 1.389.813 2.308zM95.107 23.508h-2.35v4.659c0 1.185.414 1.776 1.244 1.776.381 0 .697-.032.947-.099l.059 1.619c-.42.157-.973.236-1.658.236-.842 0-1.5-.257-1.975-.771-.473-.514-.711-1.375-.711-2.587v-4.837h-1.4v-1.6h1.4v-1.757l2.094-.632v2.389h2.35v1.604zM105.689 26.627c0 1.475-.422 2.686-1.264 3.633-.881.975-2.053 1.461-3.514 1.461-1.41 0-2.531-.467-3.367-1.4-.836-.935-1.254-2.113-1.254-3.534 0-1.487.432-2.705 1.293-3.652.863-.948 2.025-1.422 3.486-1.422 1.408 0 2.539.468 3.395 1.402.818.906 1.225 2.076 1.225 3.512zm-2.21.049c0-.879-.19-1.633-.571-2.264-.447-.762-1.087-1.143-1.916-1.143-.854 0-1.509.381-1.955 1.143-.382.631-.572 1.398-.572 2.304 0 .88.19 1.636.572 2.265.461.762 1.104 1.143 1.937 1.143.815 0 1.454-.389 1.916-1.162.392-.646.589-1.405.589-2.286zM112.622 23.783a3.71 3.71 0 0 0-.672-.059c-.75 0-1.33.282-1.738.85-.354.5-.532 1.132-.532 1.895v5.035h-2.132V24.93a67.43 67.43 0 0 0-.062-3.021h1.857l.078 1.836h.059c.226-.631.58-1.14 1.066-1.521a2.578 2.578 0 0 1 1.541-.514c.197 0 .375.014.533.039l.002 2.034zM122.157 26.252a5 5 0 0 1-.078.967h-6.396c.024.948.334 1.674.928 2.174.539.446 1.236.67 2.092.67.947 0 1.811-.15 2.588-.453l.334 1.479c-.908.396-1.98.593-3.217.593-1.488 0-2.656-.438-3.506-1.312-.848-.875-1.273-2.051-1.273-3.524 0-1.446.395-2.651 1.186-3.612.828-1.026 1.947-1.539 3.355-1.539 1.383 0 2.43.513 3.141 1.539.563.813.846 1.821.846 3.018zm-2.033-.553c.015-.633-.125-1.178-.414-1.639-.369-.594-.937-.89-1.698-.89-.697 0-1.265.289-1.697.869-.355.461-.566 1.015-.631 1.658l4.44.002z">
                                        </path>
                                    </g>
                                    <g fill="#FFF">
                                        <path
                                            d="M45.211 13.491c-.593 0-1.106-.029-1.533-.078V6.979a11.606 11.606 0 0 1 1.805-.136c2.445 0 3.571 1.203 3.571 3.164 0 2.262-1.33 3.484-3.843 3.484zm.358-5.823c-.33 0-.611.02-.844.068v4.891c.126.02.368.029.708.029 1.602 0 2.514-.912 2.514-2.62 0-1.523-.825-2.368-2.378-2.368zM52.563 13.54c-1.378 0-2.271-1.029-2.271-2.426 0-1.456.912-2.494 2.349-2.494 1.358 0 2.271.98 2.271 2.417 0 1.474-.941 2.503-2.349 2.503zm.04-4.154c-.757 0-1.242.708-1.242 1.698 0 .971.495 1.679 1.232 1.679s1.232-.757 1.232-1.699c0-.96-.485-1.678-1.222-1.678zM62.77 8.717l-1.475 4.716h-.961l-.611-2.048a15.53 15.53 0 0 1-.379-1.523h-.02c-.077.514-.223 1.029-.378 1.523l-.65 2.048h-.971l-1.388-4.716h1.077l.534 2.242c.126.534.232 1.038.32 1.514h.02c.077-.397.203-.893.388-1.504l.67-2.251h.854l.641 2.203c.155.534.281 1.058.379 1.553h.028c.068-.485.175-1 .32-1.553l.573-2.203 1.029-.001zM68.2 13.433h-1.048v-2.708c0-.834-.32-1.252-.951-1.252-.621 0-1.048.534-1.048 1.155v2.805h-1.048v-3.368c0-.417-.01-.864-.039-1.349h.922l.049.728h.029c.282-.504.854-.824 1.495-.824.99 0 1.64.757 1.64 1.989l-.001 2.824zM71.09 13.433h-1.049v-6.88h1.049v6.88zM74.911 13.54c-1.377 0-2.271-1.029-2.271-2.426 0-1.456.912-2.494 2.348-2.494 1.359 0 2.271.98 2.271 2.417.001 1.474-.941 2.503-2.348 2.503zm.039-4.154c-.757 0-1.242.708-1.242 1.698 0 .971.496 1.679 1.231 1.679.738 0 1.232-.757 1.232-1.699.001-.96-.483-1.678-1.221-1.678zM81.391 13.433l-.076-.543h-.028c-.32.437-.787.65-1.379.65-.845 0-1.445-.592-1.445-1.388 0-1.164 1.009-1.766 2.756-1.766v-.087c0-.621-.329-.932-.979-.932-.465 0-.873.117-1.232.35l-.213-.689c.436-.272.98-.408 1.619-.408 1.232 0 1.854.65 1.854 1.951v1.737c0 .476.021.845.068 1.126l-.945-.001zm-.144-2.349c-1.164 0-1.748.282-1.748.951 0 .495.301.737.719.737.533 0 1.029-.407 1.029-.96v-.728zM87.357 13.433l-.049-.757h-.029c-.301.572-.807.864-1.514.864-1.137 0-1.979-1-1.979-2.407 0-1.475.873-2.514 2.065-2.514.631 0 1.078.213 1.33.641h.021V6.553h1.049v5.609c0 .456.011.883.039 1.271h-.933zm-.155-2.775c0-.66-.437-1.223-1.104-1.223-.777 0-1.252.689-1.252 1.659 0 .951.493 1.602 1.231 1.602.659 0 1.125-.573 1.125-1.252v-.786zM94.902 13.54c-1.377 0-2.27-1.029-2.27-2.426 0-1.456.912-2.494 2.348-2.494 1.359 0 2.271.98 2.271 2.417.001 1.474-.94 2.503-2.349 2.503zm.039-4.154c-.756 0-1.241.708-1.241 1.698 0 .971.495 1.679 1.231 1.679.738 0 1.232-.757 1.232-1.699.002-.96-.483-1.678-1.222-1.678zM102.887 13.433h-1.049v-2.708c0-.834-.32-1.252-.951-1.252-.621 0-1.047.534-1.047 1.155v2.805h-1.049v-3.368c0-.417-.01-.864-.039-1.349h.922l.049.728h.029c.281-.504.854-.825 1.494-.825.99 0 1.641.757 1.641 1.989v2.825zM109.938 9.503h-1.153v2.29c0 .583.202.874.61.874.185 0 .34-.02.465-.049l.029.796c-.203.078-.475.117-.813.117-.826 0-1.32-.456-1.32-1.65V9.503h-.688v-.786h.688v-.864l1.029-.311v1.174h1.153v.787zM115.486 13.433h-1.047v-2.688c0-.844-.319-1.271-.951-1.271-.543 0-1.049.369-1.049 1.116v2.843h-1.047v-6.88h1.047v2.833h.021c.33-.514.808-.767 1.418-.767.998 0 1.608.776 1.608 2.009v2.805zM121.17 11.327h-3.145c.02.893.611 1.397 1.486 1.397.465 0 .893-.078 1.271-.223l.163.728c-.446.194-.971.291-1.582.291-1.475 0-2.348-.932-2.348-2.377 0-1.446.894-2.533 2.23-2.533 1.205 0 1.961.893 1.961 2.242a2.02 2.02 0 0 1-.036.475zm-.961-.747c0-.728-.367-1.242-1.037-1.242-.602 0-1.078.524-1.146 1.242h2.183z">
                                        </path>
                                    </g>
                                </g>
                            </g>
                        </svg>
                    </a>
                </div>
            </div>
            <div class="right-main-footer">
                <div>
                    <h2>Sản phẩm</h2>
                    <a href="${prefix}">
                        <p>Tổng quan</p>
                    </a>
                    <a href="${prefix}tinh-nang-zework/">
                        <p>Tính năng</p>
                    </a>
                    <a href="${prefix}bang-gia/">
                        <p>Bảng giá</p>
                    </a>
                    <a href="${prefix}bai-viet/">
                        <p>Bài viết</p>
                    </a>
                </div>
                <div>
                    <h2>Điều khoản</h2>
                    <a href="${prefix}dieu-khoan/">
                        <p>Điều khoản</p>
                    </a>
                    <a href="${prefix}bao-mat/">
                        <p>Bảo mật</p>
                    </a>
                    <a href="${prefix}lien-he-zework/">
                        <p>Liên hệ</p>
                    </a>
                </div>
                <div>
                    <h2>Mạng xã hội</h2>
                    <a href="https://www.facebook.com/zeworkcom" target="_blank" rel="noopener noreferrer">
                        <p>Facebook</p>
                    </a>
                    <a href="https://x.com/_zework" target="_blank" rel="noopener noreferrer">
                        <p>X</p>
                    </a>
                    <p>LinkedIn</p>
                </div>
                <div>
                    <h2>ZEWORK CO., LTD</h2>
                    <a href="${prefix}ve-zework/">
                        <p>Về chúng tôi</p>
                    </a>
                    <p>Mã số thuế: 0111275923</p>
                    <h2 style="margin-top: 1rem; margin-bottom: 1rem;">Hotline</h2>
                    <a href="tel:0982303333">
                        <p>
                            0982303333
                        </p>
                    </a>

                    <h2>Địa chỉ</h2>

                    <a href="https://maps.app.goo.gl/XqnTPHBvFXWi5mEZ6">
                        <p>
                            29-T1 P. Hoàng Đạo Thúy, Trung Hoà, Cầu Giấy, Hà Nội</p>
                    </a>

                </div>
            </div>
        </div>
        <div class="bottom-footer">
            <div class="main-bottom-footer">
                <p>© 2025 ZEWORK CO., LTD</p>
                <div class="icon-Social">
                    <a href="https://www.facebook.com/zeworkcom" target="_blank" rel="noopener noreferrer"
                        aria-label="Facebook của Zework"><i class="fa-brands fa-facebook"></i></a>
                    <a href="https://x.com/_zework" target="_blank" rel="noopener noreferrer" aria-label="X của Zework">
                        <svg fill="currentColor" id="fi_5968958" enable-background="new 0 0 1226.37 1226.37"
                            viewBox="0 0 1226.37 1226.37" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="m727.348 519.284 446.727-519.284h-105.86l-387.893 450.887-309.809-450.887h-357.328l468.492 681.821-468.492 544.549h105.866l409.625-476.152 327.181 476.152h357.328l-485.863-707.086zm-144.998 168.544-47.468-67.894-377.686-540.24h162.604l304.797 435.991 47.468 67.894 396.2 566.721h-162.604l-323.311-462.446z">
                            </path>
                        </svg></a>
                    <a href="https://www.tiktok.com/@zeworkapp" target="_blank" rel="noopener noreferrer"
                        aria-label="TikTok của Zework"><i class="fa-brands fa-tiktok" aria-hidden="true"></i></a>
                </div>
            </div>
        </div>
    </footer>

    <!-- ========== CONSULTATION MODAL (Shared) ========== -->
    <div class="consult-modal-overlay" id="consultModal">
        <div class="consult-modal-content">
            <button class="consult-modal-close" id="closeConsultModal">
                <i class="fas fa-times"></i>
            </button>
            <div class="consult-modal-header">
                <h2>Đặt lịch tư vấn miễn phí</h2>
                <p>Zework sẽ liên hệ lại bạn trong vòng 30 phút để hỗ trợ giải pháp tối ưu nhất cho doanh nghiệp.</p>
            </div>
            <form class="consult-form" id="consultForm" method="POST" action="javascript:void(0);">
                <div class="consult-form-row">
                    <div class="consult-form-group">
                        <label for="consult-name"><i class="fas fa-user"></i> Họ và tên <span>*</span></label>
                        <input type="text" id="consult-name" name="name" placeholder="Nguyễn Văn A" required>
                    </div>
                    <div class="consult-form-group">
                        <label for="consult-phone"><i class="fas fa-phone"></i> Số điện thoại <span>*</span></label>
                        <input type="tel" id="consult-phone" name="phone" placeholder="0912 345 678" required>
                    </div>
                </div>
                <div class="consult-form-group">
                    <label for="consult-email"><i class="fas fa-envelope"></i> Email <span>*</span></label>
                    <input type="email" id="consult-email" name="email" placeholder="email@company.com" required>
                </div>
                <div class="consult-form-group">
                    <label for="consult-subject"><i class="fas fa-tag"></i> Bạn quan tâm đến</label>
                    <select id="consult-subject" name="subject">
                        <option value="consultation">Cần tư vấn giải pháp</option>
                        <option value="demo">Đặt lịch demo sản phẩm</option>
                        <option value="pricing">Hỏi về bảng giá</option>
                        <option value="partnership">Hợp tác kinh doanh</option>
                    </select>
                </div>
                <div class="consult-form-group">
                    <label for="consult-message"><i class="fas fa-comment-dots"></i> Ghi chú thêm</label>
                    <textarea id="consult-message" name="message"
                        placeholder="Ví dụ: Tôi muốn tư vấn cho đội ngũ 50 người..." rows="3"></textarea>
                </div>
                <!-- Turnstile placeholder -->
                <div id="modal-turnstile" style="margin: 0 auto;"></div>

                <button type="submit" class="consult-submit-btn">
                    <i class="fas fa-paper-plane"></i> Gửi yêu cầu ngay
                </button>
            </form>
        </div>
    </div>
    `;

    footerPlaceholder.innerHTML = footerHTML;
}
