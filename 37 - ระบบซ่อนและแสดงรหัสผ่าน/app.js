// เลือก input element จาก DOM โดยใช้ querySelector
const input = document.querySelector("input")
// เลือก button element จาก DOM โดยใช้ querySelector
const button = document.querySelector("button")

// เพิ่ม event listener ให้กับ button เมื่อมีการคลิก
button.addEventListener("click",()=>{ 
    // ตรวจสอบว่า type ของ input เป็น "password" หรือไม่
    if(input.getAttribute("type")==="password"){ 
        // ถ้าเป็น "password" ให้เปลี่ยน type เป็น "text"
        input.setAttribute("type","text") 
        // เปลี่ยนข้อความบนปุ่มเป็น "ซ่อนรหัสผ่าน"
        button.innerText="ซ่อนรหัสผ่าน" 
    }else{ 
        // ถ้าไม่ใช่ "password" ให้เปลี่ยน type กลับเป็น "password"
        input.setAttribute("type","password") 
        // เปลี่ยนข้อความบนปุ่มเป็น "แสดงรหัสผ่าน"
        button.innerText="แสดงรหัสผ่าน" 
    }
})