document.addEventListener("DOMContentLoaded", () => {
    let slidersInitialized = false;
    let sliderIntervals = [];

    function initSliders() {
        const screenWidth = window.innerWidth;

        if (screenWidth > 430) {
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
        if (slidersInitialized) return;
        const sliders = document.querySelectorAll(".list-introduce-mini");

        sliders.forEach(slider => {
            const items = slider.querySelectorAll(".box-list-introduce");
            const itemWidth = 25;  // rem
            const maxIndex = items.length - 1;

            let index = 0;
            let posX = 0;
            // ==========================
            //  FUNCTION SLIDE
            // ==========================
            function goToIndex(i) {
                index = Math.max(0, Math.min(maxIndex, i));
                posX = index * -itemWidth;

                slider.style.transition = "0.4s ease";
                slider.style.transform = `translateX(${posX}rem)`;

                updateDots();
            }

            function autoSlide() {
                let next = index + 1;
                if (next > maxIndex) next = 0;
                goToIndex(next);
            }

            const interval = setInterval(autoSlide, 3000);
            sliderIntervals.push(interval);

            // ==========================
            // DRAG
            // ==========================
            let startX = 0;
            let dragging = false;
            let startPos = 0;

            function startDrag(clientX) {
                clearInterval(interval);
                dragging = true;
                startX = clientX;
                startPos = posX;
                slider.style.transition = "none";
            }

            function moveDrag(clientX) {
                if (!dragging) return;
                const diff = (clientX - startX) / 10;
                posX = startPos + diff;
                slider.style.transform = `translateX(${posX}rem)`;
            }

            function endDrag() {
                if (!dragging) return;
                dragging = false;

                const nearestIndex = Math.round(Math.abs(posX) / itemWidth);
                goToIndex(nearestIndex);
            }

            slider.addEventListener("mousedown", e => startDrag(e.clientX));
            slider.addEventListener("mousemove", e => moveDrag(e.clientX));
            slider.addEventListener("mouseup", endDrag);
            slider.addEventListener("mouseleave", endDrag);

            slider.addEventListener("touchstart", e => startDrag(e.touches[0].clientX));
            slider.addEventListener("touchmove", e => moveDrag(e.touches[0].clientX));
            slider.addEventListener("touchend", endDrag);
        });

        slidersInitialized = true;
    }

    initSliders();
    window.addEventListener("resize", initSliders);
});
