const container = document.getElementById('container');
const imgs = document.querySelectorAll('#container img');
const leftBtn = document.getElementById('left');
const rightBtn = document.getElementById('right');
const dotsContainer = document.querySelector('.dots-container');

let idx = 0;

// สร้างไข่ปลา
imgs.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    dot.addEventListener('click', () => {
        idx = i;
        changeImage();
        resetInterval();
    });
    dotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll('.dot');

function updateDots() {
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === idx);
    });
}

let interval = setInterval(slide, 2000);

function slide() {
    idx++;
    changeImage();
}

function changeImage() {
    if (idx > imgs.length - 1) {
        idx = 0;
    } else if (idx < 0) {
        idx = imgs.length - 1;
    }
    container.style.transform = `translateX(${-idx * 33.33}%)`;
    updateDots();
}

leftBtn.addEventListener('click', () => {
    idx--;
    changeImage();
    resetInterval();
});

rightBtn.addEventListener('click', () => {
    idx++;
    changeImage();
    resetInterval();
});

function resetInterval() {
    clearInterval(interval);
    interval = setInterval(slide, 2000);
}

// เริ่มต้นด้วยการอัพเดทไข่ปลา
updateDots();