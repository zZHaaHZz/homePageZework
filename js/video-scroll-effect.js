/**
 * Video Scroll Effect - Smooth 3D Flip animation synchronized with scroll
 * Features cross-browser support including Safari and Firefox
 */
(function() {
    'use strict';

    const frame = document.querySelector('.video-browser-frame');
    if (!frame) return;

    // Configuration
    const MAX_ROTATION = 25; // Degrees
    const MAX_SHY = 60;     // Translation Y
    const MIN_SCALE = 0.92;
    const MIN_OPACITY = 0.6;

    let isVisible = false;

    /**
     * Use IntersectionObserver to track visibility and save performance
     */
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            isVisible = entry.isIntersecting;
        });
    }, {
        threshold: 0,
        rootMargin: '100px 0px 100px 0px'
    });

    observer.observe(frame);

    /**
     * Calculate and apply transformations
     */
    function updateTransform() {
        if (!isVisible) {
            requestAnimationFrame(updateTransform);
            return;
        }

        const rect = frame.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        
        // Calculate progress: -1 (at bottom) to 1 (at top)
        // 0 means element is perfectly centered in viewport
        const elementCenter = rect.top + rect.height / 2;
        const viewportCenter = viewportHeight / 2;
        
        // Progress goes from -0.8 to 0.8 roughly as it moves through view
        // We normalize it to -1 and 1 for easier math
        let progress = (viewportCenter - elementCenter) / viewportCenter;
        
        // Clamp progress
        progress = Math.max(-1, Math.min(1, progress));

        // Mapping progress to values
        // Note: we want 0 rotation in the 40%-60% zone (around progress 0)
        let rotation = 0;
        let scale = 1;
        let opacity = 1;
        let translateY = 0;

        // Add a "dead zone" in the middle for stability
        const deadZone = 0.15;
        if (Math.abs(progress) > deadZone) {
            // Adjust progress to start from the edge of the dead zone
            const adjustedProgress = (progress > 0) ? 
                (progress - deadZone) / (1 - deadZone) : 
                (progress + deadZone) / (1 - deadZone);
            
            rotation = adjustedProgress * MAX_ROTATION;
            scale = 1 - (Math.abs(adjustedProgress) * (1 - MIN_SCALE));
            opacity = 1 - (Math.abs(adjustedProgress) * (1 - MIN_OPACITY));
            translateY = -adjustedProgress * MAX_SHY;
        }

        // Apply styles
        frame.style.transform = `rotateX(${rotation}deg) translateY(${translateY}px) scale(${scale})`;
        frame.style.opacity = opacity;

        // Apply dynamic shadow based on tilt
        const shadowOpacity = 0.15 + (Math.abs(progress) * 0.1);
        const shadowBlur = 40 - (Math.abs(progress) * 20);
        frame.style.boxShadow = `0 ${20 + (Math.abs(progress) * 20)}px ${shadowBlur}px -10px rgba(0, 0, 0, ${shadowOpacity})`;

        requestAnimationFrame(updateTransform);
    }

    // Start animation loop
    requestAnimationFrame(updateTransform);

})();
