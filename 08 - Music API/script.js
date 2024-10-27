// เลือก DOM elements ที่จำเป็นสำหรับ Music Player
const musicContainer = document.getElementById('music-container');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');
const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const cover = document.getElementById('cover');

// รายการเพลงและ index เพลงปัจจุบัน
const songs = ["Aimer 残響散歌", "Muzan Vs Hashira"];
let songIndex = 0;

// ฟังก์ชันโหลดเพลง
function loadSong(song) {
    title.innerText = song; // ตั้งชื่อเพลง
    audio.src = `music/${song}.mp3`; // ตั้ง source ของไฟล์เสียง
    cover.src = `cover/${song === "Aimer 残響散歌" ? "uzui" : "muzan"}.png`; // เลือกรูปปกตามชื่อเพลง
}

// ฟังก์ชันเล่นเพลง
function playSong() {
    musicContainer.classList.add('play'); // เพิ่ม class 'play' เพื่อแสดงว่ากำลังเล่น
    playBtn.querySelector('i.fas').classList.remove('fa-play');
    playBtn.querySelector('i.fas').classList.add('fa-pause');
    audio.play(); // เริ่มเล่นเสียง
}

// ฟังก์ชันหยุดเพลง
function pauseSong() {
    musicContainer.classList.remove('play'); // ลบ class 'play'
    playBtn.querySelector('i.fas').classList.remove('fa-pause');
    playBtn.querySelector('i.fas').classList.add('fa-play');
    audio.pause(); // หยุดเสียง
}

// ฟังก์ชันเล่นเพลงก่อนหน้า
function prevSong() {
    songIndex--; // ลด index เพลง
    if (songIndex < 0) {
        songIndex = songs.length - 1; // วนกลับไปเพลงสุดท้ายถ้าอยู่ที่เพลงแรก
    }
    loadSong(songs[songIndex]);
    playSong();
}

// ฟังก์ชันเล่นเพลงถัดไป
function nextSong() {
    songIndex++; // เพิ่ม index เพลง
    if (songIndex > songs.length - 1) {
        songIndex = 0; // วนกลับไปเพลงแรกถ้าอยู่ที่เพลงสุดท้าย
    }
    loadSong(songs[songIndex]);
    playSong();
}

// ฟังก์ชันอัพเดทแถบความคืบหน้า
function updateProgress(e) {
    const { duration, currentTime } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`; // ปรับความกว้างของแถบความคืบหน้า
}

// ฟังก์ชันตั้งค่าความคืบหน้าเมื่อคลิกที่แถบ
function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration; // ตั้งเวลาเพลงตามตำแหน่งที่คลิก
}

// Event listeners
playBtn.addEventListener('click', () => {
    const isPlaying = musicContainer.classList.contains('play');
    if (isPlaying) {
        pauseSong();
    } else {
        playSong();
    }
});

prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
audio.addEventListener('timeupdate', updateProgress);
progressContainer.addEventListener('click', setProgress);
audio.addEventListener('ended', nextSong);

// เริ่มต้นโหลดเพลงแรก
loadSong(songs[songIndex]);