// FAQ Accordion toggle
document.addEventListener('DOMContentLoaded', function() {
    var questions = document.querySelectorAll('.faq-question');
    
    questions.forEach(function(question) {
        question.addEventListener('click', function() {
            var item = this.closest('.faq-item');
            var isActive = item.classList.contains('active');
            
            // Close all items
            document.querySelectorAll('.faq-item.active').forEach(function(openItem) {
                openItem.classList.remove('active');
            });
            
            // Toggle clicked item (open if it was closed)
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
});
