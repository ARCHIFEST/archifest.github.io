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
});
