document.addEventListener('DOMContentLoaded', () => { // รอให้เอกสาร HTML โหลดเสร็จ
    const left = document.querySelector('.left'); // ค้นหาและเก็บองค์ประกอบที่มีคลาส 'left'
    const right = document.querySelector('.right'); // ค้นหาและเก็บองค์ประกอบที่มีคลาส 'right'
    const container = document.querySelector('.container'); // ค้นหาและเก็บองค์ประกอบที่มีคลาส 'container'

    left.addEventListener('mouseenter', () => container.classList.add('hover-left')); // เมื่อเมาส์เข้าไปใน 'left' ให้เพิ่มคลาส 'hover-left' ให้กับ 'container'
    left.addEventListener('mouseleave', () => container.classList.remove('hover-left')); // เมื่อเมาส์ออกจาก 'left' ให้ลบคลาส 'hover-left' ออกจาก 'container'

    right.addEventListener('mouseenter', () => container.classList.add('hover-right')); // เมื่อเมาส์เข้าไปใน 'right' ให้เพิ่มคลาส 'hover-right' ให้กับ 'container'
    right.addEventListener('mouseleave', () => container.classList.remove('hover-right')); // เมื่อเมาส์ออกจาก 'right' ให้ลบคลาส 'hover-right' ออกจาก 'container'

    // เพิ่มการสนับสนุนการสัมผัสสำหรับอุปกรณ์มือถือ
    left.addEventListener('touchstart', () => container.classList.add('hover-left')); // เมื่อเริ่มสัมผัสที่ 'left' ให้เพิ่มคลาส 'hover-left' ให้กับ 'container'
    left.addEventListener('touchend', () => container.classList.remove('hover-left')); // เมื่อสิ้นสุดการสัมผัสที่ 'left' ให้ลบคลาส 'hover-left' ออกจาก 'container'

    right.addEventListener('touchstart', () => container.classList.add('hover-right')); // เมื่อเริ่มสัมผัสที่ 'right' ให้เพิ่มคลาส 'hover-right' ให้กับ 'container'
    right.addEventListener('touchend', () => container.classList.remove('hover-right')); // เมื่อสิ้นสุดการสัมผัสที่ 'right' ให้ลบคลาส 'hover-right' ออกจาก 'container'
});