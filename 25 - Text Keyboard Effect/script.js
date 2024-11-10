// DOM Elements
const textEl = document.getElementById('text'); // ดึงองค์ประกอบ DOM ที่มี ID เป็น 'text' เพื่อใช้แสดงข้อความ
const speedEl = document.getElementById('speed'); // ดึงองค์ประกอบ DOM ที่มี ID เป็น 'speed' เพื่อใช้ควบคุมความเร็ว
const speedValueEl = document.getElementById('speed-value'); // ดึงองค์ประกอบ DOM ที่มี ID เป็น 'speed-value' เพื่อแสดงค่าความเร็ว

// Configuration
const text = "Welcome To My Home Page"; // กำหนดข้อความที่จะถูกแสดง
let charIndex = 1; // ตัวแปรสำหรับเก็บตำแหน่งของตัวอักษรที่จะแสดง
let speed = 300 / speedEl.value; // คำนวณความเร็วเริ่มต้นจากค่าที่ได้จาก speedEl

// Main animation function
function writeText() { // ฟังก์ชันหลักสำหรับการแสดงข้อความ
    textEl.innerText = text.slice(0, charIndex); // แสดงข้อความจากตำแหน่ง 0 ถึง charIndex
    charIndex++; // เพิ่มค่า charIndex เพื่อแสดงตัวอักษรถัดไป
    
    if (charIndex > text.length) { // ถ้าตำแหน่งตัวอักษรเกินความยาวของข้อความ
        charIndex = 1; // รีเซ็ต charIndex กลับไปที่ 1 เพื่อเริ่มใหม่
    }
    
    setTimeout(writeText, speed); // เรียกฟังก์ชัน writeText อีกครั้งหลังจากเวลาที่กำหนด
}

// Speed control event listener
speedEl.addEventListener('input', (e) => { // เพิ่ม event listener สำหรับการเปลี่ยนแปลงค่าความเร็ว
    speed = 300 / e.target.value; // คำนวณความเร็วใหม่จากค่าที่ผู้ใช้ป้อน
    speedValueEl.textContent = `${e.target.value}x`; // แสดงค่าความเร็วที่ผู้ใช้ป้อนใน speedValueEl
});

// Start animation
writeText(); // เริ่มการแสดงข้อความ