// เลือกปุ่มจากเอกสาร HTML
const button = document.querySelector("button")
// เลือกองค์ประกอบที่จะแสดงผลลัพธ์จากเอกสาร HTML
const result = document.getElementById("result")

// เพิ่ม event listener ให้กับปุ่ม เมื่อมีการคลิก
button.addEventListener("click",()=>{ 
    // รับค่าจาก input วันที่แรก
    const date1 = document.getElementById("date1").value 
    // รับค่าจาก input วันที่สอง
    const date2 = document.getElementById("date2").value 

    // สร้างวัตถุวันที่จากค่าที่ได้รับสำหรับวันที่แรก
    const startDate = new Date(date1) 
    // สร้างวัตถุวันที่จากค่าที่ได้รับสำหรับวันที่สอง
    const endDate = new Date(date2) 

    // คำนวณหาผลต่างของวัน โดยการหาค่าที่เป็นบวกของผลต่างระหว่างวันที่สองและวันที่แรก
    const times = Math.abs(endDate - startDate) 
    // แปลงเวลาเป็นวัน โดยการหารค่าผลต่างด้วยจำนวนมิลลิวินาทีในหนึ่งวัน
    const days = Math.round(times/(1000*60*60*24)) 
    // แสดงผลลัพธ์ในองค์ประกอบที่เลือก โดยบอกจำนวนวันที่ห่างกัน
    result.innerText="ห่างกัน "+days+" วัน" 
})