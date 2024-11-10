// เลือก textarea จากเอกสาร HTML
const textarea = document.querySelector("textarea")
// เลือกองค์ประกอบที่แสดงจำนวนตัวอักษร
const amount = document.querySelector(".amount")
// เลือกองค์ประกอบที่ใช้แสดงสถานะการจำกัดตัวอักษร
const limit = document.querySelector(".limit")

// เพิ่ม event listener สำหรับการกดปุ่มใน textarea
textarea.addEventListener("keyup",()=>{ 
    // นับจำนวนตัวอักษรใน textarea
    let count = textarea.value.length 
    // แสดงจำนวนตัวอักษรใน amount
    amount.innerText = count 
    // ตรวจสอบว่าจำนวนตัวอักษรมากกว่า 20 หรือไม่
    if(count>20){ 
        // ถ้ามากกว่า 20 ให้เพิ่มคลาส active ให้กับ limit
        limit.classList.add("active") 
    }else{
        // ถ้าน้อยกว่าหรือเท่ากับ 20 ให้ลบคลาส active ออกจาก limit
        limit.classList.remove("active") 
    }
})