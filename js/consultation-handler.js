/**
 * Consultation Handler
 * Manages the consultation modal and form submission
 */
document.addEventListener('DOMContentLoaded', function() {
    const init = () => {
        const modal = document.getElementById('consultModal');
        const openBtns = document.querySelectorAll('.open-consult-modal');
        const closeBtn = document.getElementById('closeConsultModal');
        const consultForm = document.getElementById('consultForm');
        
        if (!modal || !consultForm) return;

        // ... existing logic ...
        function openModal() {
            modal.classList.add('show');
            document.body.style.overflow = 'hidden';
            renderTurnstile();
        }

        function closeModal() {
            modal.classList.remove('show');
            document.body.style.overflow = '';
        }

        openBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                openModal();
            });
        });

        closeBtn.addEventListener('click', closeModal);

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('show')) {
                closeModal();
            }
        });

        let widgetId = null;

        function renderTurnstile() {
            if (typeof turnstile !== 'undefined' && document.getElementById('modal-turnstile')) {
                if (widgetId === null) {
                    widgetId = turnstile.render('#modal-turnstile', {
                        sitekey: '1x00000000000000000000AA',
                        callback: function(token) {
                            window.turnstileToken = token;
                        },
                    });
                } else {
                    turnstile.reset(widgetId);
                }
            }
        }

        consultForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const submitBtn = consultForm.querySelector('.consult-submit-btn');
            const originalBtnText = submitBtn.innerHTML;
            const cfToken = window.turnstileToken || '';
            if (!cfToken) {
                showToast('Vui lòng xác nhận bạn không phải robot.', 'warning');
                return;
            }
            const formData = new FormData(consultForm);
            const subjectSelect = document.getElementById('consult-subject');
            const subjectText = subjectSelect.options[subjectSelect.selectedIndex]?.text || 'Tư vấn giải pháp';
            const payload = {
                name: formData.get('name'),
                phoneNumber: formData.get('phone'),
                email: formData.get('email'),
                companyName: 'N/A',
                type: `[Modal] ${subjectText}`,
                content: formData.get('message') || 'Yêu cầu tư vấn từ popup trang chủ.',
                'cf-turnstile-response': cfToken
            };
            submitBtn.disabled = true;
            submitBtn.style.opacity = '0.7';
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Đang gửi...';
            try {
                const response = await fetch('https://dev-api.zework.com/ze-support/v1/consultation-requests', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });
                if (response.ok) {
                    showToast('Gửi yêu cầu thành công! Chúng tôi sẽ liên hệ lại sớm nhất.', 'success');
                    consultForm.reset();
                    window.turnstileToken = '';
                    if (widgetId !== null) turnstile.reset(widgetId);
                    setTimeout(closeModal, 1500);
                } else {
                    const errorData = await response.json().catch(() => ({}));
                    showToast('Lỗi: ' + (errorData.message || 'Không thể gửi yêu cầu.'), 'error');
                }
            } catch (error) {
                console.error('Submission error:', error);
                showToast('Lỗi kết nối máy chủ. Vui lòng thử lại sau.', 'error');
            } finally {
                submitBtn.disabled = false;
                submitBtn.style.opacity = '1';
                submitBtn.innerHTML = originalBtnText;
            }
        });

        function showToast(message, type = 'success') {
            if (typeof window.showToast === 'function') {
                window.showToast(message, type);
                return;
            }
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
            requestAnimationFrame(() => toast.classList.add('show'));
            setTimeout(() => {
                toast.classList.remove('show');
                setTimeout(() => toast.remove(), 600);
            }, 4000);
        }
    };

    if (window.requestIdleCallback) {
        requestIdleCallback(init);
    } else {
        setTimeout(init, 350);
    }
});
