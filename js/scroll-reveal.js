/**
 * Scroll Reveal - Intersection Observer based scroll animations
 * Elements animate in as user scrolls to them
 */
(function () {
    'use strict';

    // Configuration
    const REVEAL_THRESHOLD = 0.15; // 15% of element visible triggers animation
    const ROOT_MARGIN = '0px 0px -50px 0px'; // Trigger slightly before fully in view

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
                } else {
                    // Remove class when element leaves viewport so it can animate again
                    entry.target.classList.remove('revealed');
                }
            });
        }, {
            threshold: REVEAL_THRESHOLD,
            rootMargin: ROOT_MARGIN
        });

        // Observe all target elements
        const selector = AUTO_REVEAL_SELECTORS.join(',');
        document.querySelectorAll(selector).forEach(function (el) {
            // Skip elements already in viewport on load (above the fold)
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight * 0.85 && rect.top > 0) {
                // Element is already visible — reveal immediately without animation
                el.style.transition = 'none';
                el.classList.add('revealed');
                // Re-enable transitions after a frame
                requestAnimationFrame(function () {
                    requestAnimationFrame(function () {
                        el.style.transition = '';
                    });
                });
            } else if (rect.top <= 0) {
                // Element is above viewport (already scrolled past)
                el.classList.add('revealed');
            } else {
                // Element is below viewport — observe it
                observer.observe(el);
            }
        });
    }

    // Run when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initScrollReveal);
    } else {
        initScrollReveal();
    }
})();
