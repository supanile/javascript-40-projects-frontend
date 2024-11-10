// ดึงองค์ประกอบ HTML ที่มี id เป็น 'header' มาเก็บในตัวแปร header
const header = document.getElementById('header');
// ดึงองค์ประกอบ HTML ที่มี id เป็น 'title' มาเก็บในตัวแปร title
const title = document.getElementById('title');
// ดึงองค์ประกอบ HTML ที่มี id เป็น 'description' มาเก็บในตัวแปร description
const description = document.getElementById('description');
// ดึงองค์ประกอบ HTML ที่มี id เป็น 'profile_img' มาเก็บในตัวแปร profile_img
const profile_img = document.getElementById('profile_img');
// ดึงองค์ประกอบ HTML ที่มี id เป็น 'name' มาเก็บในตัวแปร seller_name
const seller_name = document.getElementById('name');
// ดึงองค์ประกอบ HTML ที่มี id เป็น 'price' มาเก็บในตัวแปร price
const price = document.getElementById('price');

// ดึงองค์ประกอบ HTML ที่มี class เป็น 'animated_bg' ทั้งหมดมาเก็บในตัวแปร animated_bg
const animated_bg = document.querySelectorAll('.animated_bg');
// ดึงองค์ประกอบ HTML ที่มี class เป็น 'animated_text' ทั้งหมดมาเก็บในตัวแปร animated_text
const animated_text = document.querySelectorAll('.animated_text');

// ตั้งเวลาให้เรียกใช้ฟังก์ชัน showContent หลังจาก 2000 มิลลิวินาที (2 วินาที)
setTimeout(showContent, 2000);

// ฟังก์ชันที่ใช้แสดงเนื้อหาหลังจากเวลาที่กำหนด
function showContent() {
    // เปลี่ยนเนื้อหาภายใน header เป็นภาพโซฟาหนัง
    header.innerHTML = `
        <img src="https://cdn.pixabay.com/photo/2013/09/26/11/59/leather-sofa-186636__340.jpg" alt="โซฟาหนัง">
    `;
    // เปลี่ยนเนื้อหาภายใน title เป็นชื่อโซฟาหนังคลาสสิก
    title.innerHTML = `โซฟาหนังคลาสสิก`;
    // เปลี่ยนเนื้อหาภายใน description เป็นรายละเอียดของโซฟาหนัง
    description.innerHTML = `
        โซฟาหนังแท้คุณภาพพรีเมียม ดีไซน์หรูหรา เหมาะสำหรับตกแต่งห้องรับแขก 
        ทนทานต่อการใช้งาน สามารถรองรับน้ำหนักได้ดี พร้อมรับประกันคุณภาพ 1 ปี
    `;
    // เปลี่ยนเนื้อหาภายใน profile_img เป็นภาพของผู้ขาย
    profile_img.innerHTML = `<img src="https://randomuser.me/api/portraits/women/75.jpg" alt="ผู้ขาย">`;
    // เปลี่ยนเนื้อหาภายใน seller_name เป็นชื่อของผู้ขาย
    seller_name.innerHTML = `พิมลดา จันทร์เพ็ญ`;
    // เปลี่ยนเนื้อหาภายใน price เป็นราคาของโซฟา
    price.innerHTML = `฿20,000`;

    // ลบ class 'animated_bg' ออกจากทุกองค์ประกอบใน animated_bg
    animated_bg.forEach(el => el.classList.remove('animated_bg'));
    // ลบ class 'animated_text' ออกจากทุกองค์ประกอบใน animated_text
    animated_text.forEach(el => el.classList.remove('animated_text'));
}