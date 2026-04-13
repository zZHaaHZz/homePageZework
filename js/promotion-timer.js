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

        const showModal = () => {
            modal.classList.add('show');
        };

        // Show modal after initial delay
        setTimeout(showModal, SHOW_DELAY);

        // Repeatedly show modal every 5 minutes
        setInterval(showModal, REAPPEAR_INTERVAL);

        // Close handlers
        closeBtn.onclick = () => modal.classList.remove('show');
        modal.onclick = (e) => {
            if (e.target === modal) modal.classList.remove('show');
        };
        ctaBtn.onclick = () => {
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
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initPromoModal);
    } else {
        initPromoModal();
    }
})();
