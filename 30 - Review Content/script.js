class ReviewCarousel {
    constructor() {
        this.currentIndex = 0;
        this.isPlaying = true;
        this.initializeElements();
        this.setupEventListeners();
        this.createIndicators();
        this.showReview();
        this.startAutoplay();
    }

    initializeElements() {
        this.review = document.querySelector('.review');
        this.userImage = document.querySelector('.user-image');
        this.userName = document.querySelector('.user-name');
        this.userJob = document.querySelector('.user-job');
        this.prevBtn = document.querySelector('.prev-btn');
        this.nextBtn = document.querySelector('.next-btn');
        this.container = document.querySelector('.container');
        this.indicatorsContainer = document.querySelector('.indicators');
    }

    setupEventListeners() {
        this.prevBtn.addEventListener('click', () => this.showPreviousReview());
        this.nextBtn.addEventListener('click', () => this.showNextReview());
        
        // Pause autoplay on hover
        this.container.addEventListener('mouseenter', () => this.pauseAutoplay());
        this.container.addEventListener('mouseleave', () => this.resumeAutoplay());
    }

    createIndicators() {
        userdata.forEach((_, index) => {
            const indicator = document.createElement('div');
            indicator.classList.add('indicator');
            if (index === 0) indicator.classList.add('active');
            
            indicator.addEventListener('click', () => {
                this.currentIndex = index;
                this.showReview();
                this.resetProgress();
            });
            
            this.indicatorsContainer.appendChild(indicator);
        });
    }

    updateIndicators() {
        const indicators = document.querySelectorAll('.indicator');
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === this.currentIndex);
        });
    }

    showReview() {
        const { name, job, text, image } = userdata[this.currentIndex];
        
        // Add fade out effect
        this.review.style.opacity = 0;
        this.userImage.style.opacity = 0;
        
        setTimeout(() => {
            this.review.innerHTML = text;
            this.userImage.src = image;
            this.userName.innerHTML = name;
            this.userJob.innerHTML = job;
            
            // Add fade in effect
            this.review.style.opacity = 1;
            this.userImage.style.opacity = 1;
        }, 200);
        
        this.updateIndicators();
    }

    showNextReview() {
        this.currentIndex = (this.currentIndex + 1) % userdata.length;
        this.showReview();
        this.resetProgress();
    }

    showPreviousReview() {
        this.currentIndex = (this.currentIndex - 1 + userdata.length) % userdata.length;
        this.showReview();
        this.resetProgress();
    }

    resetProgress() {
        const progressBar = document.querySelector('.progress-bar');
        progressBar.style.animation = 'none';
        progressBar.offsetHeight; // Trigger reflow
        progressBar.style.animation = null;
    }

    startAutoplay() {
        this.autoplayKanitval = setKanitval(() => {
            if (this.isPlaying) {
                this.showNextReview();
            }
        }, 10000); // 10 seconds
    }

    pauseAutoplay() {
        this.isPlaying = false;
        const progressBar = document.querySelector('.progress-bar::after');
        if (progressBar) {
            progressBar.style.animationPlayState = 'paused';
        }
    }

    resumeAutoplay() {
        this.isPlaying = true;
        const progressBar = document.querySelector('.progress-bar::after');
        if (progressBar) {
            progressBar.style.animationPlayState = 'running';
        }
    }
}

// Initialize the carousel when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new ReviewCarousel();
});