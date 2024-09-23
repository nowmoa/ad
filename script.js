document.addEventListener('DOMContentLoaded', function () {
    const sliders = document.querySelectorAll('.slider');
    const scrollElements = document.querySelectorAll('.scroll-effect');

    // 네비게이션 스크롤 이동 기능 추가
    const navLinks = document.querySelectorAll('.nav-menu a');

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 80, // 헤더 높이만큼 빼고 스크롤
                    behavior: 'smooth'
                });
            }
        });
    });

    // 반응형 슬라이드를 위한 함수
    function getItemsPerSlide() {
        if (window.innerWidth >= 1200) {
            return 4; // 데스크탑에서 4개
        } else if (window.innerWidth >= 768) {
            return 3; // 태블릿에서 3개
        } else {
            return 2; // 모바일에서 2개씩 표시
        }
    }

    // 슬라이더 초기화 함수
    function initializeSlider(slider) {
        const track = slider.querySelector('.slider-track');
        const items = slider.querySelectorAll('.slider-item');
        const prevButton = slider.querySelector('.slider-prev');
        const nextButton = slider.querySelector('.slider-next');
        const indicatorsContainer = slider.querySelector('.slider-indicators');

        let currentIndex = 0;
        const totalItems = items.length;
        let itemsPerSlide = getItemsPerSlide();

        // 슬라이더 포지션 및 인디케이터 업데이트
        function updateSlider() {
            itemsPerSlide = getItemsPerSlide();
            const slideWidth = slider.clientWidth / itemsPerSlide; // 슬라이더 너비 계산
            track.style.transform = `translateX(-${currentIndex * slideWidth}px)`; // 슬라이더 트랙 이동
            updateIndicators();
        }

        // 인디케이터 업데이트
        function updateIndicators() {
            indicatorsContainer.innerHTML = '';  // 인디케이터 초기화
            const totalSlides = Math.ceil(totalItems / itemsPerSlide);  // 총 슬라이드 개수 계산
            for (let i = 0; i < totalSlides; i++) {
                const indicator = document.createElement('button');
                indicator.classList.add('indicator');
                if (i === Math.floor(currentIndex / itemsPerSlide)) {
                    indicator.classList.add('active');
                }
                indicator.addEventListener('click', () => {
                    currentIndex = i * itemsPerSlide;
                    updateSlider();
                });
                indicatorsContainer.appendChild(indicator);
            }
        }

        // 다음 슬라이드로 이동 (한 번에 itemsPerSlide 개수만큼 이동)
        function nextSlide() {
            if (currentIndex < totalItems - itemsPerSlide) {
                currentIndex += itemsPerSlide; // itemsPerSlide 수만큼 넘김
            } else {
                currentIndex = 0; // 처음으로 돌아감
            }
            updateSlider();
        }

        // 이전 슬라이드로 이동 (한 번에 itemsPerSlide 개수만큼 이동)
        function prevSlide() {
            if (currentIndex > 0) {
                currentIndex -= itemsPerSlide; // itemsPerSlide 수만큼 되돌림
            } else {
                currentIndex = totalItems - itemsPerSlide; // 마지막 슬라이드로 이동
            }
            updateSlider();
        }

        // 이벤트 핸들러 추가
        nextButton.addEventListener('click', nextSlide);
        prevButton.addEventListener('click', prevSlide);

        // 자동 슬라이드 (3초마다)
        setInterval(nextSlide, 3000);

        // 초기 슬라이더 설정
        updateSlider();

        // 창 크기 변경 시 슬라이더 업데이트
        window.addEventListener('resize', updateSlider);
    }

    // 모든 슬라이더에 대해 초기화 실행
    sliders.forEach(function (slider) {
        initializeSlider(slider);
    });

    // 스크롤 애니메이션 처리 함수
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

    // 스크롤 이벤트 리스너
    window.addEventListener('scroll', () => {
        handleScrollAnimation();
    });

    // 초기 스크롤 애니메이션 트리거
    handleScrollAnimation();
});
