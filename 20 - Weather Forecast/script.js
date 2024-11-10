let city = "Tokyo"; // กำหนดค่าเริ่มต้นของเมืองเป็น "Tokyo"
const apiKey = "369717c5efa251123ef4ef094005e3e5"; // ต้องแทนที่ด้วย API key ที่ถูกต้อง

const form = document.getElementById('form'); // ดึง element ของฟอร์มจาก DOM
const search = document.getElementById('search'); // ดึง element ของ input สำหรับค้นหาจาก DOM

function setData() { // ฟังก์ชันสำหรับตั้งค่าข้อมูล
    showWeather(); // เรียกใช้ฟังก์ชัน showWeather เพื่อแสดงสภาพอากาศ
}

async function showWeather() { // ฟังก์ชันที่ใช้ดึงข้อมูลสภาพอากาศแบบอะซิงโครนัส
    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`; // สร้าง URL สำหรับเรียก API โดยใช้ชื่อเมืองและ API key
        const response = await fetch(url); // ดึงข้อมูลจาก API
        if (!response.ok) { // ตรวจสอบว่าการตอบกลับจาก API เป็นไปตามที่คาดหวังหรือไม่
            throw new Error(`HTTP error! status: ${response.status}`); // ถ้าไม่ใช่ ให้โยนข้อผิดพลาด
        }
        const data = await response.json(); // แปลงข้อมูลที่ได้รับจาก API เป็น JSON
        console.log(data); // แสดงข้อมูลใน console
        showDataToUI(data); // เรียกใช้ฟังก์ชัน showDataToUI เพื่อแสดงข้อมูลใน UI
    } catch (error) { // จัดการข้อผิดพลาดที่เกิดขึ้น
        console.log("There was a problem with the fetch operation:", error.message); // แสดงข้อความข้อผิดพลาดใน console
        alert("ไม่สามารถดึงข้อมูลสภาพอากาศได้ กรุณาลองใหม่อีกครั้ง"); // แสดงข้อความเตือนผู้ใช้
    }
}

function showDataToUI(data) { // ฟังก์ชันสำหรับแสดงข้อมูลสภาพอากาศใน UI
    const cityElement = document.getElementById('city'); // ดึง element สำหรับแสดงชื่อเมือง
    const stateElement = document.getElementById('state'); // ดึง element สำหรับแสดงชื่อรัฐ/ประเทศ
    const weatherElement = document.getElementById('weather'); // ดึง element สำหรับแสดงสภาพอากาศ
    const statusElement = document.getElementById('status'); // ดึง element สำหรับแสดงสถานะสภาพอากาศ
    const humidityElement = document.getElementById('humidity'); // ดึง element สำหรับแสดงความชื้น
    const windElement = document.getElementById('wind'); // ดึง element สำหรับแสดงความเร็วลม

    cityElement.innerText = data.name || "N/A"; // แสดงชื่อเมืองหรือ "N/A" ถ้าไม่มีข้อมูล
    stateElement.innerText = data.sys?.country || "N/A"; // แสดงชื่อรัฐ/ประเทศหรือ "N/A" ถ้าไม่มีข้อมูล
    
    const temp = calculate(data.main?.temp); // คำนวณอุณหภูมิจากค่า Kelvin
    const tempMin = calculate(data.main?.temp_min); // คำนวณอุณหภูมิต่ำสุด
    const tempMax = calculate(data.main?.temp_max); // คำนวณอุณหภูมิสูงสุด
    
    weatherElement.innerHTML = ` // แสดงข้อมูลอุณหภูมิใน HTML
        <h1>${temp.toFixed(1)} C&deg;</h1> // แสดงอุณหภูมิในรูปแบบที่มีทศนิยม 1 ตำแหน่ง
        <p class="small">min: ${tempMin.toFixed(1)} C&deg; max: ${tempMax.toFixed(1)} C&deg;</p> // แสดงอุณหภูมิต่ำสุดและสูงสุด
    `;

    statusElement.innerText = data.weather?.[0]?.main || "N/A"; // แสดงสถานะสภาพอากาศหรือ "N/A" ถ้าไม่มีข้อมูล
    humidityElement.innerText = `Humidity: ${data.main?.humidity || "N/A"}%`; // แสดงความชื้นหรือ "N/A" ถ้าไม่มีข้อมูล
    windElement.innerText = `Wind: ${data.wind?.speed || "N/A"} m/s`; // แสดงความเร็วลมหรือ "N/A" ถ้าไม่มีข้อมูล
}

function calculate(kelvin) { // ฟังก์ชันสำหรับคำนวณอุณหภูมิจาก Kelvin เป็น Celsius
    return kelvin ? kelvin - 273.15 : 0; // ถ้ามีค่า Kelvin ให้แปลงเป็น Celsius ถ้าไม่มีให้คืนค่า 0
}

function callDataAPI(e) { // ฟังก์ชันที่เรียกเมื่อฟอร์มถูกส่ง
    e.preventDefault(); // ป้องกันการส่งฟอร์มแบบปกติ
    city = search.value; // กำหนดค่า city เป็นค่าที่ผู้ใช้กรอกใน input
    showWeather(); // เรียกใช้ฟังก์ชัน showWeather เพื่อดึงข้อมูลสภาพอากาศ
}

form.addEventListener('submit', callDataAPI); // เพิ่ม event listener สำหรับการส่งฟอร์ม
setData(); // เรียกใช้ฟังก์ชัน setData เพื่อเริ่มต้นการแสดงข้อมูล