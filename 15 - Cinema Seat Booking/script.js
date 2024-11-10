// เลือก container ที่ใช้ในการแสดงที่นั่ง
const container = document.querySelector('.container');
// เลือก layout ของที่นั่ง
const seatLayout = document.querySelector('.seat-layout');
// เลือก element ที่ใช้แสดงจำนวนที่นั่งที่เลือก
const count = document.getElementById('count');
// เลือก element ที่ใช้แสดงราคาทั้งหมด
const total = document.getElementById('total');
// เลือก element ที่ใช้ในการเลือกภาพยนตร์
const movieSelect = document.getElementById('movie');

// กำหนดราคาของภาพยนตร์จากค่าเริ่มต้นที่เลือก
let moviePrice = +movieSelect.value;

// สร้างฟังก์ชันสำหรับสร้างที่นั่ง
function createSeats() {
    // กำหนดตัวอักษรแถวที่ใช้
    const rows = 'ABCDEFGHIJKL';
    // กำหนดจำนวนที่นั่งในแต่ละแถว
    const seatsPerRow = 25;
    
    // วนลูปเพื่อสร้างที่นั่งในแต่ละแถว
    for (let i = rows.length - 1; i >= 0; i--) {
        // สร้าง div สำหรับแถวที่นั่ง
        const row = document.createElement('div');
        row.classList.add('row');
        
        // สร้าง div สำหรับแสดงตัวอักษรแถว
        const rowLabel = document.createElement('div');
        rowLabel.classList.add('row-label');
        rowLabel.textContent = rows[i]; // กำหนดตัวอักษรแถว
        row.appendChild(rowLabel); // เพิ่มตัวอักษรแถวลงในแถว
        
        // วนลูปเพื่อสร้างที่นั่งในแถว
        for (let j = 0; j < seatsPerRow; j++) {
            // สร้าง div สำหรับที่นั่ง
            const seat = document.createElement('div');
            seat.classList.add('seat');
            
            // กำหนดที่นั่ง VIP (สีฟ้า) สำหรับ 3 แถวล่าง
            if (i < 3) {
                seat.classList.add('vip');
            }
            
            // สุ่มที่นั่งที่ถูกจองแล้ว
            if (Math.random() < 0.1) {
                seat.classList.add('occupied');
            }
            
            // เพิ่มที่นั่งลงในแถว
            row.appendChild(seat);
        }
        
        // สร้าง div สำหรับแสดงตัวอักษรแถวท้ายแถว
        const rowLabelEnd = document.createElement('div');
        rowLabelEnd.classList.add('row-label');
        rowLabelEnd.textContent = rows[i]; // กำหนดตัวอักษรแถว
        row.appendChild(rowLabelEnd); // เพิ่มตัวอักษรแถวท้ายแถวลงในแถว
        
        // เพิ่มแถวที่นั่งลงใน layout ของที่นั่ง
        seatLayout.appendChild(row);
    }
}

// เรียกใช้ฟังก์ชันสร้างที่นั่ง
createSeats();

// สร้างฟังก์ชันสำหรับอัพเดทจำนวนที่นั่งที่เลือก
function updateSelectedCount() {
    // เลือกที่นั่งที่ถูกเลือก
    const selectedSeats = document.querySelectorAll('.row .seat.selected');
    const selectedSeatsCount = selectedSeats.length; // นับจำนวนที่นั่งที่เลือก
    count.innerText = selectedSeatsCount; // แสดงจำนวนที่นั่งที่เลือก
    
    let totalPrice = 0; // กำหนดตัวแปรสำหรับราคาทั้งหมด
    selectedSeats.forEach(seat => {
        // คำนวณราคาทั้งหมดตามประเภทที่นั่ง
        totalPrice += seat.classList.contains('vip') ? moviePrice + 50 : moviePrice;
    });
    
    total.innerText = totalPrice; // แสดงราคาทั้งหมด
    
    // สร้างอาร์เรย์สำหรับเก็บดัชนีที่นั่งที่เลือก
    const seatsIndex = [...selectedSeats].map(seat => [...document.querySelectorAll('.row .seat')].indexOf(seat));
    // บันทึกดัชนีที่นั่งที่เลือกลงใน localStorage
    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));
}

// สร้างฟังก์ชันสำหรับบันทึกข้อมูลภาพยนตร์
function setMovieData(movieIndex, moviePrice) {
    // บันทึกดัชนีภาพยนตร์ที่เลือกลงใน localStorage
    localStorage.setItem('selectedMovieIndex', movieIndex);
    // บันทึกราคาของภาพยนตร์ที่เลือกลงใน localStorage
    localStorage.setItem('selectedMoviePrice', moviePrice);
}

// สร้างฟังก์ชันสำหรับโหลดข้อมูลจาก localStorage
function populateUI() {
    // โหลดดัชนีที่นั่งที่เลือกจาก localStorage
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
    if (selectedSeats !== null && selectedSeats.length > 0) {
        // วนลูปเพื่อทำเครื่องหมายที่นั่งที่ถูกเลือก
        document.querySelectorAll('.row .seat').forEach((seat, index) => {
            if (selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected'); // ทำเครื่องหมายที่นั่งที่ถูกเลือก
            }
        });
    }

    // โหลดดัชนีภาพยนตร์ที่เลือกจาก localStorage
    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
    if (selectedMovieIndex !== null) {
        movieSelect.selectedIndex = selectedMovieIndex; // กำหนดดัชนีภาพยนตร์ที่เลือก
    }
}

// สร้าง Event Listener สำหรับการคลิกที่ที่นั่ง
container.addEventListener('click', e => {
    // ตรวจสอบว่าคลิกที่ที่นั่งที่ไม่ถูกจอง
    if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
        e.target.classList.toggle('selected'); // เปลี่ยนสถานะที่นั่งที่ถูกเลือก
        updateSelectedCount(); // อัพเดทจำนวนที่นั่งที่เลือก
    }
});

// สร้าง Event Listener สำหรับการเปลี่ยนภาพยนตร์
movieSelect.addEventListener('change', e => {
    moviePrice = +e.target.value; // กำหนดราคาของภาพยนตร์ที่เลือก
    setMovieData(e.target.selectedIndex, e.target.value); // บันทึกข้อมูลภาพยนตร์
    updateSelectedCount(); // อัพเดทจำนวนที่นั่งที่เลือก
});

// เริ่มต้นแอพพลิเคชัน
populateUI(); // โหลดข้อมูลจาก localStorage
updateSelectedCount(); // อัพเดทจำนวนที่นั่งที่เลือก

// สร้างฟังก์ชันสำหรับปรับขนาดจอให้เท่ากับที่นั่ง
function adjustScreenSize() {
    const seats = document.querySelector('.row'); // เลือกแถวที่นั่ง
    const screen = document.querySelector('.screen'); // เลือกจอภาพ
    if (seats && screen) {
        screen.style.width = `${seats.offsetWidth}px`; // ปรับขนาดจอให้เท่ากับความกว้างของแถวที่นั่ง
    }
}

// เรียกใช้ฟังก์ชันปรับขนาดจอเมื่อโหลดหน้าและเมื่อขนาดหน้าจอเปลี่ยน
window.addEventListener('load', adjustScreenSize); // เมื่อโหลดหน้า
window.addEventListener('resize', adjustScreenSize); // เมื่อขนาดหน้าจอเปลี่ยน