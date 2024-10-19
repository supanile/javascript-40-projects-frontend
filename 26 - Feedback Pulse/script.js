const ratingContainer = document.querySelector('.ratings-container');
const ratings = document.querySelectorAll('.rating');
const panel = document.getElementById('panel');
const sendBtn = document.getElementById('send');

let selected = null;

ratingContainer.addEventListener('click', (e) => {
    const ratingElement = e.target.closest('.rating');
    if (ratingElement) {
        removeActive();
        ratingElement.classList.add('active');
        selected = ratingElement.querySelector('.rating-text').textContent;
    }
});

function removeActive() {
    ratings.forEach(rating => rating.classList.remove('active'));
}

sendBtn.addEventListener('click', () => {
    if (!selected) {
        // แสดง alert ถ้ายังไม่ได้เลือกคะแนน
        alert('กรุณาเลือกระดับความพึงพอใจ');
        return;
    }

    panel.innerHTML = `
        <div class="completion-message">
            <div class="completion-icon">❤️</div>
            <h2 class="title">ขอบคุณที่ใช้บริการของเรา</h2>
            <p class="subtitle">ผลการประเมิน: ${selected}</p>
        </div>
    `;
});

// Add hover effect sound
ratings.forEach(rating => {
    rating.addEventListener('mouseenter', () => {
        if ('vibrate' in navigator) {
            navigator.vibrate(50); // สั่นเบาๆ เมื่อ hover
        }
    });
});