document.addEventListener("DOMContentLoaded", () => {
    let slidersInitialized = false; // kiểm soát đã khởi tạo slider chưa
    let sliderIntervals = []; // lưu setInterval để clear khi cần

    function initSliders() {
        const screenWidth = window.innerWidth;

        if (screenWidth > 430) {
            // nếu đã khởi tạo, clear interval và reset slider
            if (slidersInitialized) {
                document.querySelectorAll(".list-introduce-mini").forEach(slider => {
                    slider.style.transition = "";
                    slider.style.transform = "";
                });
                sliderIntervals.forEach(interval => clearInterval(interval));
                sliderIntervals = [];
                slidersInitialized = false;
            }
            return;
        }

        // nếu đã chạy rồi thì không chạy lại
        if (slidersInitialized) return;

        const sliders = document.querySelectorAll(".list-introduce-mini");

        sliders.forEach(slider => {
            const items = slider.querySelectorAll(".box-list-introduce");
            let index = 0;

            function autoSlide() {
                index++;
                if (index >= items.length) index = 0;

                const moveX = index * -25; // chiều rộng box
                slider.style.transition = "0.6s ease";
                slider.style.transform = `translateX(${moveX}rem)`;
            }

            const interval = setInterval(autoSlide, 3000);
            sliderIntervals.push(interval);
        });

        slidersInitialized = true;
    }

    // chạy lần đầu
    initSliders();

    // chạy mỗi khi resize màn
    window.addEventListener("resize", initSliders);
});