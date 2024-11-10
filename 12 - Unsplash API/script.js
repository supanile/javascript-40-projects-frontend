// กำหนดจำนวนภาพที่ต้องการดึง
const count=10;
// กำหนด API Key สำหรับการเข้าถึง Unsplash API
const apiKey='65A1FssOi_ZZ6CXn9Px_vlrpZHwxE2ki1W9LVjghsS4';
// สร้าง URL สำหรับเรียกข้อมูลภาพจาก Unsplash API โดยใช้ API Key และจำนวนภาพ
const apiUrl=`https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;

// ดึง element ที่มี id เป็น 'img-container' เพื่อใช้ในการแสดงภาพ
const imageContainer=document.getElementById('img-container');
// สร้าง array เพื่อเก็บข้อมูลภาพ
let photoArrays=[];

// ฟังก์ชันสำหรับดึงภาพจาก Unsplash API
async function getPhotos(){
    try{
        // เรียกข้อมูลจาก API
        const response = await fetch(apiUrl);
        // แปลงข้อมูลที่ได้จาก API เป็น JSON และเก็บไว้ใน photoArrays
        photoArrays=await response.json();
        // เรียกฟังก์ชันเพื่อแสดงภาพ
        displayImage();
    }catch(err){
        // แสดงข้อผิดพลาดในกรณีที่เกิดข้อผิดพลาด
        console.log(err);
    }
}

// ฟังก์ชันสำหรับแสดงภาพในหน้าเว็บ
function displayImage(){
    // วนลูปผ่านแต่ละภาพใน photoArrays
    photoArrays.forEach((photo)=>{
        // สร้าง element <a> สำหรับลิงก์ไปยังภาพ
        const item=document.createElement('a');
        // กำหนด href ของลิงก์เป็น URL ของภาพ
        item.setAttribute('href',photo.links.html);
        // กำหนดให้ลิงก์เปิดในแท็บใหม่
        item.setAttribute('target','_blank');

        // สร้าง element <img> สำหรับแสดงภาพ
        const img=document.createElement('img');
        // กำหนด src ของภาพเป็น URL ของภาพที่ดึงมา
        img.setAttribute('src',photo.urls.regular);
        // กำหนด title ของภาพเป็นคำบรรยายภาพ
        img.setAttribute('title',photo.alt_description);
        // กำหนด alt ของภาพเป็นคำบรรยายภาพ
        img.setAttribute('alt',photo.alt_description);

        // เพิ่มภาพเข้าไปในลิงก์
        item.appendChild(img);
        // เพิ่มลิงก์เข้าไปใน container ที่กำหนด
        imageContainer.appendChild(item);
    });
}

// เรียกฟังก์ชัน getPhotos เพื่อดึงภาพเมื่อเริ่มต้น
getPhotos();

// เพิ่ม event listener สำหรับการเลื่อนหน้าเว็บ
window.addEventListener('scroll',()=>{
    // ตรวจสอบว่าผู้ใช้เลื่อนถึงจุดที่กำหนดหรือไม่
    if(window.innerHeight+window.scrollY>=document.body.offsetHeight-100){
        // ดึงภาพมาแสดงผลอีกครั้งเมื่อเลื่อนถึงจุดที่กำหนด
        getPhotos();
    }
});