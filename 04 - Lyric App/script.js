// ดึง element จาก DOM
const form = document.getElementById('form');
const search = document.getElementById('search');
const result = document.getElementById('result');
const more = document.getElementById('more');

// URL ของ API ที่ใช้ในการค้นหาเนื้อเพลง
const apiURL = "https://api.lyrics.ovh";
let currentPage = 1; // หน้าปัจจุบันของผลการค้นหา
let totalPages = 1; // จำนวนหน้าทั้งหมดของผลการค้นหา
let currentSearch = ''; // คำค้นหาปัจจุบัน
let allSongs = []; // เก็บข้อมูลเพลงทั้งหมดที่ค้นหาได้
const songsPerPage = 10; // จำนวนเพลงที่แสดงต่อหน้า

// เพิ่ม event listener สำหรับการกดปุ่ม Enter ในช่องค้นหา
search.addEventListener('keyup', e => {
    if (e.key === 'Enter') {
        e.preventDefault();
        performSearch(); // เรียกใช้ฟังก์ชันค้นหา
    }
});

// เพิ่ม event listener สำหรับการ submit ฟอร์ม
form.addEventListener('submit', e => {
    e.preventDefault();
    performSearch(); // เรียกใช้ฟังก์ชันค้นหา
});

// ฟังก์ชันสำหรับการค้นหาเพลง
function performSearch() {
    const songSearch = search.value.trim(); // ตัดช่องว่างออกจากคำค้นหา

    if (!songSearch) {
        alert("ป้อนข้อมูลไม่ถูกต้อง"); // แจ้งเตือนถ้าไม่มีการป้อนข้อมูล
    } else {
        currentSearch = songSearch;
        currentPage = 1;
        searchSongs(songSearch); // เรียกใช้ฟังก์ชันค้นหาเพลง
    }
}

// ฟังก์ชันสำหรับการค้นหาเพลงจาก API
async function searchSongs(songSearch) {
    try {
        const res = await fetch(`${apiURL}/suggest/${songSearch}`); // เรียก API
        const data = await res.json(); // แปลงผลลัพธ์เป็น JSON
        allSongs = data.data; // เก็บข้อมูลเพลง
        totalPages = Math.ceil(allSongs.length / songsPerPage); // คำนวณจำนวนหน้าทั้งหมด
        showSearchResults(); // แสดงผลการค้นหา
        updatePagination(); // อัปเดตการแสดงผลการแบ่งหน้า
    } catch (error) {
        console.error('Error:', error);
        result.innerHTML = '<p>เกิดข้อผิดพลาดในการค้นหา โปรดลองอีกครั้ง</p>'; // แสดงข้อความผิดพลาด
        more.style.display = 'none'; // ซ่อนปุ่มเพิ่มเติม
    }
}

// ฟังก์ชันสำหรับแสดงผลการค้นหา
function showSearchResults() {
    const start = (currentPage - 1) * songsPerPage; // คำนวณตำแหน่งเริ่มต้น
    const end = start + songsPerPage; // คำนวณตำแหน่งสิ้นสุด
    const songsToShow = allSongs.slice(start, end); // เลือกเพลงที่จะแสดง

    result.innerHTML = `
        <ul class="songs">
            ${songsToShow.map(song => `
                <li>
                    <span><strong>${song.artist.name}</strong> - ${song.title}</span>
                    <button class="btn" onclick="getLyrics('${song.artist.name}', '${song.title}')">เนื้อเพลง</button>
                </li>
            `).join('')}
        </ul>
    `;
}

// ฟังก์ชันสำหรับอัปเดตการแสดงผลการแบ่งหน้า
function updatePagination() {
    if (totalPages <= 1) {
        more.style.display = 'none'; // ซ่อนปุ่มเพิ่มเติมถ้ามีแค่หน้าเดียว
    } else {
        more.style.display = 'flex'; // แสดงปุ่มเพิ่มเติม
        more.innerHTML = `
            <button class="btn" onclick="changePage('prev')" ${currentPage > 1 ? '' : 'disabled'}>Previous</button>
            <span>Page ${currentPage} of ${totalPages}</span>
            <button class="btn" onclick="changePage('next')" ${currentPage < totalPages ? '' : 'disabled'}>Next</button>
        `;
    }
}

// ฟังก์ชันสำหรับเปลี่ยนหน้า
function changePage(direction) {
    if (direction === 'next' && currentPage < totalPages) {
        currentPage++;
    } else if (direction === 'prev' && currentPage > 1) {
        currentPage--;
    }
    showSearchResults(); // แสดงผลการค้นหาใหม่
    updatePagination(); // อัปเดตการแสดงผลการแบ่งหน้า
}

// ฟังก์ชันสำหรับดึงเนื้อเพลงจาก API
async function getLyrics(artist, title) {
    try {
        const res = await fetch(`${apiURL}/v1/${artist}/${title}`); // เรียก API
        const data = await res.json(); // แปลงผลลัพธ์เป็น JSON
        
        if (data.lyrics) {
            const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, '<br>'); // แปลงบรรทัดใหม่เป็น <br>
            result.innerHTML = `
                <h2><strong>${artist}</strong> - ${title}</h2>
                <div class="lyrics">${lyrics}</div>
            `;
        } else {
            result.innerHTML = `
                <h2><strong>${artist}</strong> - ${title}</h2>
                <p>ไม่พบเนื้อเพลงนี้</p>
            `;
        }
        more.style.display = 'none'; // ซ่อนปุ่มเพิ่มเติม
    } catch (error) {
        console.error('Error:', error);
        result.innerHTML = '<p>เกิดข้อผิดพลาดในการดึงเนื้อเพลง โปรดลองอีกครั้ง</p>'; // แสดงข้อความผิดพลาด
        more.style.display = 'none'; // ซ่อนปุ่มเพิ่มเติม
    }
}