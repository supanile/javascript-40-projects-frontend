function displayResult() { // ฟังก์ชันสำหรับแสดงผลลัพธ์
    try { // เริ่มต้นบล็อก try เพื่อจัดการข้อผิดพลาด
        const codeHTML = document.getElementById("html").value; // ดึงค่า HTML จาก textarea ที่มี id เป็น "html"
        const codeCSS = document.getElementById("css").value; // ดึงค่า CSS จาก textarea ที่มี id เป็น "css"
        const codeJS = document.getElementById("js").value; // ดึงค่า JavaScript จาก textarea ที่มี id เป็น "js"
        const resultEl = document.getElementById("result"); // ดึง iframe ที่มี id เป็น "result"
        
        const content = ` // สร้างเนื้อหาสำหรับ iframe
            <!DOCTYPE html> // ประกาศประเภทเอกสาร HTML
            <html>
            <head>
                <link href="https://fonts.googleapis.com/css2?family=Kanit:wght@300;400;500&display=swap" rel="stylesheet"> // ลิงก์ไปยังฟอนต์ Kanit
                <style>
                    * { // กำหนดสไตล์สำหรับทุกองค์ประกอบ
                        font-family: 'Kanit', sans-serif; // ใช้ฟอนต์ Kanit
                    }
                    ${codeCSS} // แทรก CSS ที่ผู้ใช้ป้อน
                </style>
            </head>
            <body>
                ${codeHTML} // แทรก HTML ที่ผู้ใช้ป้อน
                <script>${codeJS}<\/script> // แทรก JavaScript ที่ผู้ใช้ป้อน
            </body>
            </html>
        `;
        
        // Set iframe content
        resultEl.contentDocument.open(); // เปิดเอกสารใน iframe
        resultEl.contentDocument.write(content); // เขียนเนื้อหาลงใน iframe
        resultEl.contentDocument.close(); // ปิดเอกสารใน iframe
        
    } catch (error) { // จัดการข้อผิดพลาดที่เกิดขึ้น
        console.error('Error executing code:', error); // แสดงข้อผิดพลาดในคอนโซล
        alert('An error occurred while executing the code. Check console for details.'); // แสดงข้อความเตือนผู้ใช้
    }
}

// Auto-resize textareas
document.querySelectorAll('textarea').forEach(textarea => { // เลือก textarea ทั้งหมดและทำการวนลูป
    textarea.addEventListener('input', function() { // เพิ่ม event listener สำหรับการป้อนข้อมูล
        this.style.height = 'auto'; // รีเซ็ตความสูงของ textarea
        this.style.height = this.scrollHeight + 'px'; // ปรับความสูงให้พอดีกับเนื้อหาภายใน
    });
});