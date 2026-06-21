/* ============================================================
   Mwagambo & Okonjo Advocates — Global Script
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {

  /* ---- Navbar scroll effect ---- */
  const mainNav = document.getElementById('mainNav');
  if (mainNav) {
    window.addEventListener('scroll', function () {
      mainNav.classList.toggle('nav-scrolled', window.scrollY > 60);
    });
  }

  /* ---- Active nav link highlight ---- */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.navbar-nav .nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });

  /* ---- Scroll reveal (fade-in on scroll) ---- */
  const revealEls = document.querySelectorAll(
    '.practice-card, .blog-card, .partner-card, .stat-item'
  );

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    revealEls.forEach(el => {
      el.classList.add('reveal');
      observer.observe(el);
    });
  }

  /* ---- Contact form validation (contact.html) ---- */
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      clearErrors();
      let valid = true;

      const name = document.getElementById('name');
      const email = document.getElementById('email');
      const phone = document.getElementById('phone');
      const subject = document.getElementById('subject');
      const message = document.getElementById('message');

      if (!name.value.trim() || name.value.trim().length < 2) {
        showError(name, 'Please enter your full name (at least 2 characters).');
        valid = false;
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email.value.trim() || !emailRegex.test(email.value.trim())) {
        showError(email, 'Please enter a valid email address.');
        valid = false;
      }

      const phoneRegex = /^[\+\d\s\-\(\)]{7,20}$/;
      if (phone.value.trim() && !phoneRegex.test(phone.value.trim())) {
        showError(phone, 'Please enter a valid phone number.');
        valid = false;
      }

      if (!subject.value) {
        showError(subject, 'Please select the area of law relevant to your inquiry.');
        valid = false;
      }

      if (!message.value.trim() || message.value.trim().length < 20) {
        showError(message, 'Please describe your matter briefly (at least 20 characters).');
        valid = false;
      }

      if (valid) {
        showSuccessMessage();
        contactForm.reset();
      }
    });
  }

  function showError(field, msg) {
    field.classList.add('is-invalid');
    const feedback = document.createElement('div');
    feedback.className = 'invalid-feedback';
    feedback.textContent = msg;
    field.parentNode.appendChild(feedback);
  }

  function clearErrors() {
    document.querySelectorAll('.is-invalid').forEach(el => el.classList.remove('is-invalid'));
    document.querySelectorAll('.invalid-feedback').forEach(el => el.remove());
  }

  function showSuccessMessage() {
    const formWrapper = document.getElementById('formWrapper');
    if (formWrapper) {
      formWrapper.innerHTML = `
        <div class="form-success text-center py-5">
          <i class="bi bi-check-circle-fill text-gold fs-1 d-block mb-3"></i>
          <h3 class="text-navy" style="font-family: var(--font-display);">Thank You</h3>
          <p class="text-muted">Your message has been received. One of our advocates will contact you within one business day.</p>
        </div>
      `;
    }
  }

  /* ---- Practice area filter (practice-areas.html) ---- */
  const filterBtns = document.querySelectorAll('[data-filter]');
  const practiceItems = document.querySelectorAll('[data-area]');

  if (filterBtns.length && practiceItems.length) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', function () {
        filterBtns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');

        const filter = this.getAttribute('data-filter');

        practiceItems.forEach(item => {
          if (filter === 'all' || item.getAttribute('data-area') === filter) {
            item.style.display = 'block';
            item.classList.add('fade-in');
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  }

  /* ---- FAQ accordion keyboard accessibility ---- */
  document.querySelectorAll('.accordion-button').forEach(btn => {
    btn.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        btn.click();
      }
    });
  });

});

/* ---- CSS for scroll reveal (injected once) ---- */
const style = document.createElement('style');
style.textContent = `
  .reveal {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.5s ease, transform 0.5s ease;
  }
  .reveal.visible {
    opacity: 1;
    transform: translateY(0);
  }
`;
document.head.appendChild(style);