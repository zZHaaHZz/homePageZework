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
        // Find all video wrappers that have a skeleton
        document.querySelectorAll('.video-wrapper, #slideVideo').forEach(container => {
            const iframe = container.querySelector('iframe');
            if (!iframe) return;

            const skeleton = container.querySelector('.video-skeleton');
            if (skeleton) {
                skeletons[iframe.id] = skeleton;
            }
        });
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
        console.log("Video Loader: YT API Ready");

        // Initialize Hero Video
        if (document.getElementById('heroVideo')) {
            players.heroVideo = new YT.Player('heroVideo', {
                events: {
                    'onReady': (e) => {
                        if (typeof window.handleHeroReady === 'function') window.handleHeroReady(e);
                    },
                    'onStateChange': (e) => onPlayerStateChange(e, 'heroVideo')
                }
            });
        }

        // Initialize Messaging Demo Video
        if (document.getElementById('messagingDemoVideo')) {
            players.messagingDemoVideo = new YT.Player('messagingDemoVideo', {
                events: {
                    'onStateChange': (e) => onPlayerStateChange(e, 'messagingDemoVideo')
                }
            });
        }
    };

    // Run init on dom ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    return {
        getPlayers: () => players
    };
})();
