// Basic script to verify configuration
fetch('site.json')
  .then((response) => response.json())
  .then((config) => {
    console.log('Loaded site config:', config);
  })
  .catch((err) => {
    console.error('Failed to load config', err);
  });

// Add scroll-triggered animations for elements with the `reveal` class
document.addEventListener('DOMContentLoaded', () => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.2,
    }
  );

  document.querySelectorAll('.reveal').forEach((el) => {
    observer.observe(el);
  });

  const slider = document.querySelector('.instagram-slider');
  if (slider) {
    const slides = slider.querySelectorAll('.slides .slide');
    let current = 0;
    let intervalId;

    function showSlide(index) {
      slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === index);
      });
    }

    function startAutoSlide() {
      intervalId = setInterval(() => {
        current = (current + 1) % slides.length;
        showSlide(current);
      }, 10000);
    }

    function resetAutoSlide() {
      clearInterval(intervalId);
      startAutoSlide();
    }

    showSlide(current);
    startAutoSlide();

    slider.querySelector('.prev').addEventListener('click', () => {
      current = (current - 1 + slides.length) % slides.length;
      showSlide(current);
      resetAutoSlide();
    });

    slider.querySelector('.next').addEventListener('click', () => {
      current = (current + 1) % slides.length;
      showSlide(current);
      resetAutoSlide();
    });
  }
});
