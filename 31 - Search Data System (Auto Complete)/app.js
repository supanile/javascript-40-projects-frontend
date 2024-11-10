// สร้างอาเรย์ที่เก็บข้อมูลคำที่ใช้ในการค้นหา
const data = [
    "Angular",
    "Bootstrap",
    "C++",
    "Django",
    "Express.js",
    "Flutter",
    "Git",
    "HTML",
    "IntelliJ IDEA",
    "JavaScript",
    "Kotlin",
    "Linux",
    "MongoDB",
    "Node.js",
    "Oracle",
    "Python",
    "Qt",
    "React",
    "Swift",
    "TypeScript",
    "Ubuntu",
    "Vue.js",
    "WebStorm",
    "XML",
    "Yarn",
    "Zend Framework"
];

// ดึง element ที่มี id เป็น "search" จาก DOM
const search = document.getElementById("search")
// ดึง element ที่มี id เป็น "output" จาก DOM
const output = document.getElementById("output")

// ตั้งค่า event listener สำหรับการกดปุ่มบนคีย์บอร์ดใน input "search"
search.onkeyup = function() {
    // เก็บค่าที่พิมพ์ใน input "search"
    let word = search.value 
    // สร้างอาเรย์ว่างสำหรับเก็บผลลัพธ์
    let result = []
    
    // ตรวจสอบว่าความยาวของคำที่พิมพ์มีมากกว่า 0 หรือไม่
    if (word.length) {
        // กรองข้อมูลในอาเรย์ "data" โดยใช้คำที่พิมพ์
        result = data.filter((value) => {
            // คืนค่าความจริงถ้าคำในอาเรย์มีคำที่พิมพ์อยู่
            return value.toLowerCase().includes(word.toLowerCase())
        })
    }
    
    // ตรวจสอบว่ามีผลลัพธ์หรือไม่
    if (result.length > 0) {
        // สร้าง HTML สำหรับแสดงผลลัพธ์
        const content = result.map((value) => {
            // สร้างรายการ <li> สำหรับแต่ละคำในผลลัพธ์
            return "<li onclick=selectChoice(this)>" + value + "</li>"
        })
        // แสดงผลลัพธ์ใน element "output" โดยใช้ <ul>
        output.innerHTML = "<ul>" + content.join("") + "</ul>"
    } else {
        // ถ้าไม่มีผลลัพธ์ให้ล้างเนื้อหาใน element "output"
        output.innerHTML = ""
    }
}

// ฟังก์ชันสำหรับเลือกคำจากผลลัพธ์
function selectChoice(word) {
    // ตั้งค่า input "search" ให้เป็นคำที่เลือก
    search.value = word.innerHTML;
}