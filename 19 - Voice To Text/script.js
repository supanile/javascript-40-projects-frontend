// สร้างตัวแปร SpeechRecognize เพื่อใช้ในการเข้าถึง API ของ Speech Recognition
const SpeechRecognize = window.SpeechRecognition || window.webkitSpeechRecognition;
// สร้างตัวแปร recognize เพื่อสร้างอินสแตนซ์ของ SpeechRecognize
const recognize = new SpeechRecognize();
// ค้นหาและเก็บปุ่มบันทึกเสียงในตัวแปร btn
const btn = document.querySelector('.record');
// ค้นหาและเก็บปุ่มเปลี่ยนภาษาในตัวแปร langSwitch
const langSwitch = document.querySelector('.lang-switch');
// ค้นหาและเก็บปุ่มล้างข้อความในตัวแปร clearTextBtn
const clearTextBtn = document.querySelector('.clear-text');
// ค้นหาและเก็บองค์ประกอบที่แสดงภาษาปัจจุบันในตัวแปร currentLang
const currentLang = document.querySelector('.current-lang');
// ค้นหาและเก็บองค์ประกอบที่แสดงชื่อเรื่องในตัวแปร title
const title = document.querySelector('.title');
// ค้นหาและเก็บองค์ประกอบที่แสดงชื่อรองในตัวแปร subtitle
const subtitle = document.querySelector('.subtitle');
// ค้นหาและเก็บองค์ประกอบที่แสดงข้อความในตัวแปร message
const message = document.querySelector('.message');

// กำหนดตัวแปร isThaiLanguage เพื่อใช้ในการตรวจสอบว่าภาษาเป็นภาษาไทยหรือไม่
let isThaiLanguage = true;

// ฟังก์ชันสำหรับเปลี่ยนภาษา
function toggleLanguage() {
    // สลับค่าของ isThaiLanguage
    isThaiLanguage = !isThaiLanguage;
    // กำหนดภาษาให้กับ recognize ตามค่าของ isThaiLanguage
    recognize.lang = isThaiLanguage ? "th-TH" : "en-US";
    
    // อัปเดต UI elements ตามภาษาที่เลือก
    currentLang.textContent = isThaiLanguage ? "TH" : "EN"; // อัปเดตข้อความภาษาปัจจุบัน
    title.textContent = isThaiLanguage ? "แปลงเสียงพูดเป็นข้อความ" : "Voice to Text Converter"; // อัปเดตชื่อเรื่อง
    subtitle.textContent = isThaiLanguage ? "Voice to Text Converter" : "แปลงเสียงพูดเป็นข้อความ"; // อัปเดตชื่อรอง
    langSwitch.textContent = isThaiLanguage ? "Switch to English" : "เปลี่ยนเป็นภาษาไทย"; // อัปเดตข้อความปุ่มเปลี่ยนภาษา
    clearTextBtn.textContent = isThaiLanguage ? "ล้างข้อความ" : "Clear Text"; // อัปเดตข้อความปุ่มล้างข้อความ
    
    // อัปเดตข้อความปุ่มบันทึกเสียง
    if (btn.classList.contains('record')) {
        btn.textContent = isThaiLanguage ? "บันทึก" : "Record"; // ถ้าปุ่มเป็น 'record' ให้เปลี่ยนข้อความ
    } else {
        btn.textContent = isThaiLanguage ? "หยุด" : "Pause"; // ถ้าปุ่มเป็น 'pause' ให้เปลี่ยนข้อความ
    }
}

// ฟังก์ชันสำหรับบันทึกเสียง
function recordVoice() {
    // ตรวจสอบว่าปุ่มอยู่ในสถานะบันทึกหรือไม่
    const isRecord = btn.classList.contains('record');

    if (isRecord) {
        // ถ้าปุ่มอยู่ในสถานะบันทึก ให้เริ่มการบันทึกเสียง
        recognize.start();
        btn.classList.remove('record'); // ลบคลาส 'record'
        btn.classList.add('pause'); // เพิ่มคลาส 'pause'
        btn.innerText = isThaiLanguage ? "หยุด" : "Pause"; // เปลี่ยนข้อความปุ่ม
    } else {
        // ถ้าปุ่มอยู่ในสถานะหยุด ให้หยุดการบันทึกเสียง
        recognize.stop();
        btn.classList.remove('pause'); // ลบคลาส 'pause'
        btn.classList.add('record'); // เพิ่มคลาส 'record'
        btn.innerText = isThaiLanguage ? "บันทึก" : "Record"; // เปลี่ยนข้อความปุ่ม
    }
}

// ฟังก์ชันสำหรับตั้งค่าเสียงเป็นข้อความ
function setVoicetoText(e) {
    // เพิ่มข้อความที่ได้จากการรู้จำเสียงลงในข้อความที่แสดง
    message.innerText += e.results[0][0].transcript;
}

// ฟังก์ชันสำหรับล้างข้อความ
function clearText() {
    // ล้างข้อความที่แสดง
    message.innerText = '';
}

// ฟังก์ชันสำหรับดำเนินการบันทึกต่อ
function continueRecord() {
    // ตรวจสอบว่าปุ่มอยู่ในสถานะหยุดหรือไม่
    const isPause = btn.classList.contains('pause');
    if (isPause) {
        // ถ้าปุ่มอยู่ในสถานะหยุด ให้เริ่มการบันทึกเสียงอีกครั้ง
        recognize.start();
    }
}

// ฟังก์ชันสำหรับตั้งค่าเสียง
function setUpVoice() {
    // กำหนดภาษาเริ่มต้นให้กับ recognize
    recognize.lang = "th-TH";
    // เพิ่ม event listener สำหรับปุ่มบันทึกเสียง
    btn.addEventListener('click', recordVoice);
    // เพิ่ม event listener สำหรับปุ่มเปลี่ยนภาษา
    langSwitch.addEventListener('click', toggleLanguage);
    // เพิ่ม event listener สำหรับปุ่มล้างข้อความ
    clearTextBtn.addEventListener('click', clearText);
    // เพิ่ม event listener สำหรับการรับผลลัพธ์จากการรู้จำเสียง
    recognize.addEventListener('result', setVoicetoText);
    // เพิ่ม event listener สำหรับการสิ้นสุดการรู้จำเสียง
    recognize.addEventListener('end', continueRecord);
}

// เรียกใช้ฟังก์ชัน setUpVoice เพื่อเริ่มต้นการทำงาน
setUpVoice();