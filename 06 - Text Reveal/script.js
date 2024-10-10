const contents = document.querySelectorAll('.content');

document.addEventListener('scroll', showText);
window.addEventListener('load', showText); // เพิ่มการตรวจสอบเมื่อโหลดหน้าเว็บ

function showText() {
    const triggerBottom = window.innerHeight / 5 * 4;

    contents.forEach((section) => {
        const sectionTop = section.getBoundingClientRect().top;
        const textEl = section.querySelector('.text');

        if (sectionTop < triggerBottom) {
            textEl.classList.add('show-reveal');
        } else {
            textEl.classList.remove('show-reveal');
        }
    });
}