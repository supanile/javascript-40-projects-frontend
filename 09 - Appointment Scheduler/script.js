// ดึง element จาก DOM โดยใช้ ID
const countDownForm = document.getElementById('countDownForm'); // ฟอร์มสำหรับนับถอยหลัง
const inputContainer = document.getElementById('input-container'); // กล่องสำหรับกรอกข้อมูล
const dateEl = document.getElementById('date-picker'); // Element สำหรับเลือกวันที่
const countDownEl = document.getElementById('countdown'); // Element สำหรับแสดงนับถอยหลัง

const countdownTitleEl = document.getElementById('countdown-title'); // Element สำหรับแสดงชื่อการนับถอยหลัง
const countdownButtonEl = document.getElementById('countdown-button'); // ปุ่มเริ่มนับถอยหลัง
const timeElements = document.querySelectorAll('li span'); // ดึง element สำหรับแสดงวัน ชั่วโมง นาที และวินาที

const completeEl = document.getElementById('complete'); // Element สำหรับแสดงเมื่อการนับถอยหลังเสร็จสิ้น
const completeInfoEl = document.getElementById('complete-info'); // Element สำหรับแสดงข้อมูลเมื่อเสร็จสิ้น
const completeButtonEl = document.getElementById('complete-button'); // ปุ่มสำหรับรีเซ็ตการนับถอยหลัง

let countDownTitle = ''; // ตัวแปรสำหรับเก็บชื่อการนับถอยหลัง
let countDownDate = ''; // ตัวแปรสำหรับเก็บวันที่การนับถอยหลัง
let countDownValue = Date; // ตัวแปรสำหรับเก็บค่าเวลาของการนับถอยหลัง
let countDownActive; // ตัวแปรสำหรับเก็บ interval ของการนับถอยหลัง
let savedCountDown; // ตัวแปรสำหรับเก็บการนับถอยหลังที่บันทึกไว้

const second = 1000; // จำนวนมิลลิวินาทีใน 1 วินาที
const minute = second * 60; // จำนวนมิลลิวินาทีใน 1 นาที
const hour = minute * 60; // จำนวนมิลลิวินาทีใน 1 ชั่วโมง
const day = hour * 24; // จำนวนมิลลิวินาทีใน 1 วัน

// ตั้งค่าวันที่ขั้นต่ำสำหรับการเลือกวันที่เป็นวันนี้
const today = new Date().toISOString().split('T')[0]; // ดึงวันที่ปัจจุบันในรูปแบบ ISO
dateEl.setAttribute('min', today); // ตั้งค่าวันที่ขั้นต่ำใน input เป็นวันนี้

function updateCountDown(e) { // ฟังก์ชันสำหรับอัปเดตการนับถอยหลัง
    e.preventDefault(); // ป้องกันการรีเฟรชหน้าเมื่อส่งฟอร์ม
    countDownTitle = e.srcElement[0].value; // เก็บชื่อการนับถอยหลังจากฟอร์ม
    countDownDate = e.srcElement[1].value; // เก็บวันที่จากฟอร์ม

    if (countDownDate === '') { // ตรวจสอบว่ามีการเลือกวันที่หรือไม่
        alert("Please select a date for your event"); // แจ้งเตือนหากไม่มีการเลือกวันที่
    } else {
        savedCountDown = { title: countDownTitle, date: countDownDate }; // สร้างอ็อบเจ็กต์สำหรับบันทึกการนับถอยหลัง
        localStorage.setItem("countdown", JSON.stringify(savedCountDown)); // บันทึกการนับถอยหลังใน localStorage
        countDownValue = new Date(countDownDate).getTime(); // แปลงวันที่เป็นมิลลิวินาที
        setUpTime(); // เรียกฟังก์ชันตั้งค่าเวลา
    }
}

function setUpTime() { // ฟังก์ชันสำหรับตั้งค่าเวลาในการนับถอยหลัง
    countDownActive = setInterval(() => { // เริ่มการนับถอยหลังทุกวินาที
        const now = new Date().getTime(); // ดึงเวลาปัจจุบัน
        const distance = countDownValue - now; // คำนวณระยะห่างระหว่างเวลาที่ตั้งไว้กับเวลาปัจจุบัน
        
        const days = Math.floor(distance / day); // คำนวณจำนวนวัน
        const hours = Math.floor((distance % day) / hour); // คำนวณจำนวนชั่วโมง
        const minutes = Math.floor((distance % hour) / minute); // คำนวณจำนวน นาที
        const seconds = Math.floor((distance % minute) / second); // คำนวณจำนวนวินาที

        inputContainer.hidden = true; // ซ่อนกล่องกรอกข้อมูล

        if (distance < 0) { // ตรวจสอบว่าการนับถอยหลังเสร็จสิ้นหรือไม่
            countDownEl.hidden = true; // ซ่อนการนับถอยหลัง
            completeEl.hidden = false; // แสดงข้อมูลเมื่อเสร็จสิ้น
            completeInfoEl.textContent = `${countDownTitle} finished on ${countDownDate}`; // แสดงข้อความเมื่อเสร็จสิ้น
            clearInterval(countDownActive); // หยุดการนับถอยหลัง
        } else {
            countdownTitleEl.textContent = `${countDownTitle}`; // แสดงชื่อการนับถอยหลัง
            timeElements[0].textContent = days; // แสดงจำนวนวัน
            timeElements[1].textContent = hours; // แสดงจำนวนชั่วโมง
            timeElements[2].textContent = minutes; // แสดงจำนวน นาที
            timeElements[3].textContent = seconds; // แสดงจำนวนวินาที
            completeEl.hidden = true; // ซ่อนข้อมูลเมื่อยังไม่เสร็จสิ้น
            countDownEl.hidden = false; // แสดงการนับถอยหลัง
        }
    }, second); // ตั้งเวลาให้ทำงานทุกวินาที
}

function reset() { // ฟังก์ชันสำหรับรีเซ็ตการนับถอยหลัง
    localStorage.removeItem("countdown"); // ลบการนับถอยหลังจาก localStorage
    countDownEl.hidden = true; // ซ่อนการนับถอยหลัง
    completeEl.hidden = true; // ซ่อนข้อมูลเมื่อเสร็จสิ้น
    inputContainer.hidden = false; // แสดงกล่องกรอกข้อมูล
    clearInterval(countDownActive); // หยุดการนับถอยหลัง
    countDownTitle = ''; // รีเซ็ตชื่อการนับถอยหลัง
    countDownDate = ''; // รีเซ็ตวันที่การนับถอยหลัง
    document.getElementById('title').value = ''; // ล้างค่าชื่อในฟอร์ม
    dateEl.value = ''; // ล้างค่าของวันที่ในฟอร์ม
}

function restorePreviousCountDown() { // ฟังก์ชันสำหรับกู้คืนการนับถอยหลังก่อนหน้า
    if (localStorage.getItem("countdown")) { // ตรวจสอบว่ามีการบันทึกการนับถอยหลังใน localStorage หรือไม่
        inputContainer.hidden = true; // ซ่อนกล่องกรอกข้อมูล
        savedCountDown = JSON.parse(localStorage.getItem("countdown")); // ดึงข้อมูลการนับถอยหลังจาก localStorage
        countDownTitle = savedCountDown.title; // เก็บชื่อการนับถอยหลัง
        countDownDate = savedCountDown.date; // เก็บวันที่การนับถอยหลัง
        countDownValue = new Date(countDownDate).getTime(); // แปลงวันที่เป็นมิลลิวินาที
        setUpTime(); // เรียกฟังก์ชันตั้งค่าเวลา
    }
}

// Event Listeners
countDownForm.addEventListener('submit', updateCountDown); // เพิ่ม event listener สำหรับการส่งฟอร์ม
countdownButtonEl.addEventListener('click', reset); // เพิ่ม event listener สำหรับปุ่มรีเซ็ต
completeButtonEl.addEventListener('click', reset); // เพิ่ม event listener สำหรับปุ่มรีเซ็ตเมื่อเสร็จสิ้น

// On Load
restorePreviousCountDown(); // เรียกฟังก์ชันกู้คืนการนับถอยหลังเมื่อโหลดหน้า