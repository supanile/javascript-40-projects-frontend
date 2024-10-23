const categories = document.querySelectorAll('.category');

// Initial check for elements in viewport
window.addEventListener('DOMContentLoaded', () => {
    showCategory();
});

// Scroll event with debounce for better performance
let timeout;
window.addEventListener('scroll', () => {
    if (timeout) {
        window.cancelAnimationFrame(timeout);
    }
    timeout = window.requestAnimationFrame(() => {
        showCategory();
    });
});

function showCategory() {
    const triggerPoint = window.innerHeight * 0.8;

    categories.forEach(category => {
        const topPosition = category.getBoundingClientRect().top;
        
        if (topPosition < triggerPoint) {
            category.classList.add('active');
        } else {
            category.classList.remove('active');
        }
    });
}