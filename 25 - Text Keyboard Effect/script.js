// DOM Elements
const textEl = document.getElementById('text');
const speedEl = document.getElementById('speed');
const speedValueEl = document.getElementById('speed-value');

// Configuration
const text = "Welcome To My Home Page";
let charIndex = 1;
let speed = 300 / speedEl.value;

// Main animation function
function writeText() {
    textEl.innerText = text.slice(0, charIndex);
    charIndex++;
    
    if (charIndex > text.length) {
        charIndex = 1;
    }
    
    setTimeout(writeText, speed);
}

// Speed control event listener
speedEl.addEventListener('input', (e) => {
    speed = 300 / e.target.value;
    speedValueEl.textContent = `${e.target.value}x`;
});

// Start animation
writeText();