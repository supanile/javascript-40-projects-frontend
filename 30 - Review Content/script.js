class ReviewCarousel { // สร้างคลาส ReviewCarousel
    constructor() { // ฟังก์ชัน constructor สำหรับการเริ่มต้นคลาส
        this.currentIndex = 0; // กำหนดดัชนีปัจจุบันเริ่มต้นที่ 0
        this.isPlaying = true; // กำหนดสถานะการเล่นเริ่มต้นเป็น true
        this.initializeElements(); // เรียกใช้ฟังก์ชัน initializeElements เพื่อกำหนดค่าเริ่มต้นขององค์ประกอบ
        this.setupEventListeners(); // เรียกใช้ฟังก์ชัน setupEventListeners เพื่อกำหนดการฟังเหตุการณ์
        this.createIndicators(); // เรียกใช้ฟังก์ชัน createIndicators เพื่อสร้างตัวบ่งชี้
        this.showReview(); // เรียกใช้ฟังก์ชัน showReview เพื่อแสดงรีวิวแรก
        this.startAutoplay(); // เรียกใช้ฟังก์ชัน startAutoplay เพื่อเริ่มการเล่นอัตโนมัติ
    }

    initializeElements() { // ฟังก์ชันสำหรับกำหนดค่าเริ่มต้นขององค์ประกอบใน DOM
        this.review = document.querySelector('.review'); // ค้นหาและเก็บองค์ประกอบที่มีคลาส 'review'
        this.userImage = document.querySelector('.user-image'); // ค้นหาและเก็บองค์ประกอบที่มีคลาส 'user-image'
        this.userName = document.querySelector('.user-name'); // ค้นหาและเก็บองค์ประกอบที่มีคลาส 'user-name'
        this.userJob = document.querySelector('.user-job'); // ค้นหาและเก็บองค์ประกอบที่มีคลาส 'user-job'
        this.prevBtn = document.querySelector('.prev-btn'); // ค้นหาและเก็บปุ่มก่อนหน้า
        this.nextBtn = document.querySelector('.next-btn'); // ค้นหาและเก็บปุ่มถัดไป
        this.container = document.querySelector('.container'); // ค้นหาและเก็บองค์ประกอบที่มีคลาส 'container'
        this.indicatorsContainer = document.querySelector('.indicators'); // ค้นหาและเก็บองค์ประกอบที่มีคลาส 'indicators'
    }

    setupEventListeners() { // ฟังก์ชันสำหรับตั้งค่าการฟังเหตุการณ์
        this.prevBtn.addEventListener('click', () => this.showPreviousReview()); // เมื่อคลิกปุ่มก่อนหน้าให้เรียกฟังก์ชัน showPreviousReview
        this.nextBtn.addEventListener('click', () => this.showNextReview()); // เมื่อคลิกปุ่มถัดไปให้เรียกฟังก์ชัน showNextReview
        
        // หยุดการเล่นอัตโนมัติเมื่อเมาส์อยู่เหนือ
        this.container.addEventListener('mouseenter', () => this.pauseAutoplay()); // หยุดการเล่นเมื่อเมาส์เข้า
        this.container.addEventListener('mouseleave', () => this.resumeAutoplay()); // เริ่มการเล่นเมื่อเมาส์ออก
    }

    createIndicators() { // ฟังก์ชันสำหรับสร้างตัวบ่งชี้
        userdata.forEach((_, index) => { // วนลูปผ่าน userdata
            const indicator = document.createElement('div'); // สร้าง div ใหม่สำหรับตัวบ่งชี้
            indicator.classList.add('indicator'); // เพิ่มคลาส 'indicator' ให้กับ div
            if (index === 0) indicator.classList.add('active'); // ถ้าเป็นตัวบ่งชี้แรกให้เพิ่มคลาส 'active'
            
            indicator.addEventListener('click', () => { // ตั้งค่าการฟังเหตุการณ์เมื่อคลิกที่ตัวบ่งชี้
                this.currentIndex = index; // กำหนดดัชนีปัจจุบันเป็นดัชนีของตัวบ่งชี้ที่ถูกคลิก
                this.showReview(); // เรียกใช้ฟังก์ชัน showReview เพื่อแสดงรีวิวที่เลือก
                this.resetProgress(); // เรียกใช้ฟังก์ชัน resetProgress เพื่อรีเซ็ตความก้าวหน้า
            });
            
            this.indicatorsContainer.appendChild(indicator); // เพิ่มตัวบ่งชี้เข้าไปใน indicatorsContainer
        });
    }

    updateIndicators() { // ฟังก์ชันสำหรับอัปเดตสถานะของตัวบ่งชี้
        const indicators = document.querySelectorAll('.indicator'); // ค้นหาทุกตัวบ่งชี้
        indicators.forEach((indicator, index) => { // วนลูปผ่านตัวบ่งชี้
            indicator.classList.toggle('active', index === this.currentIndex); // เปลี่ยนคลาส 'active' ตามดัชนีปัจจุบัน
        });
    }

    showReview() { // ฟังก์ชันสำหรับแสดงรีวิว
        const { name, job, text, image } = userdata[this.currentIndex]; // ดึงข้อมูลจาก userdata ตามดัชนีปัจจุบัน
        
        // เพิ่มเอฟเฟกต์การจางหาย
        this.review.style.opacity = 0; // ตั้งค่า opacity ของรีวิวเป็น 0
        this.userImage.style.opacity = 0; // ตั้งค่า opacity ของภาพผู้ใช้เป็น 0
        
        setTimeout(() => { // ตั้งเวลาเพื่อรอให้การจางหายเสร็จสิ้น
            this.review.innerHTML = text; // แสดงข้อความรีวิว
            this.userImage.src = image; // แสดงภาพผู้ใช้
            this.userName.innerHTML = name; // แสดงชื่อผู้ใช้
            this.userJob.innerHTML = job; // แสดงตำแหน่งงานของผู้ใช้
            
            // เพิ่มเอฟเฟกต์การปรากฏ
            this.review.style.opacity = 1; // ตั้งค่า opacity ของรีวิวเป็น 1
            this.userImage.style.opacity = 1; // ตั้งค่า opacity ของภาพผู้ใช้เป็น 1
        }, 200); // รอ 200 มิลลิวินาที
        
        this.updateIndicators(); // เรียกใช้ฟังก์ชัน updateIndicators เพื่ออัปเดตสถานะของตัวบ่งชี้
    }

    showNextReview() { // ฟังก์ชันสำหรับแสดงรีวิวถัดไป
        this.currentIndex = (this.currentIndex + 1) % userdata.length; // เพิ่มดัชนีปัจจุบันและวนกลับถ้าถึงจุดสิ้นสุด
        this.showReview(); // เรียกใช้ฟังก์ชัน showReview เพื่อแสดงรีวิวใหม่
        this.resetProgress(); // เรียกใช้ฟังก์ชัน resetProgress เพื่อรีเซ็ตความก้าวหน้า
    }

    showPreviousReview() { // ฟังก์ชันสำหรับแสดงรีวิวก่อนหน้า
        this.currentIndex = (this.currentIndex - 1 + userdata.length) % userdata.length; // ลดดัชนีปัจจุบันและวนกลับถ้าถึงจุดเริ่มต้น
        this.showReview(); // เรียกใช้ฟังก์ชัน showReview เพื่อแสดงรีวิวใหม่
        this.resetProgress(); // เรียกใช้ฟังก์ชัน resetProgress เพื่อรีเซ็ตความก้าวหน้า
    }

    resetProgress() { // ฟังก์ชันสำหรับรีเซ็ตความก้าวหน้าของแถบความก้าวหน้า
        const progressBar = document.querySelector('.progress-bar'); // ค้นหาแถบความก้าวหน้า
        progressBar.style.animation = 'none'; // หยุดการเคลื่อนไหวของแถบความก้าวหน้า
        progressBar.offsetHeight; // กระตุ้นการรีโฟลว์
        progressBar.style.animation = null; // เริ่มการเคลื่อนไหวใหม่
    }

    startAutoplay() { // ฟังก์ชันสำหรับเริ่มการเล่นอัตโนมัติ
        this.autoplayKanitval = setKanitval(() => { // ตั้งค่าฟังก์ชันที่เรียกทุก 10 วินาที
            if (this.isPlaying) { // ถ้ากำลังเล่นอยู่
                this.showNextReview(); // เรียกใช้ฟังก์ชัน showNextReview เพื่อแสดงรีวิวถัดไป
            }
        }, 10000); // ทุก 10 วินาที
    }

    pauseAutoplay() { // ฟังก์ชันสำหรับหยุดการเล่นอัตโนมัติ
        this.isPlaying = false; // เปลี่ยนสถานะการเล่นเป็น false
        const progressBar = document.querySelector('.progress-bar::after'); // ค้นหาแถบความก้าวหน้าหลัง
        if (progressBar) { // ถ้ามีแถบความก้าวหน้า
            progressBar.style.animationPlayState = 'paused'; // หยุดการเคลื่อนไหว
        }
    }

    resumeAutoplay() { // ฟังก์ชันสำหรับเริ่มการเล่นอัตโนมัติอีกครั้ง
        this.isPlaying = true; // เปลี่ยนสถานะการเล่นเป็น true
        const progressBar = document.querySelector('.progress-bar::after'); // ค้นหาแถบความก้าวหน้าหลัง
        if (progressBar) { // ถ้ามีแถบความก้าวหน้า
            progressBar.style.animationPlayState = 'running'; // เริ่มการเคลื่อนไหว
        }
    }
}

// เริ่มต้น carousel เมื่อโหลดหน้าเว็บ
document.addEventListener('DOMContentLoaded', () => { // รอให้ DOM โหลดเสร็จ
    new ReviewCarousel(); // สร้างอินสแตนซ์ใหม่ของ ReviewCarousel
});