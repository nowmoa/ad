document.addEventListener('DOMContentLoaded', function() {
    const sliders = document.querySelectorAll('.slider');
    const scrollElements = document.querySelectorAll('.scroll-effect');

    function getItemsPerSlide() {
        if (window.innerWidth >= 1200) {
            return 4;
        } else if (window.innerWidth >= 768) {
            return 3;
        } else {
            return 2;
        }
    }

    function initializeSlider(slider) {
        const track = slider.querySelector('.slider-track');
        const items = slider.querySelectorAll('.slider-item');
        const prevButton = slider.querySelector('.slider-prev');
        const nextButton = slider.querySelector('.slider-next');
        const indicatorsContainer = slider.querySelector('.slider-indicators');

        let itemsPerSlide = getItemsPerSlide();
        const totalItems = items.length;
        const totalSlides = Math.ceil(totalItems / itemsPerSlide);
        let currentSlide = 0;

        while (indicatorsContainer.firstChild) {
            indicatorsContainer.removeChild(indicatorsContainer.firstChild);
        }

        for (let i = 0; i < totalSlides; i++) {
            const indicator = document.createElement('button');
            if (i === 0) indicator.classList.add('active');
            indicatorsContainer.appendChild(indicator);
        }

        const indicators = indicatorsContainer.querySelectorAll('button');

        function updateSliderPosition() {
            itemsPerSlide = getItemsPerSlide();
            const slideWidth = 100;
            const newPosition = -(currentSlide * slideWidth) + '%';
            track.style.transform = `translateX(${newPosition})`;

            indicators.forEach((indicator, index) => {
                indicator.classList.toggle('active', index === currentSlide);
            });
        }

        prevButton.addEventListener('click', function() {
            currentSlide = (currentSlide > 0) ? currentSlide - 1 : totalSlides - 1;
            updateSliderPosition();
        });

        nextButton.addEventListener('click', function() {
            currentSlide = (currentSlide < totalSlides - 1) ? currentSlide + 1 : 0;
            updateSliderPosition();
        });

        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', function() {
                currentSlide = index;
                updateSliderPosition();
            });
        });

        setInterval(function() {
            currentSlide = (currentSlide < totalSlides - 1) ? currentSlide + 1 : 0;
            updateSliderPosition();
        }, 3000);

        updateSliderPosition();
    }

    sliders.forEach(function(slider) {
        initializeSlider(slider);
    });

    window.addEventListener('resize', function() {
        sliders.forEach(function(slider) {
            initializeSlider(slider);
        });
    });

    // 스크롤 애니메이션
    const elementInView = (el, dividend = 1.25) => {
        const elementTop = el.getBoundingClientRect().top;
        return elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend;
    };

    const displayScrollElement = (element) => {
        element.classList.add('show');
    };

    const hideScrollElement = (element) => {
        element.classList.remove('show');
    };

    const handleScrollAnimation = () => {
        scrollElements.forEach((el) => {
            if (elementInView(el, 1.25)) {
                displayScrollElement(el);
            } else {
                hideScrollElement(el);
            }
        });
    };

    window.addEventListener('scroll', () => {
        handleScrollAnimation();
    });
});
