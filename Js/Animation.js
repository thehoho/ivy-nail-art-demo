document.addEventListener("DOMContentLoaded", function () {
  // HERO: On load
  const hero = document.querySelector('.hero-animate');
  if (hero) setTimeout(() => hero.classList.add('visible'), 100);

  // Generic observer for fade/slide-in
  function revealOnScroll(selector, stagger = 0) {
    const els = document.querySelectorAll(selector);
    if (!els.length) return;
    const obs = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('visible');
          }, stagger ? i * stagger : 0);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.18 });
    els.forEach(el => obs.observe(el));
  }

  // SERVICES: fade in with delay
  revealOnScroll('.service-card', 120);

  // GALLERY: fade-up, staggered
  revealOnScroll('.gallery-item', 90);

  // ABOUT: slide in left/right
  revealOnScroll('#about .about-image');
  revealOnScroll('#about .about-content', 180);

  // TESTIMONIALS: fade staggered
  revealOnScroll('.testimonial-card', 120);

  // CTA: slide up + fade
  revealOnScroll('.cta');
});