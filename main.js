// console.log('Hospital Website Loaded'); slider index page
document.addEventListener('DOMContentLoaded', function() {
            const sliderTrack = document.getElementById('sliderTrack');
            const prevBtn = document.getElementById('prevBtn');
            const nextBtn = document.getElementById('nextBtn');
            
            let currentPosition = 0;
            const slideWidth = 100 / 4; // 4 slides visible at a time
            const totalSlides = document.querySelectorAll('.slide').length;
            const maxPosition = -(totalSlides - 4) * slideWidth;
            
            // Auto slide every 3 seconds
            let slideInterval = setInterval(nextSlide, 3000);
            
            function nextSlide() {
                if (currentPosition > maxPosition) {
                    currentPosition -= slideWidth;
                } else {
                    // If at the end, loop back to start
                    currentPosition = 0;
                }
                updateSliderPosition();
            }
            
            function prevSlide() {
                if (currentPosition < 0) {
                    currentPosition += slideWidth;
                } else {
                    // If at the beginning, loop to end
                    currentPosition = maxPosition;
                }
                updateSliderPosition();
            }
            
            function updateSliderPosition() {
              if(sliderTrack?.style){
                sliderTrack.style.transform = `translateX(${currentPosition}%)`;
              }
            }
            
            // Button event listeners
            nextBtn.addEventListener('click', function() {
                clearInterval(slideInterval);
                nextSlide();
                slideInterval = setInterval(nextSlide, 3000);
            });
            
            prevBtn.addEventListener('click', function() {
                clearInterval(slideInterval);
                prevSlide();
                slideInterval = setInterval(nextSlide, 3000);
            });
            
            // Pause auto-slide on hover
            sliderTrack.addEventListener('mouseenter', function() {
                clearInterval(slideInterval);
            });
            
            sliderTrack.addEventListener('mouseleave', function() {
                slideInterval = setInterval(nextSlide, 3000);
            });
        });

function initSlider(sliderId, slideClass, wrapperClass) {
    const slider = document.getElementById(sliderId);
    let slides = document.querySelectorAll(slideClass);
    let index = 1;
    let speed = 2000;

    // Clone first 2 and last 2 to keep loop smooth
    const firstClone = slides[0].cloneNode(true);
    const secondClone = slides[1].cloneNode(true);

    const lastClone = slides[slides.length - 1].cloneNode(true);
    const secondLastClone = slides[slides.length - 2].cloneNode(true);

    slider.appendChild(firstClone);
    slider.appendChild(secondClone);

    slider.insertBefore(lastClone, slides[0]);
    slider.insertBefore(secondLastClone, slides[0]);

    slides = document.querySelectorAll(slideClass);

    // Calculate slide height including margin
    let slideHeight = slides[0].offsetHeight + 20; // 160px + 20px margin

    // Start on first real slide
    slider.style.transform = `translateY(-${slideHeight}px)`;

    function moveTo(i) {
      slider.style.transition = "transform 0.6s ease-in-out";
      slider.style.transform = `translateY(-${i * slideHeight}px)`;
    }

    function nextSlide() {
      index++;
      moveTo(index);
    }

    function prevSlide() {
      index--;
      moveTo(index);
    }

    // Infinite Loop Logic
    slider.addEventListener("transitionend", () => {
      if (index >= slides.length - 2) {
        slider.style.transition = "none";
        index = 2;
        slider.style.transform = `translateY(-${index * slideHeight}px)`;
      }

      if (index <= 1) {
        slider.style.transition = "none";
        index = slides.length - 3;
        slider.style.transform = `translateY(-${index * slideHeight}px)`;
      }
    });

    // Autoplay
    let autoPlay = setInterval(nextSlide, speed);

    // Pause autoplay on hover
    const wrapper = document.querySelector(wrapperClass);

    wrapper.addEventListener("mouseenter", () => clearInterval(autoPlay));
    wrapper.addEventListener("mouseleave", () => {
      autoPlay = setInterval(nextSlide, speed);
    });

    // Resize support
    window.addEventListener("resize", () => {
      slideHeight = slides[0].offsetHeight + 20;
      slider.style.transform = `translateY(-${index * slideHeight}px)`;
    });
}

