// const card=document.querySelector('.card'); // คอมเมนต์นี้ใช้เพื่อเลือกการ์ดจาก DOM
const showBtn = document.getElementById('show'); // เลือกปุ่มแสดงการ์ด
const hiddenBtn = document.getElementById('btn-hidden'); // เลือกปุ่มซ่อนการ์ด
const addContainer = document.getElementById('add-container'); // เลือก container สำหรับเพิ่มการ์ด
const cardContainer = document.getElementById('card-container'); // เลือก container สำหรับเก็บการ์ด
const nextBtn = document.getElementById('next'); // เลือกปุ่มถัดไป
const prevBtn = document.getElementById('prev'); // เลือกปุ่มก่อนหน้า
const currentEl = document.getElementById('current'); // เลือก element สำหรับแสดงคำถามปัจจุบัน
const clearBtn = document.getElementById('clear'); // เลือกปุ่มล้างข้อมูล
const questionEl = document.getElementById('question'); // เลือก input สำหรับคำถาม
const answerEl = document.getElementById('answer'); // เลือก input สำหรับคำตอบ
const addCardBtn = document.getElementById('add-card'); // เลือกปุ่มเพิ่มการ์ด

let currentActiveCard=0; // ตัวแปรเก็บดัชนีของการ์ดที่กำลังแสดงอยู่
let cardsEl=[]; // เก็บจำนวนการ์ดทั้งหมด
const cardData=getCardData(); // ดึงข้อมูลการ์ดจาก localStorage

function createCard() { // ฟังก์ชันสำหรับสร้างการ์ด
    cardData.forEach((data, index) => { // วนลูปผ่านข้อมูลการ์ด
        createSingleCard(data, index); // สร้างการ์ดแต่ละใบ
    });
}

function createSingleCard(data, index) { // ฟังก์ชันสำหรับสร้างการ์ดเดียว
    const card = document.createElement('div'); // สร้าง element div สำหรับการ์ด
    card.classList.add('card'); // เพิ่มคลาส 'card' ให้กับการ์ด

    if (index === 0) { // ถ้าการ์ดเป็นใบแรก
        card.classList.add('active'); // เพิ่มคลาส 'active' ให้กับการ์ด
    }
    card.innerHTML = ` // กำหนด HTML ภายในการ์ด
    <div class="inner-card">
        <div class="inner-card-front">
            <p>${data.question}</p> // แสดงคำถาม
            <i class="fas fa-sync-alt flip-icon"></i> // ไอคอนสำหรับพลิกการ์ด
            <i class="fa-solid fa-trash delete-btn"></i> // ไอคอนสำหรับลบการ์ด
        </div>
        <div class="inner-card-back">
            <p>${data.answer}</p> // แสดงคำตอบ
            <i class="fas fa-sync-alt flip-icon"></i> // ไอคอนสำหรับพลิกการ์ด
            <i class="fa-solid fa-trash delete-btn"></i> // ไอคอนสำหรับลบการ์ด
        </div>
    </div>
    `;
    card.addEventListener('click', () => card.classList.toggle("show-answer")); // เพิ่ม event listener สำหรับพลิกการ์ดเมื่อคลิก
    
    const deleteBtns = card.querySelectorAll('.delete-btn'); // เลือกปุ่มลบจากการ์ด
    deleteBtns.forEach(btn => { // วนลูปผ่านปุ่มลบ
        btn.addEventListener('click', (e) => { // เพิ่ม event listener สำหรับปุ่มลบ
            e.stopPropagation(); // หยุดการแพร่กระจายของ event เพื่อไม่ให้การ์ดพลิก
            deleteCard(index); // เรียกฟังก์ชันลบการ์ด
        });
    });
    
    cardsEl.push(card); // เพิ่มการ์ดลงในอาร์เรย์
    cardContainer.appendChild(card); // เพิ่มการ์ดลงใน container
    updateCurrentQuestion(); // อัปเดตคำถามปัจจุบัน
}

function deleteCard(index) { // ฟังก์ชันสำหรับลบการ์ด
    cardData.splice(index, 1); // ลบการ์ดจากข้อมูล
    setCardData(cardData); // อัปเดตข้อมูลการ์ดใน localStorage
    // Reload the page to reflect changes
    window.location.reload(); // โหลดหน้าใหม่เพื่อแสดงการเปลี่ยนแปลง
}

function updateCurrentQuestion(){ // ฟังก์ชันสำหรับอัปเดตคำถามปัจจุบัน
    currentEl.innerText = `${currentActiveCard+1} / ${cardsEl.length}`; // แสดงดัชนีของการ์ดปัจจุบัน
}

function updateCardPositions() { // ฟังก์ชันสำหรับอัปเดตตำแหน่งของการ์ด
    cardsEl.forEach((card, index) => { // วนลูปผ่านการ์ดทั้งหมด
        card.style.transform = `translateX(${100 * (index - currentActiveCard)}%) rotateY(0deg)`; // ปรับตำแหน่งการ์ด
        card.style.opacity = index === currentActiveCard ? '1' : '0'; // ปรับความโปร่งใสของการ์ด
        card.style.zIndex = index === currentActiveCard ? '10' : '0'; // ปรับ z-index ของการ์ด
    });
}

nextBtn.addEventListener('click', () => { // เพิ่ม event listener สำหรับปุ่มถัดไป
    if (currentActiveCard < cardsEl.length - 1) { // ถ้าการ์ดปัจจุบันไม่ใช่การ์ดสุดท้าย
        currentActiveCard++; // เพิ่มดัชนีการ์ดปัจจุบัน
        updateCardPositions(); // อัปเดตตำแหน่งการ์ด
        updateCurrentQuestion(); // อัปเดตคำถามปัจจุบัน
    }
});

prevBtn.addEventListener('click', () => { // เพิ่ม event listener สำหรับปุ่มก่อนหน้า
    if (currentActiveCard > 0) { // ถ้าการ์ดปัจจุบันไม่ใช่การ์ดแรก
        currentActiveCard--; // ลดดัชนีการ์ดปัจจุบัน
        updateCardPositions(); // อัปเดตตำแหน่งการ์ด
        updateCurrentQuestion(); // อัปเดตคำถามปัจจุบัน
    }
});

addCardBtn.addEventListener('click', () => { // เพิ่ม event listener สำหรับปุ่มเพิ่มการ์ด
    const question = questionEl.value; // ดึงค่าคำถามจาก input
    const answer = answerEl.value; // ดึงค่าคำตอบจาก input
    if (question.trim() && answer.trim()) { // ถ้าคำถามและคำตอบไม่ว่าง
        const newCard = { question, answer }; // สร้างการ์ดใหม่
        createSingleCard(newCard, cardsEl.length); // สร้างการ์ดใหม่ใน UI
        questionEl.value = ''; // เคลียร์ input คำถาม
        answerEl.value = ''; // เคลียร์ input คำตอบ
        addContainer.classList.remove('show'); // ซ่อน container สำหรับเพิ่มการ์ด
        cardData.push(newCard); // เพิ่มการ์ดใหม่ในข้อมูล
        setCardData(cardData); // อัปเดตข้อมูลการ์ดใน localStorage
        updateCardPositions(); // อัปเดตตำแหน่งการ์ด
        updateCurrentQuestion(); // อัปเดตคำถามปัจจุบัน
    }
});

function toggleAddContainer() { // ฟังก์ชันสำหรับสลับการแสดงผลของ container เพิ่มการ์ด
    addContainer.classList.toggle('show'); // สลับคลาส 'show' ของ container
}

// Event listeners for show and hide buttons
showBtn.addEventListener('click', toggleAddContainer); // เพิ่ม event listener สำหรับปุ่มแสดง
hiddenBtn.addEventListener('click', toggleAddContainer); // เพิ่ม event listener สำหรับปุ่มซ่อน

function setCardData(cards){ // ฟังก์ชันสำหรับตั้งค่าข้อมูลการ์ด
    localStorage.setItem('cards',JSON.stringify(cards)); // บันทึกข้อมูลการ์ดใน localStorage
    window.location.reload(); // โหลดหน้าใหม่เพื่อแสดงการเปลี่ยนแปลง
}

function getCardData(){ // ฟังก์ชันสำหรับดึงข้อมูลการ์ด
    const cards=JSON.parse(localStorage.getItem('cards')); // ดึงข้อมูลการ์ดจาก localStorage
    return cards === null ? [] : cards; // ถ้าไม่มีข้อมูลให้คืนค่าเป็นอาร์เรย์ว่าง
}

clearBtn.addEventListener('click',()=>{ // เพิ่ม event listener สำหรับปุ่มล้างข้อมูล
    localStorage.clear(); // ล้างข้อมูลใน localStorage
    cardContainer.innerHTML =''; // เคลียร์การ์ดใน container
    window.location.reload(); // โหลดหน้าใหม่เพื่อแสดงการเปลี่ยนแปลง
});

// Initialize card positions
updateCardPositions(); // เรียกฟังก์ชันเพื่อเริ่มต้นตำแหน่งการ์ด

// Call updateCardPositions initially and after any changes
createCard(); // สร้างการ์ดทั้งหมด
updateCardPositions(); // อัปเดตตำแหน่งการ์ด

// Update positions when window is resized
window.addEventListener('resize', updateCardPositions); // เพิ่ม event listener สำหรับการเปลี่ยนขนาดหน้าต่าง