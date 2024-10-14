const apiKey = "6bf2e023c8345d10623e24d02a4b8001";
const content = document.getElementById('content');
const urlPoster = "https://image.tmdb.org/t/p/w500/";
const dropdown = document.getElementById('years');

async function fetchMovies(year) {
    const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US&sort_by=popularity.desc&page=1&year=${year}`;
    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        return await response.json();
    } catch (error) {
        console.error("Error fetching movies:", error);
        return { results: [] };
    }
}

function createMovieElement(movie) {
    const movieEl = document.createElement('div');
    movieEl.classList.add('movie');
    
    const img = document.createElement('img');
    img.src = movie.poster_path ? `${urlPoster}${movie.poster_path}` : 'placeholder.jpg';
    img.alt = movie.title;
    
    const title = document.createElement('h2');
    title.textContent = movie.title.length > 24 ? `${movie.title.substring(0, 21)}...` : movie.title;
    
    movieEl.appendChild(img);
    movieEl.appendChild(title);
    return movieEl;
}

async function displayMovies(year) {
    content.innerHTML = '<p>Loading...</p>';
    const movies = await fetchMovies(year);
    content.innerHTML = '';
    
    if (movies.results.length === 0) {
        content.innerHTML = '<p>No movies found for this year.</p>';
        return;
    }
    
    movies.results.forEach(movie => {
        const movieEl = createMovieElement(movie);
        content.appendChild(movieEl);
    });
}

dropdown.addEventListener('change', (e) => displayMovies(e.target.value));

// Initialize with the current year
const currentYear = new Date().getFullYear();
dropdown.value = currentYear;
displayMovies(currentYear);