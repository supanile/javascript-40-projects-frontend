const countdown = document.getElementById('countdown');
const days = document.getElementById('days');
const hours = document.getElementById('hours');
const minutes = document.getElementById('minutes');
const seconds = document.getElementById('seconds');
const newYearElement = document.getElementById('new-year');

const currentYear = new Date().getFullYear();
const newYearTime = new Date(`January 01 ${currentYear + 1} 00:00:00`);

newYearElement.innerText = currentYear + 1;

function updateCountdown() {
    const currentTime = new Date();
    const diff = newYearTime - currentTime;

    const d = Math.floor(diff / 1000 / 60 / 60 / 24);
    const h = Math.floor(diff / 1000 / 60 / 60) % 24;
    const m = Math.floor(diff / 1000 / 60) % 60;
    const s = Math.floor(diff / 1000) % 60;

    days.innerHTML = d < 10 ? '0' + d : d;
    hours.innerHTML = h < 10 ? '0' + h : h;
    minutes.innerHTML = m < 10 ? '0' + m : m;
    seconds.innerHTML = s < 10 ? '0' + s : s;

    if (diff < 0) {
        clearInterval(interval);
        countdown.innerHTML = '<h2>สวัสดีปีใหม่!</h2>';
    }
}

const interval = setInterval(updateCountdown, 1000);

// เปลี่ยนสีพื้นหลัง
function changeBackgroundGradient() {
    const hue = Math.floor(Math.random() * 360);
    document.body.style.backgroundColor = `hsl(${hue}, 50%, 50%)`;
}

setInterval(changeBackgroundGradient, 1000); // เปลี่ยนสีทุก 10 วินาที