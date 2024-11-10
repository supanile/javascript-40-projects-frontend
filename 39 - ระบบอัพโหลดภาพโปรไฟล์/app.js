// เลือกองค์ประกอบ <img> จากเอกสาร HTML และเก็บไว้ในตัวแปร image
const image = document.querySelector("img")
// เลือกองค์ประกอบ <input> จากเอกสาร HTML และเก็บไว้ในตัวแปร input
const input = document.querySelector("input")

// เพิ่ม event listener ให้กับ input เมื่อมีการเปลี่ยนแปลง (เช่น เมื่อผู้ใช้เลือกไฟล์)
input.addEventListener("change", ()=>{
    // สร้าง URL สำหรับไฟล์ที่ผู้ใช้เลือกและกำหนดให้เป็น src ของ image
    image.src = URL.createObjectURL(input.files[0])
})