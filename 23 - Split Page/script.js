document.addEventListener('DOMContentLoaded', () => {
    const left = document.querySelector('.left');
    const right = document.querySelector('.right');
    const container = document.querySelector('.container');

    left.addEventListener('mouseenter', () => container.classList.add('hover-left'));
    left.addEventListener('mouseleave', () => container.classList.remove('hover-left'));

    right.addEventListener('mouseenter', () => container.classList.add('hover-right'));
    right.addEventListener('mouseleave', () => container.classList.remove('hover-right'));

    // Add touch support for mobile devices
    left.addEventListener('touchstart', () => container.classList.add('hover-left'));
    left.addEventListener('touchend', () => container.classList.remove('hover-left'));

    right.addEventListener('touchstart', () => container.classList.add('hover-right'));
    right.addEventListener('touchend', () => container.classList.remove('hover-right'));
});