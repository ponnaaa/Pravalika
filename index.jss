document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // MOBILE NAVIGATION HAMBURGER TOGGLE
  // ==========================================
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');

  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });

  // Close nav menu on link click
  document.querySelectorAll('.nav-item').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
    });
  });

  // ==========================================
  // TESTIMONIALS CAROUSEL ENGINE
  // ==========================================
  const track = document.getElementById('carouselTrack');
  const slides = Array.from(track.children);
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const indicatorsContainer = document.getElementById('carouselIndicators');
  const indicators = Array.from(indicatorsContainer.children);

  let currentIndex = 0;

  function updateCarousel(index) {
    if (index < 0) index = slides.length - 1;
    if (index >= slides.length) index = 0;
    
    currentIndex = index;
    track.style.transform = `translateX(-${currentIndex * 100}%)`;

    // Update active dot indicator
    indicators.forEach((dot, i) => {
      dot.classList.toggle('active', i === currentIndex);
    });
  }

  nextBtn.addEventListener('click', () => {
    updateCarousel(currentIndex + 1);
  });

  prevBtn.addEventListener('click', () => {
    updateCarousel(currentIndex - 1);
  });

  indicators.forEach(dot => {
    dot.addEventListener('click', (e) => {
      const targetIndex = parseInt(e.target.getAttribute('data-index'));
      updateCarousel(targetIndex);
    });
  });

  // Auto-play Carousel every 6 seconds
  setInterval(() => {
    updateCarousel(currentIndex + 1);
  }, 6000);

  // ==========================================
  // INTERSECTION OBSERVER FOR FADE-IN ANIMATION
  // ==========================================
  const observerOptions = {
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  document.querySelectorAll('.card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'all 0.6s cubic-bezier(0.25, 0.8, 0.25, 1)';
    observer.observe(card);
  });

});