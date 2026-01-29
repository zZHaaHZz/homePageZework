document.addEventListener('DOMContentLoaded', () => {

    // Select existing elements
    const overlay = document.getElementById('securityOverlay');
    const packetLayer = document.getElementById('packetLayer');
    const statusTitle = document.getElementById('statusTitle');
    const statusDesc = document.getElementById('statusDesc');
    const hubCenter = document.querySelector('.hub-center');

    if (!overlay) {
        console.error("Security Overlay HTML structure not found in DOM!");
        return;
    }

    const icons = [
        '<i class="fa-solid fa-envelope"></i>',
        '<i class="fa-solid fa-image"></i>',
        '<i class="fa-solid fa-comment"></i>'
    ];

    function spawnPacket(route) {
        if (!packetLayer) return;

        const packet = document.createElement('div');
        packet.classList.add('data-packet');
        packet.innerHTML = icons[Math.floor(Math.random() * icons.length)];
        packetLayer.appendChild(packet);

        let animationName = '';
        if (route === 'left-to-center') animationName = 'flowLeftToCenter';
        if (route === 'center-to-right') animationName = 'flowCenterToRight';
        if (route === 'right-to-center') animationName = 'flowRightToCenter';

        packet.style.animation = `${animationName} 1.2s ease-in-out forwards`;

        setTimeout(() => {
            packet.remove();
        }, 1200);
    }

    let intervalId;

    function startAnimation(callback) {
        overlay.classList.add('active');
        statusTitle.innerText = "Kết nối hệ thống";
        statusDesc.innerText = "Đang thiết lập môi trường bảo mật...";
        hubCenter.innerHTML = '<div class="hub-pulse"></div><img src="./img/logoZework.svg" style="width:70px;">';

        // Stage 1: Left -> Center (User sending request)
        let step = 0;
        intervalId = setInterval(() => {
            step++;
            if (step < 5) {
                spawnPacket('left-to-center');
            } else if (step === 5) {
                statusTitle.innerText = "Xử lý dữ liệu";
                statusDesc.innerText = "Hệ thống Zework đang xử lý...";
            } else if (step < 10) {
                spawnPacket('center-to-right'); // To Zalo (Right)
                spawnPacket('right-to-center'); // From Zalo
            } else if (step === 10) {
                statusTitle.innerText = "Hoàn tất";
                statusDesc.innerText = "Đồng bộ thành công!";
            }
        }, 300);

        setTimeout(() => {
            clearInterval(intervalId);
            // Success State
            hubCenter.innerHTML = '<i class="fa-solid fa-check circle success-icon"></i>';
            // Wait and close
            setTimeout(() => {
                overlay.classList.remove('active');
                if (callback) callback();
            }, 1000);
        }, 4000);
    }

    // Bind triggers
    document.body.addEventListener('click', (e) => {
        const target = e.target.closest('.btn-header-login, .btn-header-signup, .experience, .btn-login, .btn-signup');
        if (target) {
            // e.preventDefault(); // Uncomment to stop navigation
            console.log("Starting New Flow Animation");

            // If we want to prevent navigation to show animation:
            e.preventDefault();
            startAnimation(() => {
                // Resume navigation if needed
                const href = target.getAttribute('href');
                if (href && href !== '#') {
                    window.location.href = href;
                }
            });
        }
    });

    window.startSecurityAnimation = startAnimation;
});
