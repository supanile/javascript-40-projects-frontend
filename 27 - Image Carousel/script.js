// ดึง element ที่มี id เป็น 'container' มาเก็บในตัวแปร container
const container = document.getElementById('container');
// ดึงภาพทั้งหมดใน container มาเก็บในตัวแปร imgs
const imgs = document.querySelectorAll('#container img');
// ดึงปุ่มซ้ายที่มี id เป็น 'left' มาเก็บในตัวแปร leftBtn
const leftBtn = document.getElementById('left');
// ดึงปุ่มขวาที่มี id เป็น 'right' มาเก็บในตัวแปร rightBtn
const rightBtn = document.getElementById('right');
// ดึง container ที่ใช้เก็บจุด (dots) มาเก็บในตัวแปร dotsContainer
const dotsContainer = document.querySelector('.dots-container');

// กำหนดตัวแปร idx เริ่มต้นที่ 0 เพื่อใช้ในการติดตามภาพที่แสดง
let idx = 0;

// สร้างไข่ปลา (dots) สำหรับแต่ละภาพใน imgs
imgs.forEach((_, i) => {
    // สร้าง div ใหม่สำหรับไข่ปลา
    const dot = document.createElement('div');
    // เพิ่ม class 'dot' ให้กับ div ที่สร้างขึ้น
    dot.classList.add('dot');
    // เพิ่ม event listener ให้กับไข่ปลา เมื่อคลิกจะเปลี่ยนภาพและรีเซ็ต interval
    dot.addEventListener('click', () => {
        idx = i; // เปลี่ยนค่า idx เป็น index ของไข่ปลาที่ถูกคลิก
        changeImage(); // เรียกใช้ฟังก์ชันเปลี่ยนภาพ
        resetInterval(); // เรียกใช้ฟังก์ชันรีเซ็ต interval
    });
    // เพิ่มไข่ปลาที่สร้างขึ้นไปยัง dotsContainer
    dotsContainer.appendChild(dot);
});

// ดึงไข่ปลาทั้งหมดมาเก็บในตัวแปร dots
const dots = document.querySelectorAll('.dot');

// ฟังก์ชันสำหรับอัพเดทสถานะของไข่ปลา
function updateDots() {
    // สำหรับแต่ละไข่ปลาใน dots
    dots.forEach((dot, i) => {
        // เปลี่ยน class ของไข่ปลาเป็น 'active' ถ้า index ตรงกับ idx
        dot.classList.toggle('active', i === idx);
    });
}

// กำหนด interval สำหรับการเลื่อนภาพทุก 2 วินาที
let interval = setInterval(slide, 2000);

// ฟังก์ชันสำหรับเลื่อนภาพไปข้างหน้า
function slide() {
    idx++; // เพิ่มค่า idx ขึ้น 1
    changeImage(); // เรียกใช้ฟังก์ชันเปลี่ยนภาพ
}

// ฟังก์ชันสำหรับเปลี่ยนภาพที่แสดง
function changeImage() {
    // ถ้า idx มากกว่าจำนวนภาพ ให้กลับไปที่ภาพแรก
    if (idx > imgs.length - 1) {
        idx = 0;
    // ถ้า idx น้อยกว่า 0 ให้ไปที่ภาพสุดท้าย
    } else if (idx < 0) {
        idx = imgs.length - 1;
    }
    // เปลี่ยนตำแหน่งของ container ตามค่า idx
    container.style.transform = `translateX(${-idx * 33.33}%)`;
    // อัพเดทสถานะของไข่ปลา
    updateDots();
}

// เพิ่ม event listener ให้กับปุ่มซ้าย
leftBtn.addEventListener('click', () => {
    idx--; // ลดค่า idx ลง 1
    changeImage(); // เรียกใช้ฟังก์ชันเปลี่ยนภาพ
    resetInterval(); // รีเซ็ต interval
});

// เพิ่ม event listener ให้กับปุ่มขวา
rightBtn.addEventListener('click', () => {
    idx++; // เพิ่มค่า idx ขึ้น 1
    changeImage(); // เรียกใช้ฟังก์ชันเปลี่ยนภาพ
    resetInterval(); // รีเซ็ต interval
});

// ฟังก์ชันสำหรับรีเซ็ต interval
function resetInterval() {
    clearInterval(interval); // ลบ interval เดิม
    interval = setInterval(slide, 2000); // ตั้ง interval ใหม่สำหรับเลื่อนภาพ
}

// เรียกใช้ฟังก์ชัน updateDots เพื่ออัพเดทสถานะไข่ปลาเริ่มต้น
updateDots();