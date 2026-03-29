/**
 * Promotion Modal & Countdown Timer Logic
 */
(function() {
    'use strict';

    const STORAGE_KEY = 'zework_promo_seen';
    const DEADLINE_KEY = 'zework_promo_deadline';
    const SHOW_DELAY = 3000; // 3 seconds

    // Get or create a persistent 7-day deadline from first visit
    let deadlineTs = localStorage.getItem(DEADLINE_KEY);
    if (!deadlineTs) {
        deadlineTs = (Date.now() + 7 * 24 * 60 * 60 * 1000).toString();
        localStorage.setItem(DEADLINE_KEY, deadlineTs);
    }
    const targetDate = new Date(parseInt(deadlineTs));

    function initPromoModal() {
        const modal = document.getElementById('promoModal');
        const closeBtn = document.getElementById('promoClose');
        const ctaBtn = document.getElementById('promoCTA');

        if (!modal) return;

        // Check if shown in the last 24 hours
        const lastSeen = localStorage.getItem(STORAGE_KEY);
        const now = new Date().getTime();
        
        if (lastSeen && (now - parseInt(lastSeen)) < 24 * 60 * 60 * 1000) {
            return; // Don't show again so soon
        }

        // Show modal after delay
        setTimeout(() => {
            modal.classList.add('show');
            localStorage.setItem(STORAGE_KEY, now.toString());
        }, SHOW_DELAY);

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
