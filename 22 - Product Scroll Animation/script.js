// เลือกทุกองค์ประกอบที่มีคลาส 'category' และเก็บไว้ในตัวแปร categories
const categories = document.querySelectorAll('.category');

// ฟังก์ชันนี้จะถูกเรียกเมื่อเอกสาร HTML ถูกโหลดเสร็จ
window.addEventListener('DOMContentLoaded', () => {
    // เรียกใช้ฟังก์ชัน showCategory เพื่อแสดงหมวดหมู่ที่อยู่ใน viewport
    showCategory();
});

// ตัวแปร timeout สำหรับการจัดการการเลื่อน (scroll) เพื่อเพิ่มประสิทธิภาพ
let timeout;
// ฟังก์ชันนี้จะถูกเรียกเมื่อมีการเลื่อนหน้าเว็บ
window.addEventListener('scroll', () => {
    // ถ้ามี timeout อยู่แล้ว ให้ยกเลิกการเรียกใช้งานก่อนหน้า
    if (timeout) {
        window.cancelAnimationFrame(timeout);
    }
    // ตั้งค่า timeout ใหม่เพื่อเรียกใช้ฟังก์ชัน showCategory ในรอบถัดไป
    timeout = window.requestAnimationFrame(() => {
        showCategory();
    });
});

// ฟังก์ชัน showCategory สำหรับตรวจสอบและแสดงหมวดหมู่ที่อยู่ใน viewport
function showCategory() {
    // กำหนดจุดที่ต้องการให้แสดงหมวดหมู่ (80% ของความสูงหน้าต่าง)
    const triggerPoint = window.innerHeight * 0.8;

    // วนลูปผ่านแต่ละหมวดหมู่ใน categories
    categories.forEach(category => {
        // รับตำแหน่งด้านบนของหมวดหมู่ใน viewport
        const topPosition = category.getBoundingClientRect().top;
        
        // ถ้าหมวดหมู่อยู่เหนือ triggerPoint ให้เพิ่มคลาส 'active'
        if (topPosition < triggerPoint) {
            category.classList.add('active');
        } else {
            // ถ้าหมวดหมู่ไม่อยู่เหนือ triggerPoint ให้ลบคลาส 'active'
            category.classList.remove('active');
        }
    });
}