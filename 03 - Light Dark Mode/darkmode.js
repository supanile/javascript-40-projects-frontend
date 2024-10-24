document.addEventListener('DOMContentLoaded', () => {
    // ดึงสถานะ darkmode จาก localStorage
    let darkmode = localStorage.getItem('darkmode');
    // ดึง element ที่มี id เป็น 'theme-switch'
    const themeSwitch = document.getElementById('theme-switch');
  
    // ฟังก์ชันเปิดใช้งาน darkmode
    const enableDarkmode = () => {
        document.body.classList.add('darkmode'); // เพิ่ม class 'darkmode' ให้กับ body
        localStorage.setItem('darkmode', 'active'); // บันทึกสถานะ darkmode เป็น 'active' ใน localStorage
    };
  
    // ฟังก์ชันปิดใช้งาน darkmode
    const disableDarkmode = () => {
        document.body.classList.remove('darkmode'); // ลบ class 'darkmode' ออกจาก body
        localStorage.setItem('darkmode', null); // บันทึกสถานะ darkmode เป็น null ใน localStorage
    };
  
    // ตรวจสอบสถานะ darkmode และเปิดใช้งานถ้าสถานะเป็น 'active'
    if (darkmode === "active") enableDarkmode();
  
    // เพิ่ม event listener ให้กับปุ่ม themeSwitch
    themeSwitch.addEventListener("click", () => {
        darkmode = localStorage.getItem('darkmode'); // ดึงสถานะ darkmode ปัจจุบัน
        // สลับสถานะ darkmode ระหว่างเปิดและปิด
        darkmode !== "active" ? enableDarkmode() : disableDarkmode();
    });
  });