// เลือกทุกองค์ประกอบที่มีคลาส 'content'
const contents = document.querySelectorAll('.content');

// เพิ่มตัวฟังก์ชันการเลื่อนหน้าเว็บ
document.addEventListener('scroll', showText);
// เพิ่มตัวฟังก์ชันเมื่อโหลดหน้าเว็บเสร็จ
window.addEventListener('load', showText);

// ฟังก์ชันสำหรับแสดงข้อความ
function showText() {
    // คำนวณจุดทริกเกอร์ที่ 4/5 ของความสูงหน้าจอ
    const triggerBottom = window.innerHeight / 5 * 4;

    // วนลูปผ่านทุกส่วน content
    contents.forEach((section) => {
        // หาตำแหน่งด้านบนของ Content 
        const sectionTop = section.getBoundingClientRect().top;
        // เลือกองค์ประกอบข้อความภายใน Content 
        const textEl = section.querySelector('.text');

        // ตรวจสอบว่า Content อยู่เหนือจุด trigger หรือไม่
        if (sectionTop < triggerBottom) {
            // ถ้าใช่ เพิ่มคลาส 'show-reveal' เพื่อแสดงข้อความ
            textEl.classList.add('show-reveal');
        } else {
            // ถ้าไม่ ลบคลาส 'show-reveal' เพื่อซ่อนข้อความ
            textEl.classList.remove('show-reveal');
        }
    });
}