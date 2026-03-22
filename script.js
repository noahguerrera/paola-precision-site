document.addEventListener('DOMContentLoaded', () => {
  const items = document.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  items.forEach((item, i) => {
    item.style.transitionDelay = `${Math.min(i * 50, 300)}ms`;
    observer.observe(item);
  });
});
