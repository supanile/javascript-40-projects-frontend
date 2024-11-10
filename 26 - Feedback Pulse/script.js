// เลือก container ที่ใช้แสดงคะแนน
const ratingContainer = document.querySelector('.ratings-container');
// เลือกทุก rating ที่มีอยู่ในหน้า
const ratings = document.querySelectorAll('.rating');
// เลือก panel ที่ใช้แสดงผลลัพธ์
const panel = document.getElementById('panel');
// เลือกปุ่มส่งคะแนน
const sendBtn = document.getElementById('send');

// กำหนดตัวแปรสำหรับเก็บคะแนนที่เลือก
let selected = null;

// เพิ่ม event listener สำหรับการคลิกที่ rating container
ratingContainer.addEventListener('click', (e) => {
    // หาค่า rating ที่ถูกคลิก
    const ratingElement = e.target.closest('.rating');
    if (ratingElement) {
        // ลบคลาส active จาก rating ทั้งหมด
        removeActive();
        // เพิ่มคลาส active ให้กับ rating ที่ถูกเลือก
        ratingElement.classList.add('active');
        // เก็บค่าข้อความของ rating ที่ถูกเลือก
        selected = ratingElement.querySelector('.rating-text').textContent;
    }
});

// ฟังก์ชันสำหรับลบคลาส active จาก rating ทั้งหมด
function removeActive() {
    ratings.forEach(rating => rating.classList.remove('active'));
}

// เพิ่ม event listener สำหรับการคลิกที่ปุ่มส่งคะแนน
sendBtn.addEventListener('click', () => {
    // ตรวจสอบว่ามีการเลือกคะแนนหรือไม่
    if (!selected) {
        // แสดง alert ถ้ายังไม่ได้เลือกคะแนน
        alert('กรุณาเลือกระดับความพึงพอใจ');
        return; // ออกจากฟังก์ชันถ้ายังไม่ได้เลือก
    }

    // แสดงผลลัพธ์ใน panel เมื่อมีการเลือกคะแนน
    panel.innerHTML = `
        <div class="completion-message">
            <div class="completion-icon">❤️</div>
            <h2 class="title">ขอบคุณที่ใช้บริการของเรา</h2>
            <p class="subtitle">ผลการประเมิน: ${selected}</p>
        </div>
    `;
});

// เพิ่มเสียงสั่นเมื่อ hover ที่ rating
ratings.forEach(rating => {
    rating.addEventListener('mouseenter', () => {
        // ตรวจสอบว่าฟังก์ชันสั่นมีอยู่ใน navigator หรือไม่
        if ('vibrate' in navigator) {
            navigator.vibrate(50); // สั่นเบาๆ เมื่อ hover
        }
    });
});