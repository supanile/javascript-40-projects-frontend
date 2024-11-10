// ดึงองค์ประกอบที่มี id เป็น 'toggle' มาเก็บในตัวแปร toggle
const toggle=document.getElementById('toggle');

// ดึงองค์ประกอบที่มี id เป็น 'open' มาเก็บในตัวแปร open
const open=document.getElementById('open');
// ดึงองค์ประกอบที่มี id เป็น 'modal' มาเก็บในตัวแปร modal
const modal=document.getElementById('modal');
// ดึงองค์ประกอบที่มี id เป็น 'close' มาเก็บในตัวแปร close
const close=document.getElementById('close');

// เพิ่ม event listener ให้กับ toggle เมื่อถูกคลิก
toggle.addEventListener('click',()=>{
    // สลับคลาส 'show-nav' ของ body เพื่อแสดงหรือซ่อนเมนู
    document.body.classList.toggle('show-nav');
});

// เพิ่ม event listener ให้กับ open เมื่อถูกคลิก
open.addEventListener('click',()=>{
    // เพิ่มคลาส 'show-modal' ให้กับ modal เพื่อแสดง modal
    modal.classList.add('show-modal');
});

// เพิ่ม event listener ให้กับ close เมื่อถูกคลิก
close.addEventListener('click',()=>{
    // ลบคลาส 'show-modal' จาก modal เพื่อซ่อน modal
    modal.classList.remove('show-modal');
});

// เพิ่ม event listener ให้กับ window เมื่อมีการคลิก
window.addEventListener('click',e=> 
    // ถ้าคลิกที่ modal ให้ลบคลาส 'show-modal' เพื่อซ่อน modal
    e.target == modal ? modal.classList.remove('show-modal') : false
);