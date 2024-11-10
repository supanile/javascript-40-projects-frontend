// ดึงองค์ประกอบ countdown จาก HTML
const countdown = document.getElementById('countdown');
// ดึงองค์ประกอบ days จาก HTML
const days = document.getElementById('days');
// ดึงองค์ประกอบ hours จาก HTML
const hours = document.getElementById('hours');
// ดึงองค์ประกอบ minutes จาก HTML
const minutes = document.getElementById('minutes');
// ดึงองค์ประกอบ seconds จาก HTML
const seconds = document.getElementById('seconds');
// ดึงองค์ประกอบ new-year จาก HTML
const newYearElement = document.getElementById('new-year');

// รับปีปัจจุบัน
const currentYear = new Date().getFullYear();
// กำหนดเวลาของปีใหม่ในปีถัดไป
const newYearTime = new Date(`January 01 ${currentYear + 1} 00:00:00`);

// แสดงปีใหม่ในองค์ประกอบ newYearElement
newYearElement.innerText = currentYear + 1;

// ฟังก์ชันสำหรับอัปเดตการนับถอยหลัง
function updateCountdown() {
    // รับเวลาปัจจุบัน
    const currentTime = new Date();
    // คำนวณความแตกต่างระหว่างเวลาปีใหม่และเวลาปัจจุบัน
    const diff = newYearTime - currentTime;

    // คำนวณจำนวนวัน
    const d = Math.floor(diff / 1000 / 60 / 60 / 24);
    // คำนวณจำนวนชั่วโมง
    const h = Math.floor(diff / 1000 / 60 / 60) % 24;
    // คำนวณจำนวนนาที
    const m = Math.floor(diff / 1000 / 60) % 60;
    // คำนวณจำนวนวินาที
    const s = Math.floor(diff / 1000) % 60;

    // แสดงจำนวนวันในองค์ประกอบ days
    days.innerHTML = d < 10 ? '0' + d : d;
    // แสดงจำนวนชั่วโมงในองค์ประกอบ hours
    hours.innerHTML = h < 10 ? '0' + h : h;
    // แสดงจำนวนในนาทีในองค์ประกอบ minutes
    minutes.innerHTML = m < 10 ? '0' + m : m;
    // แสดงจำนวนวินาทีในองค์ประกอบ seconds
    seconds.innerHTML = s < 10 ? '0' + s : s;

    // ถ้าความแตกต่างน้อยกว่า 0 (เวลาปีใหม่ถึงแล้ว)
    if (diff < 0) {
        // หยุดการนับถอยหลัง
        clearInterval(interval);
        // แสดงข้อความ "สวัสดีปีใหม่!" ในองค์ประกอบ countdown
        countdown.innerHTML = '<h2>สวัสดีปีใหม่!</h2>';
    }
}

// เริ่มการนับถอยหลังทุก 1 วินาที
const interval = setInterval(updateCountdown, 1000);

// ฟังก์ชันสำหรับเปลี่ยนสีพื้นหลัง
function changeBackgroundGradient() {
    // สุ่มค่า hue ระหว่าง 0 ถึง 360
    const hue = Math.floor(Math.random() * 360);
    // เปลี่ยนสีพื้นหลังของเอกสารเป็นสีที่สุ่มได้
    document.body.style.backgroundColor = `hsl(${hue}, 50%, 50%)`;
}

// เริ่มการเปลี่ยนสีพื้นหลังทุก 10 วินาที
setInterval(changeBackgroundGradient, 1000); // เปลี่ยนสีทุก 10 วินาที