const container = document.querySelector('.container');
const seatLayout = document.querySelector('.seat-layout');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

let moviePrice = +movieSelect.value;

// สร้างที่นั่ง
function createSeats() {
    const rows = 'ABCDEFGHIJKL';
    const seatsPerRow = 25;
    
    for (let i = rows.length - 1; i >= 0; i--) {
        const row = document.createElement('div');
        row.classList.add('row');
        
        // เพิ่มตัวอักษรแสดงแถว
        const rowLabel = document.createElement('div');
        rowLabel.classList.add('row-label');
        rowLabel.textContent = rows[i];
        row.appendChild(rowLabel);
        
        for (let j = 0; j < seatsPerRow; j++) {
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
            
            row.appendChild(seat);
        }
        
        // เพิ่มตัวอักษรแสดงแถวท้ายแถว
        const rowLabelEnd = document.createElement('div');
        rowLabelEnd.classList.add('row-label');
        rowLabelEnd.textContent = rows[i];
        row.appendChild(rowLabelEnd);
        
        seatLayout.appendChild(row);
    }
}

createSeats();

// อัพเดทการเลือกที่นั่ง
function updateSelectedCount() {
    const selectedSeats = document.querySelectorAll('.row .seat.selected');
    const selectedSeatsCount = selectedSeats.length;
    count.innerText = selectedSeatsCount;
    
    let totalPrice = 0;
    selectedSeats.forEach(seat => {
        totalPrice += seat.classList.contains('vip') ? moviePrice + 50 : moviePrice;
    });
    
    total.innerText = totalPrice;
    
    const seatsIndex = [...selectedSeats].map(seat => [...document.querySelectorAll('.row .seat')].indexOf(seat));
    localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));
}

// บันทึกข้อมูลภาพยนตร์
function setMovieData(movieIndex, moviePrice) {
    localStorage.setItem('selectedMovieIndex', movieIndex);
    localStorage.setItem('selectedMoviePrice', moviePrice);
}

// โหลดข้อมูลจาก localStorage
function populateUI() {
    const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));
    if (selectedSeats !== null && selectedSeats.length > 0) {
        document.querySelectorAll('.row .seat').forEach((seat, index) => {
            if (selectedSeats.indexOf(index) > -1) {
                seat.classList.add('selected');
            }
        });
    }

    const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
    if (selectedMovieIndex !== null) {
        movieSelect.selectedIndex = selectedMovieIndex;
    }
}

// Event Listeners
container.addEventListener('click', e => {
    if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
        e.target.classList.toggle('selected');
        updateSelectedCount();
    }
});

movieSelect.addEventListener('change', e => {
    moviePrice = +e.target.value;
    setMovieData(e.target.selectedIndex, e.target.value);
    updateSelectedCount();
});

// เริ่มต้นแอพพลิเคชัน
populateUI();
updateSelectedCount();

// ปรับขนาดจอให้เท่ากับที่นั่ง
function adjustScreenSize() {
    const seats = document.querySelector('.row');
    const screen = document.querySelector('.screen');
    if (seats && screen) {
        screen.style.width = `${seats.offsetWidth}px`;
    }
}

// เรียกใช้ฟังก์ชันปรับขนาดจอเมื่อโหลดหน้าและเมื่อขนาดหน้าจอเปลี่ยน
window.addEventListener('load', adjustScreenSize);
window.addEventListener('resize', adjustScreenSize);