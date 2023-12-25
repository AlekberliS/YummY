const slider = document.querySelector('.slider');
let currentIndex = 0;

function nextSlide() {
  currentIndex = (currentIndex + 1) % 4; 
  updateSlider();
}

function updateSlider() {
  const translateValue = -currentIndex * 500; 
  slider.style.transform = `translateX(${translateValue}px)`;
}


setInterval(nextSlide, 4000); 


