document.addEventListener("DOMContentLoaded", () => {
    const sliders = document.querySelectorAll(".list-introduce-mini");

    sliders.forEach(slider => {
        const items = slider.querySelectorAll(".box-list-introduce");
        let index = 0;

        function autoSlide() {
            index++;
            if (index >= items.length) index = 0;

            const moveX = index * -25; // 25rem = chiều rộng box
            slider.style.transition = "0.6s ease";
            slider.style.transform = `translateX(${moveX}rem)`;
        }

        setInterval(autoSlide, 3000);
    });
});