document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.querySelector('.contact-form');
    console.log('Contact form found:', contactForm);
    if (!contactForm) return;

    contactForm.addEventListener('submit', async (e) => {
        // Prevent default immediately
        if (e) e.preventDefault();
        console.log('Form submission intercepted');

        // 1. Get form elements
        const submitBtn = contactForm.querySelector('.contact-form-submit');
        const nameInput = document.getElementById('contact-name');
        const phoneInput = document.getElementById('contact-phone');
        const emailInput = document.getElementById('contact-email');
        const companyInput = document.getElementById('contact-company');
        const subjectSelect = document.getElementById('contact-subject');
        const messageInput = document.getElementById('contact-message');

        if (!submitBtn) return;

        const originalBtnText = submitBtn.innerHTML;
        
        // 2. Prepare Data
        // Mapping form fields to API fields
        const typeText = subjectSelect.options[subjectSelect.selectedIndex]?.text || '';
        
        const payload = {
            name: nameInput.value.trim(),
            phoneNumber: phoneInput.value.trim(),
            email: emailInput.value.trim(),
            companyName: companyInput.value.trim() || 'N/A',
            type: typeText || 'Yêu cầu tư vấn chung',
            content: messageInput.value.trim() || 'Người dùng gửi yêu cầu tư vấn từ website.'
        };

        // 3. UI Loading State
        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.7';
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Đang gửi...';

        try {
            // 4. API Request
            const response = await fetch('https://dev-api.zework.com/ze-support/v1/consultation-requests', {
                method: 'POST',
                headers: {
                    'accept': '*/*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            // 5. Handle Response
            if (response.ok) {
                // Success
                showToast('Gửi yêu cầu thành công! Đội ngũ Zework sẽ liên hệ với bạn sớm nhất.', 'success');
                contactForm.reset();
            } else {
                // Server Error
                const errorData = await response.json().catch(() => ({}));
                const msg = errorData.message || 'Có lỗi xảy ra khi gửi yêu cầu. Vui lòng thử lại sau.';
                showToast('Lỗi: ' + msg, 'error');
            }
        } catch (error) {
            // Network/Connection Error
            console.error('Submission error:', error);
            showToast('Không thể kết nối tới máy chủ. Vui lòng kiểm tra kết nối mạng của bạn.', 'error');
        } finally {
            // 6. Restore UI State
            submitBtn.disabled = false;
            submitBtn.style.opacity = '1';
            submitBtn.innerHTML = originalBtnText;
        }
    });

    // --- Toast Notification Helper ---
    function showToast(message, type = 'success') {
        let container = document.querySelector('.toast-container');
        if (!container) {
            container = document.createElement('div');
            container.className = 'toast-container';
            document.body.appendChild(container);
        }

        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        
        let icon = 'fa-check-circle';
        if (type === 'error') icon = 'fa-exclamation-circle';
        if (type === 'warning') icon = 'fa-exclamation-triangle';

        toast.innerHTML = `
            <i class="fas ${icon} toast-icon"></i>
            <div class="toast-content">${message}</div>
        `;

        container.appendChild(toast);

        // Transition trigger
        requestAnimationFrame(() => {
            toast.classList.add('show');
        });

        // Auto remove
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 600);
        }, 4500);
    }
});
