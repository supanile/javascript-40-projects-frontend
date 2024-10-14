const form = document.getElementById('form');
const search = document.getElementById('search');
const result = document.getElementById('result');
const more = document.getElementById('more');

const apiURL = "https://api.lyrics.ovh";
let currentPage = 1;
let totalPages = 1;
let currentSearch = '';
let allSongs = [];
const songsPerPage = 10;

search.addEventListener('keyup', e => {
    if (e.key === 'Enter') {
        e.preventDefault();
        performSearch();
    }
});

form.addEventListener('submit', e => {
    e.preventDefault();
    performSearch();
});

function performSearch() {
    const songSearch = search.value.trim();

    if (!songSearch) {
        alert("ป้อนข้อมูลไม่ถูกต้อง");
    } else {
        currentSearch = songSearch;
        currentPage = 1;
        searchSongs(songSearch);
    }
}

async function searchSongs(songSearch) {
    try {
        const res = await fetch(`${apiURL}/suggest/${songSearch}`);
        const data = await res.json();
        allSongs = data.data;
        totalPages = Math.ceil(allSongs.length / songsPerPage);
        showSearchResults();
        updatePagination();
    } catch (error) {
        console.error('Error:', error);
        result.innerHTML = '<p>เกิดข้อผิดพลาดในการค้นหา โปรดลองอีกครั้ง</p>';
        more.style.display = 'none';
    }
}

function showSearchResults() {
    const start = (currentPage - 1) * songsPerPage;
    const end = start + songsPerPage;
    const songsToShow = allSongs.slice(start, end);

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

function updatePagination() {
    if (totalPages <= 1) {
        more.style.display = 'none';
    } else {
        more.style.display = 'flex';
        more.innerHTML = `
            <button class="btn" onclick="changePage('prev')" ${currentPage > 1 ? '' : 'disabled'}>Previous</button>
            <span>Page ${currentPage} of ${totalPages}</span>
            <button class="btn" onclick="changePage('next')" ${currentPage < totalPages ? '' : 'disabled'}>Next</button>
        `;
    }
}

function changePage(direction) {
    if (direction === 'next' && currentPage < totalPages) {
        currentPage++;
    } else if (direction === 'prev' && currentPage > 1) {
        currentPage--;
    }
    showSearchResults();
    updatePagination();
}

async function getLyrics(artist, title) {
    try {
        const res = await fetch(`${apiURL}/v1/${artist}/${title}`);
        const data = await res.json();
        
        if (data.lyrics) {
            const lyrics = data.lyrics.replace(/(\r\n|\r|\n)/g, '<br>');
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
        more.style.display = 'none';
    } catch (error) {
        console.error('Error:', error);
        result.innerHTML = '<p>เกิดข้อผิดพลาดในการดึงเนื้อเพลง โปรดลองอีกครั้ง</p>';
        more.style.display = 'none';
    }
}