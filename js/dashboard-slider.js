/**
 * Dashboard Slider - Sequential Flow
 * Synchronizes with Video playback and Simulation phases.
 */
document.addEventListener('DOMContentLoaded', () => {
    const slider = document.getElementById('dashboardSlider');
    const video = document.getElementById('heroVideo');
    if (!slider || !video) return;

    const dots = slider.querySelectorAll('.slider-dot');
    const SIMULATION_DURATION = 33000;    // 33 seconds for all simulation phases to complete

    let currentSlide = 0; // 0 = Video, 1 = Canvas
    let autoSlideTimer;

    function switchToCanvas() {
        // Only switch to canvas on desktop (width > 768px)
        if (window.innerWidth <= 768) {
            switchToVideo(); // Just restart video on mobile
            return;
        }

        currentSlide = 1;
        slider.classList.add('slid');
        updateDots();

        // Loop back to video after simulation finishes its cycle
        clearTimeout(autoSlideTimer);
        autoSlideTimer = setTimeout(switchToVideo, SIMULATION_DURATION);
    }

    function switchToVideo() {
        currentSlide = 0;
        slider.classList.remove('slid');
        updateDots();

        // Reset and play video from the beginning
        if (video) {
            video.currentTime = 0;
            video.play().catch(e => console.log("Autoplay hindered:", e));
        }

        // We NO LONGER set a timer here. 
        // We wait for the 'ended' event to switch to canvas.
        clearTimeout(autoSlideTimer);

        // Safety Fallback: In case video fails to load or 'ended' never fires, 
        // switch anyway after 60s so the user isn't stuck.
        autoSlideTimer = setTimeout(() => {
            if (currentSlide === 0) switchToCanvas();
        }, 60000);
    }

    function updateDots() {
        dots.forEach((dot, idx) => {
            if (idx === currentSlide) {
                dot.classList.add('active');
            } else {
                dot.classList.remove('active');
            }
        });
    }

    // TRIGGER: Switch to canvas ONLY after video finish
    video.addEventListener('ended', () => {
        if (currentSlide === 0) {
            switchToCanvas();
        }
    });

    // Manual controls resets the flow
    dots.forEach((dot, idx) => {
        dot.addEventListener('click', () => {
            clearTimeout(autoSlideTimer);
            if (idx === 0) switchToVideo();
            else switchToCanvas();
        });
    });

    // Initial sequence
    switchToVideo();
});
