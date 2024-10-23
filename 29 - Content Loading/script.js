const header = document.getElementById('header');
const title = document.getElementById('title');
const description = document.getElementById('description');
const profile_img = document.getElementById('profile_img');
const seller_name = document.getElementById('name');
const price = document.getElementById('price');

const animated_bg = document.querySelectorAll('.animated_bg');
const animated_text = document.querySelectorAll('.animated_text');

setTimeout(showContent, 2000);

function showContent() {
    header.innerHTML = `
        <img src="https://cdn.pixabay.com/photo/2013/09/26/11/59/leather-sofa-186636__340.jpg" alt="โซฟาหนัง">
    `;
    title.innerHTML = `โซฟาหนังคลาสสิก`;
    description.innerHTML = `
        โซฟาหนังแท้คุณภาพพรีเมียม ดีไซน์หรูหรา เหมาะสำหรับตกแต่งห้องรับแขก 
        ทนทานต่อการใช้งาน สามารถรองรับน้ำหนักได้ดี พร้อมรับประกันคุณภาพ 1 ปี
    `;
    profile_img.innerHTML = `<img src="https://randomuser.me/api/portraits/women/75.jpg" alt="ผู้ขาย">`;
    seller_name.innerHTML = `พิมลดา จันทร์เพ็ญ`;
    price.innerHTML = `฿20,000`;

    animated_bg.forEach(el => el.classList.remove('animated_bg'));
    animated_text.forEach(el => el.classList.remove('animated_text'));
}