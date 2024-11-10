// เลือกทุกองค์ประกอบ <i> ที่อยู่ในเอกสารและเก็บไว้ในตัวแปร rating
const rating = document.querySelectorAll("i")
// เลือกองค์ประกอบที่มี id เป็น "result" และเก็บไว้ในตัวแปร result
const result = document.getElementById("result")

// วนลูปผ่านแต่ละดาวในตัวแปร rating
rating.forEach((star, selectIndex) => {
    // เพิ่ม event listener สำหรับการคลิกที่ดาว
    star.addEventListener("click", () => {
        // วนลูปผ่านแต่ละดาวอีกครั้งเพื่อปรับสถานะ active
        rating.forEach((star, choices) => {
            // ถ้าดาวที่เลือกมีดัชนีมากกว่าหรือเท่ากับดัชนีของดาวในลูป
            if (selectIndex >= choices) {
                // เพิ่มคลาส active ให้กับดาวที่เลือก
                star.classList.add("active")
            } else {
                // ลบคลาส active ออกจากดาวที่ไม่เลือก
                star.classList.remove("active")
            }
        })
        // แสดงผลการประเมินในองค์ประกอบ result
        result.innerText = "ผลการประเมิน " + (selectIndex + 1) + "/5"
    })
})