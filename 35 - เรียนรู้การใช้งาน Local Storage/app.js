// ดึงองค์ประกอบ HTML ที่มี id เป็น "setting" มาเก็บในตัวแปร setting
const setting = document.getElementById("setting")
// ดึงองค์ประกอบ <p> แรกในเอกสาร HTML มาเก็บในตัวแปร text
const text = document.querySelector("p")
// ดึงปุ่มที่มี id เป็น "reset" มาเก็บในตัวแปร resetBtn
const resetBtn = document.getElementById("reset")
// ดึงองค์ประกอบ <body> มาเก็บในตัวแปร body
const body = document.querySelector("body")

// เพิ่ม event listener ให้กับ setting เมื่อมีการเปลี่ยนแปลง
setting.addEventListener("change",()=>{
    // บันทึกการตั้งค่าลงใน local storage โดยใช้ค่า checked ของ setting
    localStorage.setItem("night-mode",setting.checked)
    // เรียกใช้ฟังก์ชัน loadTheme เพื่อปรับธีมตามการตั้งค่า
    loadTheme()
})

// เพิ่ม event listener ให้กับ resetBtn เมื่อมีการคลิก
resetBtn.addEventListener("click",()=>{
    // ลบข้อมูลทั้งหมดใน local storage
    localStorage.clear()
    // เรียกใช้ฟังก์ชัน loadTheme เพื่อปรับธีมหลังจากลบข้อมูล
    loadTheme()
})

// ฟังก์ชันสำหรับโหลดธีมตามการตั้งค่าใน local storage
function loadTheme(){
    // ดึงการตั้งค่าจาก local storage และแปลงเป็น boolean
    const status = JSON.parse(localStorage.getItem("night-mode"))
    // ตั้งค่า checked ของ setting ตามค่าที่ดึงมา
    setting.checked=status
    // ตรวจสอบสถานะของ status
    if(status){
        // ถ้า status เป็น true แสดงข้อความ "โหมดกลางคืน"
        text.innerText="โหมดกลางคืน"
        // เปลี่ยนสีพื้นหลังเป็นสีดำ
        body.style.backgroundColor="black"
        // เปลี่ยนสีตัวอักษรเป็นสีขาว
        body.style.color="white"
        // เพิ่มการเปลี่ยนแปลงสีเป็นเวลา 1 วินาที
        body.style.transition="1s"
    }else{
        // ถ้า status เป็น false แสดงข้อความ "โหมดกลางวัน"
        text.innerText="โหมดกลางวัน"
        // เปลี่ยนสีพื้นหลังเป็นสีขาว
        body.style.backgroundColor="white"
        // เปลี่ยนสีตัวอักษรเป็นสีดำ
        body.style.color="black"
        // เพิ่มการเปลี่ยนแปลงสีเป็นเวลา 1 วินาที
        body.style.transition="1s"
    }
}

// เรียกใช้ฟังก์ชัน loadTheme เพื่อโหลดธีมเมื่อเริ่มต้น
loadTheme()