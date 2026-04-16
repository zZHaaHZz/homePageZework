/**
 * Dashboard Slider - Flow:
 *   Canvas (sync→distribute→security→analytics→tags) → Hero Video → loop
 *
 * Hero video loads silently in background while 3 canvas phases run.
 * Before switching to video, we poll until YT.PlayerState is PLAYING or BUFFERING
 * so there is never a white/black flash.
 */

let heroPlayer;
let isHeroPlayerReady = false;
let currentSlide = 1; // Start on Canvas (1), not Video (0)
let autoSlideTimer;
let isWaitingForHeroVideo = false;
let heroVideoWaitStartedAt = 0;

// How long to show the hero video before switching back to canvas
const VIDEO_DISPLAY_DURATION = 33000; // 33s

const VIDEO_POLL_INTERVAL_MS = 300;
const VIDEO_READY_TIMEOUT_MS = 5000;

// ─── YouTube Player Setup ─────────────────────────────────────────────────────

function initHeroPlayer() {
    if (typeof YT === 'undefined' || !YT.Player) {
        setTimeout(initHeroPlayer, 100);
        return;
    }

    const iframe = document.getElementById('heroVideo');
    if (!iframe || heroPlayer) return; // already initialized

    // Lazy inject: move data-src → src (YouTube won't load until now)
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

    // Warm the hidden player during phases 1-3 so the handoff feels instant.
    try {
        heroPlayer.mute();
        heroPlayer.playVideo();
    } catch (e) {}
}

function onHeroStateChange(event) {
    if (event.data === YT.PlayerState.PLAYING || event.data === YT.PlayerState.BUFFERING) {
        markHeroVideoLoaded();
    }

    // If video ends while showing, switch back to canvas (analytics phase)
    if (event.data === YT.PlayerState.ENDED && currentSlide === 0) {
        if (window.innerWidth <= 768) {
            event.target.playVideo();
        } else {
            switchToCanvas_analytics();
        }
    }
}

// ─── Video Ready Polling ──────────────────────────────────────────────────────

/**
 * Polls YouTube player state until video is PLAYING or BUFFERING,
 * then executes the actual slide switch.
 */
function waitForVideoThenSwitch() {
    if (!isWaitingForHeroVideo) return;

    if (isHeroPlayerReady && heroPlayer) {
        try {
            const state = heroPlayer.getPlayerState();
            // YT.PlayerState: PLAYING = 1, BUFFERING = 3
            if (state === 1 || state === 3) {
                console.log('Slider: Video confirmed playing/buffering — switching');
                doSwitchToVideo();
                return;
            }
            // Kick-start playback if it stalled while hidden
            heroPlayer.mute();
            heroPlayer.playVideo();
        } catch (e) { /* YT API not fully ready yet */ }
    }

    if (Date.now() - heroVideoWaitStartedAt >= VIDEO_READY_TIMEOUT_MS) {
        console.warn('Slider: Hero video not ready in time, switching with fallback background');
        doSwitchToVideo();
        return;
    }

    // Not ready yet — poll again
    setTimeout(waitForVideoThenSwitch, VIDEO_POLL_INTERVAL_MS);
}

/**
 * Performs the actual visual slide switch once video is confirmed ready.
 */
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

    slider.classList.remove('slid'); // slid = canvas visible, no slid = video visible
    updateDots();

    // Ensure video is playing from start
    if (isHeroPlayerReady && heroPlayer) {
        try {
            heroPlayer.seekTo(0);
            heroPlayer.playVideo();
        } catch (e) {}
    }

    // Auto-switch back to canvas (analytics) after VIDEO_DISPLAY_DURATION
    autoSlideTimer = setTimeout(switchToCanvas_analytics, VIDEO_DISPLAY_DURATION);
}

function markHeroVideoLoaded() {
    const container = document.getElementById('slideVideo');
    if (container) {
        container.classList.add('video-loaded');
    }
}

// ─── Slide Switching ──────────────────────────────────────────────────────────

/**
 * Called by simulation after 'security' phase.
 * Waits for video to be ready before switching.
 */
function switchToVideo() {
    // On mobile: keep canvas running, ignore video switch
    if (window.innerWidth <= 768) return;
    if (isWaitingForHeroVideo || currentSlide === 0) return;

    isWaitingForHeroVideo = true;
    heroVideoWaitStartedAt = Date.now();
    waitForVideoThenSwitch();
}

/**
 * Called after video finishes (or timer). Resumes simulation from the start.
 */
function switchToCanvas_analytics() {
    clearTimeout(autoSlideTimer);
    const slider = document.getElementById('dashboardSlider');
    if (!slider) return;

    currentSlide = 1;
    slider.classList.add('slid');
    updateDots();

    // Pause video to save resources
    if (isHeroPlayerReady && heroPlayer) {
        try { heroPlayer.pauseVideo(); } catch (e) {}
    }

    // Signal simulation to resume from the start of the cycle
    if (typeof window.resumeDashboardSimulation === 'function') {
        setTimeout(window.resumeDashboardSimulation, 200);
    }
}

function updateDots() {
    document.querySelectorAll('.slider-dot').forEach((dot, idx) => {
        dot.classList.toggle('active', idx === currentSlide);
    });
}

// ─── Initialization ───────────────────────────────────────────────────────────

    const initSlider = () => {
        const dots = document.querySelectorAll('.slider-dot');
        dots.forEach((dot, idx) => {
            dot.addEventListener('click', () => {
                clearTimeout(autoSlideTimer);
                if (idx === 0) switchToVideo();
                else switchToCanvas_analytics();
            });
        });

        // Start on canvas slide immediately
        const slider = document.getElementById('dashboardSlider');
        if (slider) slider.classList.add('slid');

        // Start canvas simulation after first paint / idle to protect FCP and TBT
        const startDashboard = () => {
            if (typeof window.startDashboardSimulation === 'function') {
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

        // Initialize YT.Player at 1500ms (needs YT API — polls until ready)
        setTimeout(initHeroPlayer, 1500);
    };

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initSlider);
    } else {
        initSlider();
    }

// Expose for simulation to call
window.switchSliderToVideo = switchToVideo;
