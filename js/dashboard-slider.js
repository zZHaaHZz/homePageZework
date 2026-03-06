/**
 * Dashboard Slider
 * Shows CRM screenshot in computer frame first,
 * then slides to animated canvas after 3 seconds.
 */
document.addEventListener('DOMContentLoaded', () => {
    const slider = document.getElementById('dashboardSlider');
    if (!slider) return;

    const dots = slider.querySelectorAll('.slider-dot');
    const SLIDE_DELAY = 3000; // 3 seconds

    function slideToCanvas() {
        slider.classList.add('slid');
        // Update dots
        dots.forEach(d => d.classList.remove('active'));
        if (dots[1]) dots[1].classList.add('active');
    }

    function slideToImage() {
        slider.classList.remove('slid');
        // Update dots
        dots.forEach(d => d.classList.remove('active'));
        if (dots[0]) dots[0].classList.add('active');
    }

    // Auto-slide after 3 seconds
    let autoSlideTimer = setTimeout(slideToCanvas, SLIDE_DELAY);

    // Allow clicking dots to manually switch
    if (dots[0]) {
        dots[0].addEventListener('click', () => {
            clearTimeout(autoSlideTimer);
            slideToImage();
            // Resume auto-slide after another 3s
            autoSlideTimer = setTimeout(slideToCanvas, SLIDE_DELAY);
        });
    }

    if (dots[1]) {
        dots[1].addEventListener('click', () => {
            clearTimeout(autoSlideTimer);
            slideToCanvas();
        });
    }
});
