// เลือก element ต่างๆ จาก DOM
const typingText = document.querySelector(".typing-text p"),
inpField = document.querySelector(".wrapper .input-field"),
timeTag = document.querySelector(".time"),
mistakeTag = document.querySelector(".mistake"),
wpmTag = document.querySelector(".wpm"),
cpmTag = document.querySelector(".cpm"),
tryAgainBtn = document.querySelector("button");

// กำหนดตัวแปรสำหรับการทำงานของเกม
let timer,
maxTime = 60, // เวลาสูงสุด 60 วินาที
timeLeft = maxTime, // เวลาที่เหลือ
charIndex = mistakes = isTyping = 0; // ตัวนับตัวอักษร, ข้อผิดพลาด, สถานะการพิมพ์

// ฟังก์ชันโหลดย่อหน้าใหม่
function loadParagraph() {
    const ranIndex = Math.floor(Math.random() * paragraphs.length); // สุ่มเลือกย่อหน้า
    typingText.innerHTML = ""; // ล้างเนื้อหาย่อหน้า
    paragraphs[ranIndex].split("").forEach(char => { // แยกย่อหน้าเป็นตัวอักษร
        let span = `<span>${char}</span>`; // สร้าง span สำหรับแต่ละตัวอักษร
        typingText.innerHTML += span; // Add  span ลงในย่อหน้า
    });
    typingText.querySelectorAll("span")[0].classList.add("active"); // กำหนดตัวอักษรแรกเป็น active
    document.addEventListener("keydown", () => inpField.focus()); // โฟกัสที่ input เมื่อกดคีย์
    typingText.addEventListener("click", () => inpField.focus()); // โฟกัสที่ input เมื่อคลิกที่ย่อหน้า
}

// ฟังก์ชันเริ่มต้นการพิมพ์
function initTyping() {
    let characters = typingText.querySelectorAll("span"); // เลือกตัวอักษรทั้งหมด
    let typedChar = inpField.value.split("")[charIndex]; // ตัวอักษรที่พิมพ์
    if(charIndex < characters.length - 1 && timeLeft > 0) { // ตรวจสอบว่าตัวอักษรยังไม่หมดและเวลายังเหลือ
        if(!isTyping) { // ถ้ายังไม่ได้เริ่มพิมพ์
            timer = setInterval(initTimer, 1000); // เริ่มจับเวลา
            isTyping = true; // เปลี่ยนสถานะเป็นกำลังพิมพ์
        }
        if(typedChar == null) { // ถ้าตัวอักษรที่พิมพ์เป็น null (ลบตัวอักษร)
            if(charIndex > 0) { // ถ้าตัวอักษรไม่ใช่ตัวแรก
                charIndex--; // ลดตัวนับตัวอักษร
                if(characters[charIndex].classList.contains("incorrect")) { // ถ้าตัวอักษรผิด
                    mistakes--; // ลดจำนวนข้อผิดพลาด
                }
                characters[charIndex].classList.remove("correct", "incorrect"); // ลบคลาส correct และ incorrect
            }
        } else {
            if(characters[charIndex].innerText == typedChar) { // ถ้าตัวอักษรถูกต้อง
                characters[charIndex].classList.add("correct"); // Add คลาส correct
            } else {
                mistakes++; // Add จำนวนข้อผิดพลาด
                characters[charIndex].classList.add("incorrect"); // Add คลาส incorrect
            }
            charIndex++; // Add ตัวนับตัวอักษร
        }
        characters.forEach(span => span.classList.remove("active")); // ลบคลาส active จากทุกตัวอักษร
        characters[charIndex].classList.add("active"); // Add คลาส active ให้ตัวอักษรปัจจุบัน

        let wpm = Math.round(((charIndex - mistakes)  / 5) / (maxTime - timeLeft) * 60); // คำนวณ WPM
        wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm; // ตรวจสอบค่า WPM ว่าถูกต้องหรือไม่
        
        wpmTag.innerText = wpm; // แสดงค่า WPM
        mistakeTag.innerText = mistakes; // แสดงจำนวนข้อผิดพลาด
        cpmTag.innerText = charIndex - mistakes; // แสดงจำนวนตัวอักษรที่พิมพ์ถูกต้อง
    } else {
        clearInterval(timer); // หยุดจับเวลา
        inpField.value = ""; // ล้างค่าใน input
    }   
}

// ฟังก์ชันจับเวลา
function initTimer() {
    if(timeLeft > 0) { // ถ้าเวลายังเหลือ
        timeLeft--; // ลดเวลาลง
        timeTag.innerText = timeLeft + "s"; // แสดงเวลาที่เหลือ
        let wpm = Math.round(((charIndex - mistakes)  / 5) / (maxTime - timeLeft) * 60); // คำนวณ WPM
        wpmTag.innerText = wpm; // แสดงค่า WPM
    } else {
        clearInterval(timer); // หยุดจับเวลา
    }
}

// ฟังก์ชันรีเซ็ตเกม
function resetGame() {
    loadParagraph(); // โหลดย่อหน้าใหม่
    clearInterval(timer); // หยุดจับเวลา
    timeLeft = maxTime; // รีเซ็ตเวลา
    charIndex = mistakes = isTyping = 0; // รีเซ็ตตัวนับและสถานะ
    inpField.value = ""; // ล้างค่าใน input
    timeTag.innerText = timeLeft + "s"; // แสดงเวลาเริ่มต้น
    wpmTag.innerText = 0; // รีเซ็ต WPM
    mistakeTag.innerText = 0; // รีเซ็ตข้อผิดพลาด
    cpmTag.innerText = 0; // รีเซ็ต CPM
}

// เริ่มต้นโหลดย่อหน้า
loadParagraph();
// Add event listener สำหรับ input และปุ่มลองใหม่
inpField.addEventListener("input", initTyping);
tryAgainBtn.addEventListener("click", resetGame);