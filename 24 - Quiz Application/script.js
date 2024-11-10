// ข้อมูลคำถามและคำตอบในแบบทดสอบ
const questionData = [
    {
        question: "1. ข้อใดไม่ใช่ระบบปฏิบัติการ", // คำถาม
        choices: [ // ตัวเลือกคำตอบ
            "ระบบปฏิบัติการดอส",
            "ไมโครซอฟท์เวิร์ด",
            "ไมโครซอฟต์วินโดวส์",
            "ระบบปฏิบัติการแอนดรอยด์"
        ],
        correct: 1 // ดัชนีของคำตอบที่ถูกต้อง
    },
    {
        question: "2. ข้อใดคือโปรแกรม Web Browser",
        choices: [
            "Google Chrome",
            "Keyboard",
            "Mouse",
            "Monitor"
        ],
        correct: 0
    },
    {
        question: "3. ข้อใดคือฮาร์ดแวร์",
        choices: [
            "Keyboard",
            "Mouse",
            "Monitor",
            "ถูกทุกข้อ"
        ],
        correct: 3
    },
    {
        question: "4. ข้อใดเป็นซอฟต์แวร์ประยุกต์ (Application Software)",
        choices: [
            "Microsoft Windows",
            "Adobe Photoshop",
            "BIOS",
            "Device Driver"
        ],
        correct: 1
    },
    {
        question: "5. อุปกรณ์ใดทำหน้าที่ประมวลผลข้อมูลในคอมพิวเตอร์",
        choices: [
            "RAM",
            "Hard Disk",
            "CPU",
            "GPU"
        ],
        correct: 2
    },
    {
        question: "6. ข้อใดไม่ใช่หน่วยความจำสำรอง (Secondary Storage)",
        choices: [
            "Hard Disk Drive",
            "Solid State Drive",
            "USB Flash Drive",
            "Random Access Memory (RAM)"
        ],
        correct: 3
    },
    {
        question: "7. โปรแกรมใดใช้สำหรับการนำเสนองาน",
        choices: [
            "Microsoft Word",
            "Microsoft Excel",
            "Microsoft PowerPoint",
            "Microsoft Outlook"
        ],
        correct: 2
    },
    {
        question: "8. ระบบปฏิบัติการใดเป็น Open Source",
        choices: [
            "Windows",
            "macOS",
            "Linux",
            "iOS"
        ],
        correct: 2
    },
    {
        question: "9. อุปกรณ์ใดใช้สำหรับแสดงผลข้อมูลจากคอมพิวเตอร์",
        choices: [
            "Printer",
            "Scanner",
            "Monitor",
            "Microphone"
        ],
        correct: 2
    },
    {
        question: "10. โปรแกรมใดใช้สำหรับป้องกันไวรัสคอมพิวเตอร์",
        choices: [
            "Adobe Reader",
            "VLC Media Player",
            "Norton Antivirus",
            "WinZip"
        ],
        correct: 2
    }
];

// ประกาศตัวแปรสำหรับเก็บองค์ประกอบต่าง ๆ ใน HTML
let quizContainer, resultsContainer, submitButton, restartButton, progressBar;
let choiceButtons = []; // ตัวแปรสำหรับเก็บปุ่มตัวเลือก
let currentQuestion = 0; // ตัวแปรสำหรับเก็บหมายเลขคำถามปัจจุบัน
let score = 0; // ตัวแปรสำหรับเก็บคะแนน
let userAnswers = []; // ตัวแปรสำหรับเก็บคำตอบของผู้ใช้

// ฟังก์ชันสำหรับเริ่มต้น Quiz
function initializeQuiz() {
    quizContainer = document.getElementById('quiz'); // ดึงองค์ประกอบ quiz จาก HTML
    resultsContainer = document.getElementById('results'); // ดึงองค์ประกอบผลลัพธ์จาก HTML
    submitButton = document.querySelector('#submit'); // ดึงปุ่มส่งคำตอบ
    restartButton = document.querySelector('#restart'); // ดึงปุ่มเริ่มใหม่
    progressBar = document.querySelector('.progress-bar'); // ดึงแถบความคืบหน้า
    
    userAnswers = new Array(questionData.length).fill(null); // กำหนดค่าเริ่มต้นให้กับคำตอบของผู้ใช้
    
    createQuizStructure(); // สร้างโครงสร้าง HTML สำหรับ Quiz
    addEventListeners(); // เพิ่ม Event Listeners ให้กับปุ่มต่าง ๆ
    loadQuestion(); // โหลดคำถามแรก
    updateSubmitButtonVisibility(); // อัพเดตการแสดงปุ่มส่งคำตอบ
}

// สร้างโครงสร้าง HTML
function createQuizStructure() {
    quizContainer.innerHTML = ` // กำหนด HTML ภายใน quizContainer
        <div class="question-counter">ข้อที่ ${currentQuestion + 1} จาก ${questionData.length}</div> // แสดงหมายเลขคำถาม
        <h2 id="question"></h2> // แสดงคำถาม
        <div class="choices"> // กลุ่มปุ่มตัวเลือก
            <button class="choice"></button> // ปุ่มตัวเลือกที่ 1
            <button class="choice"></button> // ปุ่มตัวเลือกที่ 2
            <button class="choice"></button> // ปุ่มตัวเลือกที่ 3
            <button class="choice"></button> // ปุ่มตัวเลือกที่ 4
        </div>
        <div class="navigation-buttons"> // กลุ่มปุ่มนำทาง
            <button id="prevQuestion" disabled>ข้อก่อนหน้า</button> // ปุ่มย้อนกลับ
            <button id="nextQuestion">ข้อถัดไป</button> // ปุ่มถัดไป
        </div>
    `;
    
    choiceButtons = document.querySelectorAll('.choice'); // ดึงปุ่มตัวเลือกทั้งหมด
}

// เพิ่ม Event Listeners
function addEventListeners() {
    choiceButtons.forEach(button => { // สำหรับแต่ละปุ่มตัวเลือก
        button.addEventListener('click', selectChoice); // เพิ่ม Event Listener สำหรับการเลือกคำตอบ
    });
    
    document.getElementById('prevQuestion').addEventListener('click', () => { // สำหรับปุ่มย้อนกลับ
        if (currentQuestion > 0) { // ตรวจสอบว่ามีคำถามก่อนหน้า
            currentQuestion--; // ลดหมายเลขคำถาม
            loadQuestion(); // โหลดคำถามใหม่
        }
    });
    
    document.getElementById('nextQuestion').addEventListener('click', () => { // สำหรับปุ่มถัดไป
        if (currentQuestion < questionData.length - 1) { // ตรวจสอบว่ามีคำถามถัดไป
            currentQuestion++; // เพิ่มหมายเลขคำถาม
            loadQuestion(); // โหลดคำถามใหม่
        }
    });
    
    submitButton.addEventListener('click', showResults); // เพิ่ม Event Listener สำหรับปุ่มส่งคำตอบ
    restartButton.addEventListener('click', restartQuiz); // เพิ่ม Event Listener สำหรับปุ่มเริ่มใหม่
}

// อัพเดตการแสดงปุ่มส่งคำตอบ
function updateSubmitButtonVisibility() {
    const allQuestionsAnswered = userAnswers.every(answer => answer !== null); // ตรวจสอบว่าผู้ใช้ตอบคำถามครบทุกข้อ
    submitButton.style.display = allQuestionsAnswered ? 'block' : 'none'; // แสดงหรือซ่อนปุ่มส่งคำตอบ
}

// โหลดคำถาม
function loadQuestion() {
    const question = questionData[currentQuestion]; // ดึงคำถามปัจจุบัน
    document.querySelector('.question-counter').textContent = `ข้อที่ ${currentQuestion + 1} จาก ${questionData.length}`; // อัพเดตหมายเลขคำถาม
    document.getElementById('question').textContent = question.question; // แสดงคำถาม
    
    choiceButtons.forEach((button, index) => { // สำหรับแต่ละปุ่มตัวเลือก
        button.textContent = question.choices[index]; // กำหนดข้อความในปุ่ม
        button.classList.remove('selected'); // ลบคลาส selected
        if (userAnswers[currentQuestion] === index) { // ตรวจสอบว่าผู้ใช้เลือกคำตอบนี้หรือไม่
            button.classList.add('selected'); // เพิ่มคลาส selected
        }
    });
    
    updateProgressBar(); // อัพเดตแถบความคืบหน้า
    updateNavigationButtons(); // อัพเดตปุ่มนำทาง
}

// อัพเดตแถบความคืบหน้า
function updateProgressBar() {
    const answeredQuestions = userAnswers.filter(answer => answer !== null).length; // นับจำนวนคำถามที่ตอบแล้ว
    const progress = (answeredQuestions / questionData.length) * 100; // คำนวณเปอร์เซ็นต์ความคืบหน้า
    progressBar.style.width = `${progress}%`; // กำหนดความกว้างของแถบความคืบหน้า
}

// อัพเดตปุ่มนำทาง
function updateNavigationButtons() {
    const prevButton = document.getElementById('prevQuestion'); // ดึงปุ่มย้อนกลับ
    const nextButton = document.getElementById('nextQuestion'); // ดึงปุ่มถัดไป
    
    prevButton.disabled = currentQuestion === 0; // ปิดการใช้งานปุ่มย้อนกลับถ้าอยู่ที่คำถามแรก
    nextButton.disabled = currentQuestion === questionData.length - 1; // ปิดการใช้งานปุ่มถัดไปถ้าอยู่ที่คำถามสุดท้าย
}

// เลือกคำตอบ
function selectChoice(e) {
    const selectedButton = e.target; // ดึงปุ่มที่ถูกเลือก
    const selectedIndex = Array.from(choiceButtons).indexOf(selectedButton); // หาดัชนีของปุ่มที่ถูกเลือก
    
    choiceButtons.forEach(btn => btn.classList.remove('selected')); // ลบคลาส selected จากปุ่มทั้งหมด
    selectedButton.classList.add('selected'); // เพิ่มคลาส selected ให้กับปุ่มที่ถูกเลือก
    userAnswers[currentQuestion] = selectedIndex; // บันทึกคำตอบของผู้ใช้
    
    updateProgressBar(); // อัพเดตแถบความคืบหน้า
    updateSubmitButtonVisibility(); // อัพเดตการแสดงปุ่มส่งคำตอบ
}

// แสดงผลลัพธ์
function showResults() {
    if (!userAnswers.every(answer => answer !== null)) { // ตรวจสอบว่าผู้ใช้ตอบคำถามครบทุกข้อ
        alert('กรุณาตอบคำถามให้ครบทุกข้อก่อนส่งคำตอบ'); // แจ้งเตือนถ้ายังไม่ตอบครบ
        return; // ออกจากฟังก์ชัน
    }

    let numCorrect = 0; // ตัวแปรสำหรับนับจำนวนคำตอบที่ถูกต้อง
    const allQuestions = []; // ตัวแปรสำหรับเก็บข้อมูลคำถามทั้งหมด
    
    userAnswers.forEach((answer, index) => { // สำหรับคำตอบของผู้ใช้แต่ละข้อ
        const isCorrect = answer === questionData[index].correct; // ตรวจสอบว่าคำตอบถูกต้องหรือไม่
        if (isCorrect) {
            numCorrect++; // เพิ่มจำนวนคำตอบที่ถูกต้อง
        }
        
        allQuestions.push({ // เก็บข้อมูลคำถามและคำตอบ
            questionNumber: index + 1, // หมายเลขคำถาม
            question: questionData[index].question, // คำถาม
            yourAnswer: questionData[index].choices[answer], // คำตอบของผู้ใช้
            correctAnswer: questionData[index].choices[questionData[index].correct], // คำตอบที่ถูกต้อง
            isCorrect: isCorrect // สถานะว่าคำตอบถูกต้องหรือไม่
        });
    });
    
    const percentage = (numCorrect / questionData.length) * 100; // คำนวณเปอร์เซ็นต์คะแนน
    let grade = ''; // ตัวแปรสำหรับเก็บระดับคะแนน
    
    // กำหนดระดับคะแนนตามเปอร์เซ็นต์
    if (percentage >= 80) grade = 'ดีเยี่ยม';
    else if (percentage >= 70) grade = 'ดี';
    else if (percentage >= 60) grade = 'ปานกลาง';
    else grade = 'ควรปรับปรุง';
    
    let resultHTML = ` // สร้าง HTML สำหรับแสดงผลลัพธ์
        <h2>ผลการทดสอบของคุณ</h2>
        <div class="score-summary">
            <p>คะแนนที่ได้: ${numCorrect} จาก ${questionData.length} คะแนน (${percentage.toFixed(1)}%)</p>
            <p>ระดับผลการเรียน: <span class="grade ${grade}">${grade}</span></p>
        </div>
        <h3>สรุปคำตอบ:</h3>
    `;
    
    allQuestions.forEach(q => { // สำหรับคำถามทั้งหมด
        resultHTML += ` // สร้าง HTML สำหรับแสดงผลคำตอบ
            <div class="review-item ${q.isCorrect ? 'correct' : 'wrong'}">
                <h3>${q.question}</h3>
                <div class="result-detail">
                    <p>คำตอบของคุณ: <span class="${q.isCorrect ? 'text-success' : 'text-danger'}">${q.yourAnswer}</span></p>
                    ${!q.isCorrect ? `<p>คำตอบที่ถูกต้อง: <span class="text-success">${q.correctAnswer}</span></p>` : ''}
                </div>
            </div>
        `;
    });
    
    resultsContainer.innerHTML = resultHTML; // แสดงผลลัพธ์ใน resultsContainer
    resultsContainer.classList.remove('hide'); // แสดงผลลัพธ์
    quizContainer.classList.add('hide'); // ซ่อน quizContainer
    submitButton.classList.add('hide'); // ซ่อนปุ่มส่งคำตอบ
    restartButton.classList.remove('hide'); // แสดงปุ่มเริ่มใหม่
}

// เริ่มต้นแบบทดสอบใหม่
function restartQuiz() {
    currentQuestion = 0; // รีเซ็ตหมายเลขคำถาม
    score = 0; // รีเซ็ตคะแนน
    userAnswers = new Array(questionData.length).fill(null); // รีเซ็ตคำตอบของผู้ใช้
    
    createQuizStructure(); // สร้างโครงสร้าง HTML ใหม่
    addEventListeners(); // เพิ่ม Event Listeners ใหม่
    
    quizContainer.classList.remove('hide'); // แสดง quizContainer
    resultsContainer.classList.add('hide'); // ซ่อนผลลัพธ์
    submitButton.classList.add('hide'); // ซ่อนปุ่มส่งคำตอบ
    restartButton.classList.add('hide'); // ซ่อนปุ่มเริ่มใหม่
    
    loadQuestion(); // โหลดคำถามแรก
    updateSubmitButtonVisibility(); // อัพเดตการแสดงปุ่มส่งคำตอบ
}

// เริ่มต้นแบบทดสอบเมื่อโหลดหน้าเว็บ
document.addEventListener('DOMContentLoaded', initializeQuiz); // เพิ่ม Event Listener สำหรับโหลดหน้าเว็บ