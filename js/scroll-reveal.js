/**
 * Scroll Reveal - Intersection Observer based scroll animations
 * Elements animate in as user scrolls to them
 */
(function () {
    'use strict';

    // Configuration
    const REVEAL_THRESHOLD = 0.05; // 5% of element visible triggers animation
    const ROOT_MARGIN = '0px 0px -10% 0px'; // Trigger based on viewport percentage

    // Selectors for elements to automatically animate
    const AUTO_REVEAL_SELECTORS = [
        '.feature-showcase-header',
        '.feature-showcase-item',
        '.why-select-zework-title',
        '.why-select-zework-1',
        '.why-select-zework-3',
        '.price-container',
        '.CTA',
        // Generic reveal classes
        '.reveal',
        '.reveal-left',
        '.reveal-right',
        '.reveal-scale',
        '.reveal-fade'
    ];

    /**
     * Initialize Intersection Observer for scroll reveal
     */
    function initScrollReveal() {
        // Check for Intersection Observer support
        if (!('IntersectionObserver' in window)) {
            // Fallback: show everything immediately
            document.querySelectorAll(AUTO_REVEAL_SELECTORS.join(',')).forEach(function (el) {
                el.classList.add('revealed');
            });
            return;
        }

        // Create observer
        const observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    observer.unobserve(entry.target); // Animate 1 lần, không theo dõi nữa
                }
            });
        }, {
            threshold: REVEAL_THRESHOLD,
            rootMargin: ROOT_MARGIN
        });

        // Observe all target elements
        const selector = AUTO_REVEAL_SELECTORS.join(',');
        const elements = document.querySelectorAll(selector);
        
        // 1. Batch Read: Collect all elements and their initial positions
        const toRevealImmediately = [];
        const toObserve = [];
        const vh = window.innerHeight;

        elements.forEach(function (el) {
            const rect = el.getBoundingClientRect();
            if (rect.top < vh * 0.85 && rect.top > 0) {
                toRevealImmediately.push(el);
            } else if (rect.top <= 0) {
                // Element is already above viewport
                el.classList.add('revealed'); 
            } else {
                toObserve.push(el);
            }
        });

        // 2. Batch Write: Apply changes
        toRevealImmediately.forEach(function(el) {
            el.style.transition = 'none';
            el.classList.add('revealed');
            requestAnimationFrame(function () {
                requestAnimationFrame(function () {
                    el.style.transition = '';
                });
            });
        });

        toObserve.forEach(function(el) {
            observer.observe(el);
        });
    }

    // Run when DOM is ready
    document.addEventListener('DOMContentLoaded', () => {
        // Staggered initialization (1600ms) to break up TBT
        setTimeout(initScrollReveal, 1600);
    });
})();
