// เลือกองค์ประกอบที่มีคลาส 'image-wrapper' จาก DOM
const imageWrapper = document.querySelector('.image-wrapper');
// เลือกไอคอนหัวใจจาก DOM
const heartIcon = document.querySelector('.heart-icon i');
// เลือกเคาน์เตอร์จำนวนไลค์จาก DOM
const likeCounter = document.querySelector('.stats span');
// เลือกปุ่มไลค์จาก DOM
const likeButton = document.querySelector('.stats i');

// กำหนดตัวแปร likes เริ่มต้นที่ 0
let likes = 0;

// ฟังก์ชันสำหรับแสดงอนิเมชันหัวใจ
function showHeartAnimation() {
    // ตั้งค่าความโปร่งใสของไอคอนหัวใจเป็น 1
    heartIcon.style.opacity = '1';
    // เพิ่มคลาส 'fa-beat-fade' เพื่อเริ่มอนิเมชัน
    heartIcon.classList.add('fa-beat-fade');
    
    // ตั้งเวลาให้ทำงานหลังจาก 1000 มิลลิวินาที (1 วินาที)
    setTimeout(() => {
        // ตั้งค่าความโปร่งใสของไอคอนหัวใจเป็น 0
        heartIcon.style.opacity = '0';
        // ลบคลาส 'fa-beat-fade' เพื่อหยุดอนิเมชัน
        heartIcon.classList.remove('fa-beat-fade');
    }, 1000);
}

// ฟังก์ชันสำหรับอัปเดตจำนวนไลค์
function updateLikes() {
    // เพิ่มจำนวนไลค์ขึ้น 1
    likes++;
    // อัปเดตข้อความในเคาน์เตอร์ไลค์
    likeCounter.textContent = likes;
    // ลบคลาส 'far' ออกจากปุ่มไลค์
    likeButton.classList.remove('far');
    // เพิ่มคลาส 'fas' ให้กับปุ่มไลค์
    likeButton.classList.add('fas');
}

// เพิ่ม event listener สำหรับการดับเบิลคลิกที่ imageWrapper
imageWrapper.addEventListener('dblclick', () => {
    // เรียกใช้ฟังก์ชันแสดงอนิเมชันหัวใจ
    showHeartAnimation();
    // เรียกใช้ฟังก์ชันอัปเดตจำนวนไลค์
    updateLikes();
});

// เพิ่ม event listener สำหรับการคลิกที่ likeButton
likeButton.addEventListener('click', () => {
    // ตรวจสอบว่าปุ่มไลค์มีคลาส 'far' หรือไม่
    if (likeButton.classList.contains('far')) {
        // ถ้ามี ให้เรียกใช้ฟังก์ชันอัปเดตจำนวนไลค์
        updateLikes();
    } else {
        // ถ้าไม่มี ให้ลดจำนวนไลค์ลง 1
        likes--;
        // อัปเดตข้อความในเคาน์เตอร์ไลค์
        likeCounter.textContent = likes;
        // ลบคลาส 'fas' ออกจากปุ่มไลค์
        likeButton.classList.remove('fas');
        // เพิ่มคลาส 'far' ให้กับปุ่มไลค์
        likeButton.classList.add('far');
    }
});