const countDownForm = document.getElementById('countDownForm');
const inputContainer = document.getElementById('input-container');
const dateEl = document.getElementById('date-picker');
const countDownEl = document.getElementById('countdown');

const countdownTitleEl = document.getElementById('countdown-title');
const countdownButtonEl = document.getElementById('countdown-button');
const timeElements = document.querySelectorAll('li span');

const completeEl = document.getElementById('complete');
const completeInfoEl = document.getElementById('complete-info');
const completeButtonEl = document.getElementById('complete-button');

let countDownTitle = '';
let countDownDate = '';
let countDownValue = Date;
let countDownActive;
let savedCountDown;

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

// Set min date for date input to today
const today = new Date().toISOString().split('T')[0];
dateEl.setAttribute('min', today);

function updateCountDown(e) {
    e.preventDefault();
    countDownTitle = e.srcElement[0].value;
    countDownDate = e.srcElement[1].value;

    if (countDownDate === '') {
        alert("Please select a date for your event");
    } else {
        savedCountDown = { title: countDownTitle, date: countDownDate };
        localStorage.setItem("countdown", JSON.stringify(savedCountDown));
        countDownValue = new Date(countDownDate).getTime();
        setUpTime();
    }
}

function setUpTime() {
    countDownActive = setInterval(() => {
        const now = new Date().getTime();
        const distance = countDownValue - now;
        
        const days = Math.floor(distance / day);
        const hours = Math.floor((distance % day) / hour);
        const minutes = Math.floor((distance % hour) / minute);
        const seconds = Math.floor((distance % minute) / second);

        inputContainer.hidden = true;

        if (distance < 0) {
            countDownEl.hidden = true;
            completeEl.hidden = false;
            completeInfoEl.textContent = `${countDownTitle} finished on ${countDownDate}`;
            clearInterval(countDownActive);
        } else {
            countdownTitleEl.textContent = `${countDownTitle}`;
            timeElements[0].textContent = days;
            timeElements[1].textContent = hours;
            timeElements[2].textContent = minutes;
            timeElements[3].textContent = seconds;
            completeEl.hidden = true;
            countDownEl.hidden = false;
        }
    }, second);
}

function reset() {
    localStorage.removeItem("countdown");
    countDownEl.hidden = true;
    completeEl.hidden = true;
    inputContainer.hidden = false;
    clearInterval(countDownActive);
    countDownTitle = '';
    countDownDate = '';
    document.getElementById('title').value = '';
    dateEl.value = '';
}

function restorePreviousCountDown() {
    if (localStorage.getItem("countdown")) {
        inputContainer.hidden = true;
        savedCountDown = JSON.parse(localStorage.getItem("countdown"));
        countDownTitle = savedCountDown.title;
        countDownDate = savedCountDown.date;
        countDownValue = new Date(countDownDate).getTime();
        setUpTime();
    }
}

// Event Listeners
countDownForm.addEventListener('submit', updateCountDown);
countdownButtonEl.addEventListener('click', reset);
completeButtonEl.addEventListener('click', reset);

// On Load
restorePreviousCountDown();