const imageWrapper = document.querySelector('.image-wrapper');
const heartIcon = document.querySelector('.heart-icon i');
const likeCounter = document.querySelector('.stats span');
const likeButton = document.querySelector('.stats i');

let likes = 0;

function showHeartAnimation() {
    heartIcon.style.opacity = '1';
    heartIcon.classList.add('fa-beat-fade');
    
    setTimeout(() => {
        heartIcon.style.opacity = '0';
        heartIcon.classList.remove('fa-beat-fade');
    }, 1000);
}

function updateLikes() {
    likes++;
    likeCounter.textContent = likes;
    likeButton.classList.remove('far');
    likeButton.classList.add('fas');
}

imageWrapper.addEventListener('dblclick', () => {
    showHeartAnimation();
    updateLikes();
});

likeButton.addEventListener('click', () => {
    if (likeButton.classList.contains('far')) {
        updateLikes();
    } else {
        likes--;
        likeCounter.textContent = likes;
        likeButton.classList.remove('fas');
        likeButton.classList.add('far');
    }
});