// ดึงองค์ประกอบ HTML ที่มี id เป็น "amount" มาเก็บในตัวแปร amountEl
const amountEl = document.getElementById("amount")
// ดึงองค์ประกอบ HTML ที่มี id เป็น "output1" มาเก็บในตัวแปร outputEl1
const outputEl1 = document.getElementById("output1")
// ดึงองค์ประกอบ HTML ที่มี id เป็น "output2" มาเก็บในตัวแปร outputEl2
const outputEl2 = document.getElementById("output2")
// ดึงองค์ประกอบ HTML ที่มี id เป็น "output3" มาเก็บในตัวแปร outputEl3
const outputEl3 = document.getElementById("output3")

// เพิ่ม event listener ให้กับ amountEl เมื่อมีการป้อนข้อมูล
amountEl.addEventListener("input",(e)=>{
    // เก็บค่าที่ป้อนเข้ามาในตัวแปร number
    const number = e.target.value 
    // แสดงผลค่าที่จัดรูปแบบเป็นตัวเลขใน outputEl1
    outputEl1.innerText = Intl.NumberFormat().format(number)
    // แสดงผลค่าที่จัดรูปแบบเป็นสกุลเงินไทยใน outputEl2
    outputEl2.innerText = Intl.NumberFormat("th-TH",{
        style:"currency",
        currency:"THB"
    }).format(number)
    // แสดงผลค่าที่จัดรูปแบบเป็นตัวเลขแบบย่อใน outputEl3
    outputEl3.innerText = Intl.NumberFormat("en",{notation:"compact"}).format(number)
})