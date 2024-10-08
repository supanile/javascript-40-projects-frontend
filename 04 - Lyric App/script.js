const form = document.getElementById('form');
const search = document.getElementById('search');
const result = document.getElementById('result');
const more = document.getElementById('more');

const apiURL = "https://api.lyrics.ovh";

form.addEventListener('submit', e => {
    e.preventDefault();
    const songSearch = search.value.trim();

    if (!songSearch) {
        alert("ป้อนข้อมูลไม่ถูกต้อง");
    } else {
        searchSongs(songSearch);
    }
});

async function searchSongs(songSearch) {
    try {
        const res = await fetch(`${apiURL}/suggest/${songSearch}`);
        const data = await res.json();
        showSearchResults(data);
    } catch (error) {
        console.error('Error:', error);
        result.innerHTML = '<p>เกิดข้อผิดพลาดในการค้นหา โปรดลองอีกครั้ง</p>';
    }
}

function showSearchResults(data) {
    result.innerHTML = `
        <ul class="songs">
            ${data.data.slice(0, 10).map(song => `
                <li>
                    <span><strong>${song.artist.name}</strong> - ${song.title}</span>
                    <button class="btn" onclick="getLyrics('${song.artist.name}', '${song.title}')">เนื้อเพลง</button>
                </li>
            `).join('')}
        </ul>
    `;

    more.innerHTML = '';
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
        more.innerHTML = '';
    } catch (error) {
        console.error('Error:', error);
        result.innerHTML = '<p>เกิดข้อผิดพลาดในการดึงเนื้อเพลง โปรดลองอีกครั้ง</p>';
    }
}