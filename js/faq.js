// FAQ Accordion toggle
document.addEventListener('DOMContentLoaded', function() {
    const init = () => {
        var questions = document.querySelectorAll('.faq-question');
        questions.forEach(function(question) {
            question.addEventListener('click', function() {
                var item = this.closest('.faq-item');
                var isActive = item.classList.contains('active');
                document.querySelectorAll('.faq-item.active').forEach(function(openItem) {
                    openItem.classList.remove('active');
                });
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        });
    };
    if (window.requestIdleCallback) {
        requestIdleCallback(init);
    } else {
        setTimeout(init, 300);
    }
});
