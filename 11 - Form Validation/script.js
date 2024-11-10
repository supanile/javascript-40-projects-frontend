// ดึง element ของฟอร์มจาก DOM
const form=document.getElementById('form');
// ดึง element ของชื่อผู้ใช้จาก DOM
const username=document.getElementById('username');
// ดึง element ของอีเมลจาก DOM
const email=document.getElementById('email');
// ดึง element ของรหัสผ่านจาก DOM
const password1=document.getElementById('password');
// ดึง element ของการยืนยันรหัสผ่านจาก DOM
const password2=document.getElementById('re-password');

// เพิ่ม event listener สำหรับการส่งฟอร์ม
form.addEventListener('submit',function(e){
    // ป้องกันการส่งฟอร์มแบบปกติ
    e.preventDefault();
    // ตรวจสอบค่าที่กรอกในฟิลด์ต่างๆ
    checkInput([username,email,password1,password2]);
    // ตรวจสอบว่าอีเมลที่กรอกถูกต้องหรือไม่
    if(!validateEmail(email.value.trim())){
        // แสดงข้อความผิดพลาดถ้าอีเมลไม่ถูกต้อง
        showerror(email,'อีเมลไม่ถูกต้อง');
    }else{
       // แสดงข้อความสำเร็จถ้าอีเมลถูกต้อง
       showsuccess(email);
    }
    // ตรวจสอบความตรงกันของรหัสผ่าน
    checkPassword(password1,password2);
    // ตรวจสอบความยาวของชื่อผู้ใช้
    checkInputLength(username,5,10);
    // ตรวจสอบความยาวของรหัสผ่าน
    checkInputLength(password1,5,12);
});

// ฟังก์ชันสำหรับแสดงข้อความผิดพลาด
function showerror(input,message){
    // ดึง element ของฟอร์มที่เกี่ยวข้อง
    const formControl=input.parentElement;
    // เปลี่ยน class ของฟอร์มเป็น 'error'
    formControl.className='form-control error';
    // ดึง element ของข้อความผิดพลาด
    const small=formControl.querySelector('small');
    // แสดงข้อความผิดพลาด
    small.innerText=message;
}

// ฟังก์ชันสำหรับแสดงข้อความสำเร็จ
function showsuccess(input){
    // ดึง element ของฟอร์มที่เกี่ยวข้อง
    const formControl=input.parentElement;
    // เปลี่ยน class ของฟอร์มเป็น 'success'
    formControl.className='form-control success';
}

// ฟังก์ชันสำหรับตรวจสอบอีเมล
function validateEmail(email) {
    // กำหนดรูปแบบอีเมลที่ถูกต้อง
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    // ตรวจสอบว่าอีเมลตรงตามรูปแบบหรือไม่
    return re.test(String(email).toLowerCase());
}

// ฟังก์ชันสำหรับตรวจสอบค่าที่กรอกในฟิลด์
function checkInput(inputArray){
    // วนลูปตรวจสอบแต่ละฟิลด์ใน inputArray
    inputArray.forEach(function(input){
        // ถ้าฟิลด์ว่าง
        if(input.value.trim() === ''){
            // แสดงข้อความผิดพลาด
            showerror(input,`กรุณาป้อน ${getInputCase(input)}`);
        }else{
            // แสดงข้อความสำเร็จถ้าฟิลด์ไม่ว่าง
            showsuccess(input);
        }
    });
}

// ฟังก์ชันสำหรับแปลงชื่อฟิลด์ให้เป็นรูปแบบที่อ่านง่าย
function getInputCase(input){
    // แปลงตัวอักษรตัวแรกเป็นตัวพิมพ์ใหญ่และรวมกับตัวอักษรที่เหลือ
    return input.id.charAt(0).toUpperCase()+input.id.slice(1);
}

// ฟังก์ชันสำหรับตรวจสอบความตรงกันของรหัสผ่าน
function checkPassword(password1,password2){
    // ถ้ารหัสผ่านไม่ตรงกัน
    if(password1.value !== password2.value){
        // แสดงข้อความผิดพลาด
        showerror(password2,'รหัสผ่านไม่ตรงกัน');
    }
}

// ฟังก์ชันสำหรับตรวจสอบความยาวของฟิลด์
function checkInputLength(input,min,max){
    // ถ้าความยาวน้อยกว่าหรือเท่ากับ min
    if(input.value.length<=min){
        // แสดงข้อความผิดพลาด
        showerror(input,`${getInputCase(input)} ต้องมากกว่า ${min} ตัวอักษร`)
    // ถ้าความยาวมากกว่า max
    }else if(input.value.length>max){
        // แสดงข้อความผิดพลาด
        showerror(input,`${getInputCase(input)} ต้องไม่เกิน ${max} ตัวอักษร`)
    }else{
        // แสดงข้อความสำเร็จถ้าความยาวอยู่ในช่วงที่กำหนด
        showsuccess(input);
    }
}