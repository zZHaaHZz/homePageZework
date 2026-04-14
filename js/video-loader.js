/**
 * Video Loader - Manages YouTube IFrame API for multiple players
 * Handles Skeleton Shimmer visibility and smooth fade-in
 */

const VideoLoader = (function () {
    'use strict';

    const players = {};
    const skeletons = {};

    /**
     * Initialize the loader
     */
    function init() {
        const currentOrigin = window.location.origin;

        // Find all video wrappers that have a skeleton
        document.querySelectorAll('.video-wrapper, #slideVideo').forEach(container => {
            const iframe = container.querySelector('iframe');
            if (!iframe) return;

            // Inject origin for production security (YouTube API Requirement)
            try {
                const url = new URL(iframe.src);
                if (!url.searchParams.has('origin')) {
                    url.searchParams.set('origin', currentOrigin);
                    iframe.src = url.toString();
                }
            } catch (e) {
                console.warn("Video Loader: Could not parse iframe src", e);
            }

            const skeleton = container.querySelector('.video-skeleton');
            if (skeleton) {
                skeletons[iframe.id] = skeleton;
            }
        });

        // Check if YT is already loaded (race condition fix)
        if (typeof YT !== 'undefined' && YT.Player) {
            console.log("Video Loader: YT API already present, initializing immediately");
            initPlayers();
        }
    }

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
        console.log("Video Loader: YT API Ready via Callback");
        initPlayers();
    };

    function initPlayers() {
        if (typeof YT === 'undefined' || !YT.Player) return;

        // Hero Video is now initialized by dashboard-slider.js to ensure performance optimization.


        // Initialize Messaging Demo Video
        if (document.getElementById('messagingDemoVideo') && !players.messagingDemoVideo) {
            players.messagingDemoVideo = new YT.Player('messagingDemoVideo', {
                events: {
                    'onStateChange': (e) => onPlayerStateChange(e, 'messagingDemoVideo')
                }
            });
        }

        // Failsafe: If players are initialized but skeleton stays too long
        setTimeout(() => {
            document.querySelectorAll('.video-skeleton').forEach(sk => {
                if (!sk.classList.contains('hidden')) {
                    console.log("Video Loader: Failsafe triggered for skeleton");
                    sk.classList.add('hidden');
                    const container = sk.closest('.video-wrapper, #slideVideo');
                    if (container) container.classList.add('video-loaded');
                }
            });
        }, 8000);
    }

    /**
     * Initial setup
     */
    function init() {
        // Find skeletons
        document.querySelectorAll('.video-wrapper, #slideVideo').forEach(container => {
            const iframe = container.querySelector('iframe');
            if (!iframe) return;

            const skeleton = container.querySelector('.video-skeleton');
            if (skeleton) {
                skeletons[iframe.id] = skeleton;
            }
        });

        // Check if YT is already loaded (race condition fix)
        if (typeof YT !== 'undefined' && YT.Player) {
            console.log("Video Loader: YT API already present, initializing immediately");
            initPlayers();
        }
    }

    // Run init immediately (script uses defer, so DOM is accessible)
    init();

    return {
        getPlayers: () => players
    };
})();
