// เลือกทุกองค์ประกอบที่มีคลาส 'item' และเก็บไว้ในตัวแปร items
const items = document.querySelectorAll('.item');

// ทำการวนลูปผ่านแต่ละ item ใน items
items.forEach((item) => {
    // เพิ่ม event listener สำหรับการคลิกที่ item
    item.addEventListener('click', () => {
        // เรียกใช้ฟังก์ชัน removeActive เพื่อเอา active class ออกจากทุก item
        removeActive();
        // เพิ่ม active class ให้กับ item ที่ถูกคลิก
        item.classList.add('active');
    });
});

// ฟังก์ชันสำหรับการลบ active class จากทุก item
function removeActive() {
    // ทำการวนลูปผ่านแต่ละ item ใน items
    items.forEach((item) => {
        // ลบ active class ออกจาก item
        item.classList.remove('active');
    });
}