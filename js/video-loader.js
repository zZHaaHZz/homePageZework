/**
 * Video Loader - Manages YouTube IFrame API for multiple players
 * Handles Skeleton Shimmer visibility and smooth fade-in
 */

const VideoLoader = (function () {
    'use strict';

    const players = {};
    const skeletons = {};

    /**
     * Shared state change handler
     */
    function onPlayerStateChange(event, playerId) {
        // YT.PlayerState.PLAYING = 1
        if (event.data === YT.PlayerState.PLAYING) {
            const container = event.target.getIframe().closest('.video-wrapper, #slideVideo');
            if (container) {
                container.classList.add('video-loaded');
                if (skeletons[playerId]) {
                    skeletons[playerId].classList.add('hidden');
                }
            }
        }

        // Bridge to dashboard-slider.js if it's the hero video
        if (playerId === 'heroVideo' && typeof window.handleHeroStateChange === 'function') {
            window.handleHeroStateChange(event);
        }
    }

    /**
     * YouTube API entry point
     */
    window.onYouTubeIframeAPIReady = function () {
        initPlayers();
    };

    function initPlayers() {
        if (typeof YT === 'undefined' || !YT.Player) return;

        // Note: Hero Video is initialized by dashboard-slider.js

        // Initialize Messaging Demo Video if present
        const msgDemo = document.getElementById('messagingDemoVideo');
        if (msgDemo && !players.messagingDemoVideo) {
            players.messagingDemoVideo = new YT.Player('messagingDemoVideo', {
                events: {
                    'onStateChange': (e) => onPlayerStateChange(e, 'messagingDemoVideo')
                }
            });
        }

        // Global Failsafe: Ensure all skeletons hide after 8s
        setTimeout(() => {
            document.querySelectorAll('.video-skeleton').forEach(sk => {
                if (!sk.classList.contains('hidden')) {
                    sk.classList.add('hidden');
                    const container = sk.closest('.video-wrapper, #slideVideo');
                    if (container) container.classList.add('video-loaded');
                }
            });
        }, 8000);
    }

    /**
     * Internal setup - deferred to protect TBT
     */
    function setup() {
        // Collect skeletons for all iFrames
        document.querySelectorAll('.video-wrapper, #slideVideo').forEach(container => {
            const iframe = container.querySelector('iframe');
            if (!iframe) return;

            const skeleton = container.querySelector('.video-skeleton');
            if (skeleton) {
                skeletons[iframe.id] = skeleton;
            }
        });

        if (typeof YT !== 'undefined' && YT.Player) {
            initPlayers();
        }
    }

    // Protect Main Thread: Run non-critical setup after initial load window
    if (window.requestIdleCallback) {
        window.requestIdleCallback(setup, { timeout: 2000 });
    } else {
        setTimeout(setup, 1000);
    }

    return {
        getPlayers: () => players
    };
})();
