class SliderController { // สร้างคลาส SliderController
    constructor() { // ฟังก์ชัน constructor สำหรับการสร้างอ็อบเจ็กต์ใหม่
        this.slideContainer = document.querySelector('.slider-container'); // ค้นหาและเก็บอ้างอิงไปยัง container ของสไลด์
        this.slideRight = document.querySelector('.right-content'); // ค้นหาและเก็บอ้างอิงไปยังเนื้อหาด้านขวา
        this.slideLeft = document.querySelector('.left-content'); // ค้นหาและเก็บอ้างอิงไปยังเนื้อหาด้านซ้าย
        this.upButton = document.querySelector('.up-button'); // ค้นหาและเก็บอ้างอิงไปยังปุ่มเลื่อนขึ้น
        this.downButton = document.querySelector('.down-button'); // ค้นหาและเก็บอ้างอิงไปยังปุ่มเลื่อนลง
        
        this.slidesCount = this.slideRight.querySelectorAll('.slide').length; // นับจำนวนสไลด์ในเนื้อหาด้านขวา
        this.activeSlideIndex = 0; // กำหนดดัชนีของสไลด์ที่ใช้งานอยู่เริ่มต้นที่ 0
        
        this.init(); // เรียกใช้ฟังก์ชัน init เพื่อเริ่มต้นการทำงาน
    }
    
    init() { // ฟังก์ชัน init สำหรับการตั้งค่าเริ่มต้น
        this.upButton.addEventListener('click', () => this.changeSlide('up')); // เพิ่ม event listener ให้กับปุ่มเลื่อนขึ้น
        this.downButton.addEventListener('click', () => this.changeSlide('down')); // เพิ่ม event listener ให้กับปุ่มเลื่อนลง
        
        // เพิ่มการนำทางด้วยคีย์บอร์ด
        document.addEventListener('keydown', (e) => { // เพิ่ม event listener สำหรับการกดปุ่ม
            if (e.key === 'ArrowUp') this.changeSlide('up'); // ถ้ากดปุ่มลูกศรขึ้น ให้เปลี่ยนสไลด์ขึ้น
            if (e.key === 'ArrowDown') this.changeSlide('down'); // ถ้ากดปุ่มลูกศรลง ให้เปลี่ยนสไลด์ลง
        });
        
        // เพิ่มการสนับสนุนการสัมผัส
        let touchStartY = 0; // กำหนดตัวแปรสำหรับเก็บตำแหน่ง Y ของการสัมผัสเริ่มต้น
        this.slideContainer.addEventListener('touchstart', (e) => { // เพิ่ม event listener สำหรับการเริ่มสัมผัส
            touchStartY = e.touches[0].clientY; // เก็บตำแหน่ง Y ของการสัมผัส
        });
        
        this.slideContainer.addEventListener('touchmove', (e) => { // เพิ่ม event listener สำหรับการเคลื่อนที่สัมผัส
            e.preventDefault(); // ป้องกันการเลื่อนหน้าเว็บ
            const touchEndY = e.touches[0].clientY; // เก็บตำแหน่ง Y ของการสัมผัสเมื่อสิ้นสุด
            const diff = touchStartY - touchEndY; // คำนวณความแตกต่างระหว่างตำแหน่งเริ่มต้นและสิ้นสุด
            
            if (Math.abs(diff) > 50) { // ถ้าความแตกต่างมากกว่า 50 พิกเซล (ระยะทางการปัดขั้นต่ำ)
                if (diff > 0) { // ถ้าปัดขึ้น
                    this.changeSlide('up'); // เปลี่ยนสไลด์ขึ้น
                } else { // ถ้าปัดลง
                    this.changeSlide('down'); // เปลี่ยนสไลด์ลง
                }
                touchStartY = touchEndY; // อัปเดตตำแหน่งเริ่มต้นสำหรับการสัมผัสครั้งถัดไป
            }
        });
    }
    
    changeSlide(direction) { // ฟังก์ชันสำหรับเปลี่ยนสไลด์
        const sliderHeight = this.slideContainer.clientHeight; // เก็บความสูงของ slider
        
        if (direction === 'up') { // ถ้าทิศทางคือขึ้น
            this.activeSlideIndex++; // เพิ่มดัชนีของสไลด์ที่ใช้งานอยู่
            if (this.activeSlideIndex > this.slidesCount - 1) { // ถ้าดัชนีเกินจำนวนสไลด์
                this.activeSlideIndex = 0; // รีเซ็ตดัชนีเป็น 0
            }
        } else if (direction === 'down') { // ถ้าทิศทางคือลง
            this.activeSlideIndex--; // ลดดัชนีของสไลด์ที่ใช้งานอยู่
            if (this.activeSlideIndex < 0) { // ถ้าดัชนีต่ำกว่า 0
                this.activeSlideIndex = this.slidesCount - 1; // รีเซ็ตดัชนีเป็นสไลด์สุดท้าย
            }
        }
        
        this.updateSlidePosition(sliderHeight); // เรียกใช้ฟังก์ชันอัปเดตตำแหน่งสไลด์
    }
    
    updateSlidePosition(height) { // ฟังก์ชันสำหรับอัปเดตตำแหน่งของสไลด์
        const position = -this.activeSlideIndex * height; // คำนวณตำแหน่งใหม่ของสไลด์
        this.slideLeft.style.transform = `translateY(${position}px)`; // ปรับตำแหน่งของเนื้อหาด้านซ้าย
        this.slideRight.style.transform = `translateY(${position}px)`; // ปรับตำแหน่งของเนื้อหาด้านขวา
    }
}

// เริ่มต้น slider เมื่อ DOM ถูกโหลด
document.addEventListener('DOMContentLoaded', () => { // เพิ่ม event listener สำหรับการโหลด DOM
    new SliderController(); // สร้างอ็อบเจ็กต์ใหม่ของ SliderController
});