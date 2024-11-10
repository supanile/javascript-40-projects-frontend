// กำหนด apiKey สำหรับการเข้าถึง API ของ TMDB
const apiKey = "6bf2e023c8345d10623e24d02a4b8001";
// ดึง element ที่มี id เป็น 'content' จาก HTML
const content = document.getElementById('content');
// กำหนด URL สำหรับการดึงภาพโปสเตอร์
const urlPoster = "https://image.tmdb.org/t/p/w500/";
// ดึง element ที่มี id เป็น 'years' จาก HTML
const dropdown = document.getElementById('years');

// ฟังก์ชันสำหรับดึงข้อมูลภาพยนตร์จาก API ตามปีที่กำหนด
async function fetchMovies(year) {
    // สร้าง URL สำหรับการเรียก API โดยใช้ปีที่กำหนด
    const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&page=1&year=${year}`;
    try {
        // เรียก API และรอผลลัพธ์
        const response = await fetch(url);
        // ตรวจสอบว่าการตอบกลับจาก API ถูกต้องหรือไม่
        if (!response.ok) throw new Error('Network response was not ok');
        // แปลงผลลัพธ์เป็น JSON และส่งกลับ
        return await response.json();
    } catch (error) {
        // แสดงข้อผิดพลาดใน console หากเกิดข้อผิดพลาด
        console.error("Error fetching movies:", error);
        // ส่งกลับผลลัพธ์เป็นอาร์เรย์ว่าง
        return { results: [] };
    }
}

// ฟังก์ชันสำหรับสร้าง element ของภาพยนตร์
function createMovieElement(movie) {
    // สร้าง div สำหรับภาพยนตร์
    const movieEl = document.createElement('div');
    // เพิ่ม class 'movie' ให้กับ div
    movieEl.classList.add('movie');
    
    // สร้าง element img สำหรับโปสเตอร์ภาพยนตร์
    const img = document.createElement('img');
    // กำหนด src ของภาพโปสเตอร์
    img.src = movie.poster_path ? `${urlPoster}${movie.poster_path}` : 'placeholder.jpg';
    // กำหนด alt text สำหรับภาพ
    img.alt = movie.title;
    
    // สร้าง element h2 สำหรับชื่อภาพยนตร์
    const title = document.createElement('h2');
    // กำหนดข้อความใน h2 โดยตัดชื่อภาพยนตร์ถ้ายาวเกิน 24 ตัวอักษร
    title.textContent = movie.title.length > 24 ? `${movie.title.substring(0, 21)}...` : movie.title;
    
    // เพิ่ม img และ title เข้าไปใน movieEl
    movieEl.appendChild(img);
    movieEl.appendChild(title);
    // ส่งกลับ movieEl
    return movieEl;
}

// ฟังก์ชันสำหรับแสดงภาพยนตร์ตามปีที่กำหนด
async function displayMovies(year) {
    // แสดงข้อความ 'Loading...' ขณะรอข้อมูล
    content.innerHTML = '<p>Loading...</p>';
    // ดึงข้อมูลภาพยนตร์จาก API
    const movies = await fetchMovies(year);
    // เคลียร์เนื้อหาของ content
    content.innerHTML = '';
    
    // ตรวจสอบว่ามีภาพยนตร์หรือไม่
    if (movies.results.length === 0) {
        // แสดงข้อความหากไม่พบภาพยนตร์
        content.innerHTML = '<p>No movies found for this year.</p>';
        return;
    }
    
    // วนลูปผ่านภาพยนตร์และสร้าง element สำหรับแต่ละภาพยนตร์
    movies.results.forEach(movie => {
        const movieEl = createMovieElement(movie);
        // เพิ่ม movieEl เข้าไปใน content
        content.appendChild(movieEl);
    });
}

// เพิ่ม event listener ให้กับ dropdown เมื่อมีการเปลี่ยนแปลง
dropdown.addEventListener('change', (e) => displayMovies(e.target.value));

// กำหนดปีปัจจุบัน
const currentYear = new Date().getFullYear();
// ตั้งค่า dropdown ให้เป็นปีปัจจุบัน
dropdown.value = currentYear;
// เรียกใช้ฟังก์ชัน displayMovies เพื่อแสดงภาพยนตร์ของปีปัจจุบัน
displayMovies(currentYear);