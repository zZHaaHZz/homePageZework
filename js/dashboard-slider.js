/**
 * Dashboard Slider - Sequential Flow (YouTube Integration)
 * High-performance synchronization between Hero Video and Dashboard Simulation.
 */

let heroPlayer; 
let isHeroPlayerReady = false;
let currentSlide = 0; // 0 = Video, 1 = Canvas
let autoSlideTimer;

const HERO_VIDEO_ID = 'S_-az13i5ME';
const SIMULATION_DURATION = 33000; // Duration to show the canvas before looping back

/**
 * Initialize Hero Video Player
 * Using late initialization to reduce initial main thread blocking time.
 */
function initHeroPlayer() {
    if (typeof YT === 'undefined' || !YT.Player) {
        // Retry if YT API not loaded yet
        setTimeout(initHeroPlayer, 100);
        return;
    }

    heroPlayer = new YT.Player('heroVideo', {
        videoId: HERO_VIDEO_ID,
        playerVars: {
            'autoplay': 1,
            'mute': 1,
            'playsinline': 1,
            'controls': 0,
            'rel': 0,
            'modestbranding': 1,
            'enablejsapi': 1,
            'origin': window.location.origin,
            'loop': 1,
            'playlist': HERO_VIDEO_ID
        },
        events: {
            'onReady': onHeroReady,
            'onStateChange': onHeroStateChange
        }
    });
}

function onHeroReady(event) {
    isHeroPlayerReady = true;
    console.log("Hero Player Ready");
    
    // Hide skeleton once video is actually playing
    const skeleton = document.querySelector('#slideVideo .video-skeleton');
    if (skeleton) {
        setTimeout(() => {
            skeleton.classList.add('hidden');
            const container = document.getElementById('slideVideo');
            if (container) container.classList.add('video-loaded');
        }, 500);
    }
}

function onHeroStateChange(event) {
    // YT.PlayerState.ENDED = 0
    if (event.data === YT.PlayerState.ENDED && currentSlide === 0) {
        // If on mobile (no canvas), just replay
        if (window.innerWidth <= 768) {
            event.target.playVideo();
        } else {
            switchToCanvas();
        }
    }
}

function switchToCanvas() {
    clearTimeout(autoSlideTimer);
    const slider = document.getElementById('dashboardSlider');
    if (!slider) return;

    if (window.innerWidth <= 768) {
        if (isHeroPlayerReady) heroPlayer.playVideo();
        return;
    }

    currentSlide = 1;
    slider.classList.add('slid');
    updateDots();

    // Pause video when hiding it to save resources
    if (isHeroPlayerReady && heroPlayer.pauseVideo) {
        heroPlayer.pauseVideo();
    }

    // START Simulation - Delay slightly to allow CSS transition to finish smoothly
    setTimeout(() => {
        if (typeof window.startDashboardSimulation === 'function') {
            window.startDashboardSimulation();
        }
    }, 200);

    // Loop back to video after duration
    autoSlideTimer = setTimeout(switchToVideo, SIMULATION_DURATION);
}

function switchToVideo() {
    clearTimeout(autoSlideTimer);
    const slider = document.getElementById('dashboardSlider');
    if (!slider) return;

    currentSlide = 0;
    slider.classList.remove('slid');
    updateDots();

    // STOP Simulation animation loop to save CPU
    if (typeof window.stopDashboardSimulation === 'function') {
        window.stopDashboardSimulation();
    }

    // Reset and play video from the beginning
    if (isHeroPlayerReady && heroPlayer.seekTo && heroPlayer.playVideo) {
        heroPlayer.seekTo(0);
        heroPlayer.playVideo();
    }

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

// Global initialization
document.addEventListener('DOMContentLoaded', () => {
    const dots = document.querySelectorAll('.slider-dot');
    
    dots.forEach((dot, idx) => {
        dot.addEventListener('click', () => {
            clearTimeout(autoSlideTimer);
            if (idx === 0) switchToVideo();
            else switchToCanvas();
        });
    });

    // Strategy: Delay Video Initialization slightly to allow page layout to settle
    // This helps reduce the initial Backlog Time.
    setTimeout(initHeroPlayer, 1000);

    // Initial timeout for auto-switch
    autoSlideTimer = setTimeout(() => {
        if (currentSlide === 0) switchToCanvas();
    }, 33000);
});

