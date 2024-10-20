class SliderController {
    constructor() {
        this.slideContainer = document.querySelector('.slider-container');
        this.slideRight = document.querySelector('.right-content');
        this.slideLeft = document.querySelector('.left-content');
        this.upButton = document.querySelector('.up-button');
        this.downButton = document.querySelector('.down-button');
        
        this.slidesCount = this.slideRight.querySelectorAll('.slide').length;
        this.activeSlideIndex = 0;
        
        this.init();
    }
    
    init() {
        this.upButton.addEventListener('click', () => this.changeSlide('up'));
        this.downButton.addEventListener('click', () => this.changeSlide('down'));
        
        // Add keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowUp') this.changeSlide('up');
            if (e.key === 'ArrowDown') this.changeSlide('down');
        });
        
        // Add touch support
        let touchStartY = 0;
        this.slideContainer.addEventListener('touchstart', (e) => {
            touchStartY = e.touches[0].clientY;
        });
        
        this.slideContainer.addEventListener('touchmove', (e) => {
            e.preventDefault();
            const touchEndY = e.touches[0].clientY;
            const diff = touchStartY - touchEndY;
            
            if (Math.abs(diff) > 50) { // Minimum swipe distance
                if (diff > 0) {
                    this.changeSlide('up');
                } else {
                    this.changeSlide('down');
                }
                touchStartY = touchEndY;
            }
        });
    }
    
    changeSlide(direction) {
        const sliderHeight = this.slideContainer.clientHeight;
        
        if (direction === 'up') {
            this.activeSlideIndex++;
            if (this.activeSlideIndex > this.slidesCount - 1) {
                this.activeSlideIndex = 0;
            }
        } else if (direction === 'down') {
            this.activeSlideIndex--;
            if (this.activeSlideIndex < 0) {
                this.activeSlideIndex = this.slidesCount - 1;
            }
        }
        
        this.updateSlidePosition(sliderHeight);
    }
    
    updateSlidePosition(height) {
        const position = -this.activeSlideIndex * height;
        this.slideLeft.style.transform = `translateY(${position}px)`;
        this.slideRight.style.transform = `translateY(${position}px)`;
    }
}

// Initialize slider when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new SliderController();
});