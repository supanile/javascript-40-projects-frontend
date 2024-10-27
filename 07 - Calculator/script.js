// ส่วนที่ 1: การเลือก DOM elements
// เลือกองค์ประกอบ HTML ที่จำเป็นสำหรับ Music Player โดยใช้ document.getElementById
const musicContainer = document.getElementById('music-container'); // คอนเทนเนอร์หลักของ Music Player
const playBtn = document.getElementById('play');                   // ปุ่มเล่น/หยุดเพลง
const prevBtn = document.getElementById('prev');                   // ปุ่มเพลงก่อนหน้า
const nextBtn = document.getElementById('next');                   // ปุ่มเพลงถัดไป
const audio = document.getElementById('audio');                    // องค์ประกอบเสียง
const progress = document.getElementById('progress');              // แถบแสดงความคืบหน้าของเพลง
const progressContainer = document.getElementById('progress-container'); // คอนเทนเนอร์ของแถบความคืบหน้า
const title = document.getElementById('title');                    // ชื่อเพลงที่แสดง
const cover = document.getElementById('cover');                    // รูปปกของเพลง

// ส่วนที่ 2: ข้อมูลเพลง
// กำหนดรายการเพลงและตัวแปรสำหรับเก็บ index ของเพลงปัจจุบัน
const songs = ["Aimer 残響散歌", "Muzan Vs Hashira"]; // รายชื่อเพลงที่มีในระบบ
let songIndex = 0; // index ของเพลงปัจจุบัน เริ่มต้นที่ 0 (เพลงแรก)

// ส่วนที่ 3: ฟังก์ชันหลัก
// ฟังก์ชันโหลดเพลง: ใช้สำหรับโหลดข้อมูลเพลงใหม่
function loadSong(song) {
    title.innerText = song; // ตั้งชื่อเพลงที่แสดงบนหน้าเว็บ
    audio.src = `music/${song}.mp3`; // กำหนด source ของไฟล์เสียง
    cover.src = `cover/${song === "Aimer 残響散歌" ? "uzui" : "muzan"}.png`; // เลือกรูปปกตามชื่อเพลง
}

// ฟังก์ชันเล่นเพลง: เรียกเมื่อต้องการเล่นเพลง
function playSong() {
    musicContainer.classList.add('play'); // เพิ่ม class 'play' เพื่อแสดงสถานะกำลังเล่น
    playBtn.querySelector('i.fas').classList.remove('fa-play');
    playBtn.querySelector('i.fas').classList.add('fa-pause');
    audio.play(); // เริ่มเล่นเสียง
}

// ฟังก์ชันหยุดเพลง: เรียกเมื่อต้องการหยุดเพลง
function pauseSong() {
    musicContainer.classList.remove('play'); // ลบ class 'play' เพื่อแสดงสถานะหยุดเล่น
    playBtn.querySelector('i.fas').classList.remove('fa-pause');
    playBtn.querySelector('i.fas').classList.add('fa-play');
    audio.pause(); // หยุดเสียง
}

// ฟังก์ชันเล่นเพลงก่อนหน้า: เรียกเมื่อกดปุ่มเพลงก่อนหน้า
function prevSong() {
    songIndex--; // ลด index เพลง
    if (songIndex < 0) {
        songIndex = songs.length - 1; // วนกลับไปเพลงสุดท้ายถ้าอยู่ที่เพลงแรก
    }
    loadSong(songs[songIndex]);
    playSong();
}

// ฟังก์ชันเล่นเพลงถัดไป: เรียกเมื่อกดปุ่มเพลงถัดไปหรือเมื่อเพลงปัจจุบันจบ
function nextSong() {
    songIndex++; // เพิ่ม index เพลง
    if (songIndex > songs.length - 1) {
        songIndex = 0; // วนกลับไปเพลงแรกถ้าอยู่ที่เพลงสุดท้าย
    }
    loadSong(songs[songIndex]);
    playSong();
}

// ฟังก์ชันอัพเดทแถบความคืบหน้า: เรียกทุกครั้งที่เวลาของเพลงเปลี่ยนแปลง
function updateProgress(e) {
    const { duration, currentTime } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`; // ปรับความกว้างของแถบความคืบหน้า
}

// ฟังก์ชันตั้งค่าความคืบหน้าเมื่อคลิกที่แถบ: เรียกเมื่อผู้ใช้คลิกที่แถบความคืบหน้า
function setProgress(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;
    audio.currentTime = (clickX / width) * duration; // ตั้งเวลาเพลงตามตำแหน่งที่คลิก
}

// ส่วนที่ 4: Event listeners
// กำหนด event listeners สำหรับการควบคุมการเล่นเพลง
playBtn.addEventListener('click', () => {
    const isPlaying = musicContainer.classList.contains('play');
    if (isPlaying) {
        pauseSong(); // ถ้ากำลังเล่นอยู่ ให้หยุดเพลง
    } else {
        playSong(); // ถ้าไม่ได้เล่นอยู่ ให้เริ่มเล่นเพลง
    }
});

prevBtn.addEventListener('click', prevSong); // เมื่อคลิกปุ่มก่อนหน้า
nextBtn.addEventListener('click', nextSong); // เมื่อคลิกปุ่มถัดไป
audio.addEventListener('timeupdate', updateProgress); // อัพเดทแถบความคืบหน้าเมื่อเวลาเพลงเปลี่ยน
progressContainer.addEventListener('click', setProgress); // ตั้งค่าความคืบหน้าเมื่อคลิกที่แถบ
audio.addEventListener('ended', nextSong); // เล่นเพลงถัดไปเมื่อเพลงปัจจุบันจบ

// ส่วนที่ 5: การเริ่มต้น
// โหลดเพลงแรกในรายการเมื่อเริ่มต้นหน้าเว็บ
loadSong(songs[songIndex]);