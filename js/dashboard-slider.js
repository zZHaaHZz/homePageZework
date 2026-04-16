let heroPlayer;
let isHeroPlayerReady = false;
let currentSlide = 1; // Default Desktop: Canvas
let autoSlideTimer;
let isWaitingForHeroVideo = false;
let heroVideoWaitStartedAt = 0;
const isMobileDevice = window.innerWidth <= 768;

// How long to show the hero video before switching back to canvas (Desktop)
const VIDEO_DISPLAY_DURATION = 33000; 
const MOBILE_INITIAL_IMAGE_DELAY = 3000; // 3s delay before auto-playing video

const VIDEO_POLL_INTERVAL_MS = 300;
const VIDEO_READY_TIMEOUT_MS = 5000;

// ─── YouTube Player Setup ─────────────────────────────────────────────────────

function initHeroPlayer() {
    if (typeof YT === 'undefined' || !YT.Player) {
        setTimeout(initHeroPlayer, 100);
        return;
    }

    const iframe = document.getElementById('heroVideo');
    if (!iframe || heroPlayer) return;

    if (!iframe.src && iframe.dataset.src) {
        iframe.src = iframe.dataset.src;
    }

    heroPlayer = new YT.Player('heroVideo', {
        events: {
            'onReady': onHeroReady,
            'onStateChange': onHeroStateChange,
        }
    });
}

function onHeroReady() {
    isHeroPlayerReady = true;
    console.log('Slider: Hero video ready');

    if (!isMobileDevice) {
        try {
            heroPlayer.mute();
            heroPlayer.playVideo();
        } catch (e) {}
    }
}

function onHeroStateChange(event) {
    if (event.data === YT.PlayerState.PLAYING || event.data === YT.PlayerState.BUFFERING) {
        markHeroVideoLoaded();
    }

    // Handle Video Ended
    if (event.data === YT.PlayerState.ENDED) {
        if (isMobileDevice) {
            // Mobile: Switch back to initial image slide and STOP
            switchToMobileImage();
        } else if (currentSlide === 0) {
            // Desktop: Switch back to canvas/analytics
            switchToCanvas_analytics();
        }
    }
}

// ─── Video Ready Polling ──────────────────────────────────────────────────────

function waitForVideoThenSwitch() {
    if (!isWaitingForHeroVideo) return;

    if (isHeroPlayerReady && heroPlayer) {
        try {
            const state = heroPlayer.getPlayerState();
            if (state === 1 || state === 3) {
                doSwitchToVideo();
                return;
            }
            heroPlayer.mute();
            heroPlayer.playVideo();
        } catch (e) {}
    }

    if (Date.now() - heroVideoWaitStartedAt >= VIDEO_READY_TIMEOUT_MS) {
        doSwitchToVideo();
        return;
    }

    setTimeout(waitForVideoThenSwitch, VIDEO_POLL_INTERVAL_MS);
}

function doSwitchToVideo() {
    if (currentSlide === 0) return;

    clearTimeout(autoSlideTimer);
    const slider = document.getElementById('dashboardSlider');
    if (!slider) return;

    isWaitingForHeroVideo = false;
    currentSlide = 0;

    if (typeof window.pauseDashboardSimulationForVideo === 'function') {
        window.pauseDashboardSimulationForVideo();
    }

    // Remove 'slid' and 'slid-mobile' classes to show video
    slider.classList.remove('slid', 'slid-mobile');
    updateDots();

    if (isHeroPlayerReady && heroPlayer) {
        try {
            heroPlayer.seekTo(0);
            heroPlayer.mute(); // BẮT BUỘC: Phải mute mới tự động phát được trên Mobile
            heroPlayer.playVideo();
        } catch (e) {}
    }

    // Desktop only: Auto-switch back to canvas after duration
    if (!isMobileDevice) {
        autoSlideTimer = setTimeout(switchToCanvas_analytics, VIDEO_DISPLAY_DURATION);
    }
}

function markHeroVideoLoaded() {
    const container = document.getElementById('slideVideo');
    if (container) {
        container.classList.add('video-loaded');
    }
}

// ─── Slide Switching ──────────────────────────────────────────────────────────

function switchToVideo() {
    if (isWaitingForHeroVideo || currentSlide === 0) return;
    isWaitingForHeroVideo = true;
    heroVideoWaitStartedAt = Date.now();
    waitForVideoThenSwitch();
}

function switchToMobileImage() {
    clearTimeout(autoSlideTimer);
    const slider = document.getElementById('dashboardSlider');
    if (!slider) return;

    currentSlide = 2; // Unique ID for mobile image
    slider.classList.remove('slid');
    slider.classList.add('slid-mobile');
    updateDots();

    if (isHeroPlayerReady && heroPlayer) {
        try { heroPlayer.pauseVideo(); } catch (e) {}
    }
}

function switchToCanvas_analytics() {
    if (isMobileDevice) return; // Canvas is hidden on mobile

    clearTimeout(autoSlideTimer);
    const slider = document.getElementById('dashboardSlider');
    if (!slider) return;

    currentSlide = 1;
    slider.classList.remove('slid-mobile');
    slider.classList.add('slid');
    updateDots();

    if (isHeroPlayerReady && heroPlayer) {
        try { heroPlayer.pauseVideo(); } catch (e) {}
    }

    if (typeof window.resumeDashboardSimulation === 'function') {
        setTimeout(window.resumeDashboardSimulation, 200);
    }
}

function updateDots() {
    document.querySelectorAll('.slider-dot').forEach((dot, idx) => {
        // Dot 0 = Video, Dot 1 = Canvas, Dot 2 = Mobile Image
        // On mobile we might map Dot 0 to Image if we want, but letting's keep it simple.
        dot.classList.toggle('active', idx === currentSlide);
    });
}

// ─── Initialization ───────────────────────────────────────────────────────────

const initSlider = () => {
    const slider = document.getElementById('dashboardSlider');
    if (!slider) return;

    if (isMobileDevice) {
        // Start on Mobile Image
        switchToMobileImage();
        // Auto-play video after X seconds
        autoSlideTimer = setTimeout(switchToVideo, MOBILE_INITIAL_IMAGE_DELAY);
    } else {
        // Start on Canvas
        switchToCanvas_analytics();
    }

    const dots = document.querySelectorAll('.slider-dot');
    dots.forEach((dot, idx) => {
        dot.addEventListener('click', () => {
            clearTimeout(autoSlideTimer);
            if (isMobileDevice) {
                if (idx === 0) switchToVideo();
                else switchToMobileImage();
            } else {
                if (idx === 0) switchToVideo();
                else switchToCanvas_analytics();
            }
        });
    });

    const startDashboard = () => {
        if (typeof window.startDashboardSimulation === 'function' && !isMobileDevice) {
            window.startDashboardSimulation();
        }
    };

    if (document.readyState === 'complete') {
        startDashboard();
    } else {
        window.addEventListener('load', () => {
            if ('requestIdleCallback' in window) {
                requestIdleCallback(startDashboard, { timeout: 1200 });
            } else {
                setTimeout(startDashboard, 600);
            }
        }, { once: true });
    }

    setTimeout(initHeroPlayer, 1500);
};

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSlider);
} else {
    initSlider();
}

window.switchSliderToVideo = switchToVideo;
