
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

  const header = document.querySelector('.site-header');
  const onScroll = () => {
    if (window.scrollY > 16) header.classList.add('scrolled');
    else header.classList.remove('scrolled');
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  const form = document.getElementById('quoteForm');
  const submitBtn = document.getElementById('submitBtn');
  const status = document.getElementById('formStatus');

  if (form && submitBtn && status) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      status.textContent = 'Sending...';
      status.className = 'form-status';
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';

      try {
        const response = await fetch(form.action, {
          method: 'POST',
          body: new FormData(form),
          headers: { 'Accept': 'application/json' }
        });

        if (response.ok) {
          window.location.href = './thank-you.html';
          return;
        }

        let data = {};
        try { data = await response.json(); } catch (_) {}
        const msg = data?.errors?.[0]?.message || 'Something went wrong. Please try again.';
        status.textContent = msg;
        status.className = 'form-status error';
      } catch (err) {
        status.textContent = 'Network error. Please try again.';
        status.className = 'form-status error';
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send Message';
      }
    });
  }
});
