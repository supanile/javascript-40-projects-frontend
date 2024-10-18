const questionData = [
    {
        question: "1. ข้อใดไม่ใช่ระบบปฏิบัติการ",
        choices: [
            "ระบบปฏิบัติการดอส",
            "ไมโครซอฟท์เวิร์ด",
            "ไมโครซอฟต์วินโดวส์",
            "ระบบปฏิบัติการแอนดรอยด์"
        ],
        correct: 1
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

let quizContainer, resultsContainer, submitButton, restartButton, progressBar;
let choiceButtons = [];
let currentQuestion = 0;
let score = 0;
let userAnswers = [];

// ฟังก์ชันสำหรับเริ่มต้น Quiz
function initializeQuiz() {
    quizContainer = document.getElementById('quiz');
    resultsContainer = document.getElementById('results');
    submitButton = document.querySelector('#submit');
    restartButton = document.querySelector('#restart');
    progressBar = document.querySelector('.progress-bar');
    
    userAnswers = new Array(questionData.length).fill(null);
    
    createQuizStructure();
    addEventListeners();
    loadQuestion();
    updateSubmitButtonVisibility();
}

// สร้างโครงสร้าง HTML
function createQuizStructure() {
    quizContainer.innerHTML = `
        <div class="question-counter">ข้อที่ ${currentQuestion + 1} จาก ${questionData.length}</div>
        <h2 id="question"></h2>
        <div class="choices">
            <button class="choice"></button>
            <button class="choice"></button>
            <button class="choice"></button>
            <button class="choice"></button>
        </div>
        <div class="navigation-buttons">
            <button id="prevQuestion" disabled>ข้อก่อนหน้า</button>
            <button id="nextQuestion">ข้อถัดไป</button>
        </div>
    `;
    
    choiceButtons = document.querySelectorAll('.choice');
}

// เพิ่ม Event Listeners
function addEventListeners() {
    choiceButtons.forEach(button => {
        button.addEventListener('click', selectChoice);
    });
    
    document.getElementById('prevQuestion').addEventListener('click', () => {
        if (currentQuestion > 0) {
            currentQuestion--;
            loadQuestion();
        }
    });
    
    document.getElementById('nextQuestion').addEventListener('click', () => {
        if (currentQuestion < questionData.length - 1) {
            currentQuestion++;
            loadQuestion();
        }
    });
    
    submitButton.addEventListener('click', showResults);
    restartButton.addEventListener('click', restartQuiz);
}

// อัพเดตการแสดงปุ่มส่งคำตอบ
function updateSubmitButtonVisibility() {
    const allQuestionsAnswered = userAnswers.every(answer => answer !== null);
    submitButton.style.display = allQuestionsAnswered ? 'block' : 'none';
}

// โหลดคำถาม
function loadQuestion() {
    const question = questionData[currentQuestion];
    document.querySelector('.question-counter').textContent = `ข้อที่ ${currentQuestion + 1} จาก ${questionData.length}`;
    document.getElementById('question').textContent = question.question;
    
    choiceButtons.forEach((button, index) => {
        button.textContent = question.choices[index];
        button.classList.remove('selected');
        if (userAnswers[currentQuestion] === index) {
            button.classList.add('selected');
        }
    });
    
    updateProgressBar();
    updateNavigationButtons();
}

// อัพเดตแถบความคืบหน้า
function updateProgressBar() {
    const answeredQuestions = userAnswers.filter(answer => answer !== null).length;
    const progress = (answeredQuestions / questionData.length) * 100;
    progressBar.style.width = `${progress}%`;
}

// อัพเดตปุ่มนำทาง
function updateNavigationButtons() {
    const prevButton = document.getElementById('prevQuestion');
    const nextButton = document.getElementById('nextQuestion');
    
    prevButton.disabled = currentQuestion === 0;
    nextButton.disabled = currentQuestion === questionData.length - 1;
}

// เลือกคำตอบ
function selectChoice(e) {
    const selectedButton = e.target;
    const selectedIndex = Array.from(choiceButtons).indexOf(selectedButton);
    
    choiceButtons.forEach(btn => btn.classList.remove('selected'));
    selectedButton.classList.add('selected');
    userAnswers[currentQuestion] = selectedIndex;
    
    updateProgressBar();
    updateSubmitButtonVisibility();
}

// แสดงผลลัพธ์
function showResults() {
    if (!userAnswers.every(answer => answer !== null)) {
        alert('กรุณาตอบคำถามให้ครบทุกข้อก่อนส่งคำตอบ');
        return;
    }

    let numCorrect = 0;
    const allQuestions = [];
    
    userAnswers.forEach((answer, index) => {
        const isCorrect = answer === questionData[index].correct;
        if (isCorrect) {
            numCorrect++;
        }
        
        allQuestions.push({
            questionNumber: index + 1,
            question: questionData[index].question,
            yourAnswer: questionData[index].choices[answer],
            correctAnswer: questionData[index].choices[questionData[index].correct],
            isCorrect: isCorrect
        });
    });
    
    const percentage = (numCorrect / questionData.length) * 100;
    let grade = '';
    
    if (percentage >= 80) grade = 'ดีเยี่ยม';
    else if (percentage >= 70) grade = 'ดี';
    else if (percentage >= 60) grade = 'ปานกลาง';
    else grade = 'ควรปรับปรุง';
    
    let resultHTML = `
        <h2>ผลการทดสอบของคุณ</h2>
        <div class="score-summary">
            <p>คะแนนที่ได้: ${numCorrect} จาก ${questionData.length} คะแนน (${percentage.toFixed(1)}%)</p>
            <p>ระดับผลการเรียน: <span class="grade ${grade}">${grade}</span></p>
        </div>
        <h3>สรุปคำตอบ:</h3>
    `;
    
    allQuestions.forEach(q => {
        resultHTML += `
            <div class="review-item ${q.isCorrect ? 'correct' : 'wrong'}">
                <h3>${q.question}</h3>
                <div class="result-detail">
                    <p>คำตอบของคุณ: <span class="${q.isCorrect ? 'text-success' : 'text-danger'}">${q.yourAnswer}</span></p>
                    ${!q.isCorrect ? `<p>คำตอบที่ถูกต้อง: <span class="text-success">${q.correctAnswer}</span></p>` : ''}
                </div>
            </div>
        `;
    });
    
    resultsContainer.innerHTML = resultHTML;
    resultsContainer.classList.remove('hide');
    quizContainer.classList.add('hide');
    submitButton.classList.add('hide');
    restartButton.classList.remove('hide');
}

// เริ่มต้นแบบทดสอบใหม่
function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    userAnswers = new Array(questionData.length).fill(null);
    
    createQuizStructure();
    addEventListeners();
    
    quizContainer.classList.remove('hide');
    resultsContainer.classList.add('hide');
    submitButton.classList.add('hide');
    restartButton.classList.add('hide');
    
    loadQuestion();
    updateSubmitButtonVisibility();
}

// เริ่มต้นแบบทดสอบเมื่อโหลดหน้าเว็บ
document.addEventListener('DOMContentLoaded', initializeQuiz);