let currentIndex = 0;
const slides = document.querySelectorAll('.slide');
const dotsContainer = document.querySelector('.nav-dots');
let autoSlideInterval;
const slideIntervalTime = 3000; 


slides.forEach((slide, index) => {
    const dot = document.createElement('span');
    dot.classList.add('dot');
    dot.addEventListener('click', () => {
        goToSlide(index);
        resetAutoSlide();
    });
    dotsContainer.appendChild(dot);
});
const dots = document.querySelectorAll('.dot');

function updateSlider() {
    const offset = -currentIndex * 100;
    console.log(`translateX(${offset}%)`);
    document.querySelector('.slides').style.transform = `translateX(${offset}%)`;

    dots.forEach(dot => dot.classList.remove('active'));
    dots[currentIndex].classList.add('active');
}

function nextSlide() {
    currentIndex = (currentIndex + 1) % slides.length;
    console.log(currentIndex);
    updateSlider();
}

function prevSlide() {
    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
    console.log(currentIndex);
    updateSlider();
}

function goToSlide(index) {
    currentIndex = index;
    updateSlider();
}

function startAutoSlide() {
    autoSlideInterval = setInterval(nextSlide, slideIntervalTime);
}

function stopAutoSlide() {
    clearInterval(autoSlideInterval);
}

function resetAutoSlide() {
    stopAutoSlide();
    startAutoSlide();
}

document.querySelector('.next').addEventListener('click', () => {
    nextSlide();
    resetAutoSlide();
});

document.querySelector('.prev').addEventListener('click', () => {
    prevSlide();
    resetAutoSlide();
});

updateSlider();
startAutoSlide();
