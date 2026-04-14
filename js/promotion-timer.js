/**
 * Promotion Modal & Countdown Timer Logic
 */
(function () {
    'use strict';

    const SHOW_DELAY = 10000; // 5 seconds

    // Reset 7-day deadline on every visit
    const deadlineTs = (Date.now() + 7 * 24 * 60 * 60 * 1000).toString();
    const targetDate = new Date(parseInt(deadlineTs));

    const REAPPEAR_INTERVAL = 5 * 60 * 1000; // 5 minutes

    function initPromoModal() {
        const modal = document.getElementById('promoModal');
        const closeBtn = document.getElementById('promoClose');
        const ctaBtn = document.getElementById('promoCTA');

        if (!modal) return;

        // Check if user has already dismissed the promo
        const isDismissed = localStorage.getItem('zework_promo_dismissed');
        if (isDismissed === 'true') return;

        const showModal = () => {
            modal.classList.add('show');
        };

        const dismissModal = () => {
            modal.classList.remove('show');
            localStorage.setItem('zework_promo_dismissed', 'true');
        };

        // Show modal after initial delay (if not dismissed)
        setTimeout(showModal, SHOW_DELAY);

        // Close handlers
        closeBtn.onclick = dismissModal;

        modal.onclick = (e) => {
            if (e.target === modal) dismissModal();
        };

        ctaBtn.onclick = () => {
            dismissModal();
            window.open('https://app.zework.com/', '_blank');
        };

        // Start Countdown
        updateCountdown();
        setInterval(updateCountdown, 1000);
    }

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = targetDate.getTime() - now;

        if (distance < 0) return;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Update UI
        document.getElementById('promoDays') ? document.getElementById('promoDays').innerText = days.toString().padStart(2, '0') : null;
        document.getElementById('promoHours') ? document.getElementById('promoHours').innerText = hours.toString().padStart(2, '0') : null;
        document.getElementById('promoMins') ? document.getElementById('promoMins').innerText = minutes.toString().padStart(2, '0') : null;
        document.getElementById('promoSecs') ? document.getElementById('promoSecs').innerText = seconds.toString().padStart(2, '0') : null;
    }

    // Run
    document.addEventListener('DOMContentLoaded', () => {
        // Staggered initialization (1400ms) to break up TBT
        setTimeout(initPromoModal, 1400);
    });
})();
