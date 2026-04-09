/**
 * Dashboard Slider - Sequential Flow (YouTube Integration)
 * Synchronizes with YouTube Video playback and Simulation phases.
 */

let player; // Global YT player instance
let isPlayerReady = false;
let currentSlide = 0; // 0 = Video, 1 = Canvas
let autoSlideTimer;

// --- YT Player API Setup ---
window.onYouTubeIframeAPIReady = function () {
    console.log("YT API Ready, taking over existing iframe...");
    player = new YT.Player('heroVideo', {
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
};

function onPlayerReady(event) {
    console.log("Player Ready");
    isPlayerReady = true;
    // Note: Autoplay/Mute is handled via the iframe URL parameters
}

function onPlayerStateChange(event) {
    // YT.PlayerState.ENDED = 0
    if (event.data === YT.PlayerState.ENDED && currentSlide === 0) {
        switchToCanvas();
    }
}

function switchToCanvas() {
    const slider = document.getElementById('dashboardSlider');
    if (!slider) return;

    // Only switch to canvas on desktop (width > 768px)
    if (window.innerWidth <= 768) {
        switchToVideo(); // Just restart video on mobile
        return;
    }

    currentSlide = 1;
    slider.classList.add('slid');
    updateDots();

    // Pause video when hiding it
    if (isPlayerReady && player && player.pauseVideo) {
        player.pauseVideo();
    }

    // Loop back to video after simulation finishes its cycle
    const SIMULATION_DURATION = 33000;
    clearTimeout(autoSlideTimer);
    autoSlideTimer = setTimeout(switchToVideo, SIMULATION_DURATION);
}

function switchToVideo() {
    const slider = document.getElementById('dashboardSlider');
    if (!slider) return;

    currentSlide = 0;
    slider.classList.remove('slid');
    updateDots();

    // Reset and play video from the beginning
    if (isPlayerReady && player && player.seekTo && player.playVideo) {
        player.seekTo(0);
        player.playVideo();
    }

    clearTimeout(autoSlideTimer);
    autoSlideTimer = setTimeout(() => {
        if (currentSlide === 0) switchToCanvas();
    }, 33000);
}

function updateDots() {
    const dots = document.querySelectorAll('.slider-dot');
    dots.forEach((dot, idx) => {
        if (idx === currentSlide) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const dots = document.querySelectorAll('.slider-dot');
    
    // Manual controls resets the flow
    dots.forEach((dot, idx) => {
        dot.addEventListener('click', () => {
            clearTimeout(autoSlideTimer);
            if (idx === 0) switchToVideo();
            else switchToCanvas();
        });
    });

    // Start safety fallback for first slide
    autoSlideTimer = setTimeout(() => {
        if (currentSlide === 0) switchToCanvas();
    }, 33000);
});
