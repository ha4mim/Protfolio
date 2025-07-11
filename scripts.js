particlesJS('particles-js', {
  particles: {
    number: { value: 80, density: { enable: true, value_area: 800 } },
    color: { value: '#3b82f6' },
    shape: { type: 'circle' },
    opacity: { value: 0.5, random: true },
    size: { value: 3, random: true },
    line_linked: { enable: true, distance: 150, color: '#3b82f6', opacity: 0.4, width: 1 },
    move: { enable: true, speed: 2, direction: 'none', random: false, straight: false, out_mode: 'out' }
  },
  interactivity: {
    detect_on: 'canvas',
    events: { onhover: { enable: true, mode: 'repulse' }, onclick: { enable: true, mode: 'push' }, resize: true },
    modes: { repulse: { distance: 100, duration: 0.4 }, push: { particles_nb: 4 } }
  },
  retina_detect: true
});
const fadeElements = document.querySelectorAll('.fade-in');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.1 });
fadeElements.forEach(el => observer.observe(el));
const scrollToTopBtn = document.querySelector('.scroll-to-top');
const progressCircle = document.querySelector('.scroll-progress circle');
window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercent = (scrollTop / docHeight) * 100;
  const dashOffset = 188 - (scrollPercent * 1.88);
  progressCircle.style.strokeDashoffset = dashOffset;
  scrollToTopBtn.classList.toggle('visible', scrollTop > 100);
});
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
const sections = document.querySelectorAll('section, header');
let currentSection = 0;
window.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowDown' && currentSection < sections.length - 1) {
    currentSection++;
    sections[currentSection].scrollIntoView({ behavior: 'smooth' });
  } else if (e.key === 'ArrowUp' && currentSection > 0) {
    currentSection--;
    sections[currentSection].scrollIntoView({ behavior: 'smooth' });
  }
});
const navLinks = document.querySelectorAll('.nav-link');
window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    if (window.scrollY >= sectionTop - 60) {
      current = section.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href').substring(1) === current) {
      link.classList.add('active');
    }
  });
});
const contactForm = document.querySelector('form[name="contact"]');
if (contactForm) {
  const submitButton = contactForm.querySelector('button[type="submit"]');
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';
    Swal.fire({
      title: 'Sending Message',
      text: 'Please wait...',
      allowOutsideClick: false,
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });
    const formData = new FormData(contactForm);
    try {
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formData).toString()
      });
      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Success!',
          text: 'Your message has been sent successfully. I will get back to you soon!',
          confirmButtonText: 'OK'
        });
        contactForm.reset();
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to send message. Please try again or email me at hamimmahmu111@gmail.com.',
          confirmButtonText: 'OK'
        });
      }
    } catch (error) {
      Swal.fire({
        icon: 'warning',
        title: 'Warning',
        text: 'An error occurred. Please try again later or email me at hamimmahmu111@gmail.com.',
        confirmButtonText: 'OK'
      });
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = 'Send Message';
    }
  });
}
document.querySelector('.navbar-toggler').addEventListener('click', () => {
  const navbarCollapse = document.querySelector('#navbarNav');
  if (navbarCollapse.classList.contains('show')) {
    navbarCollapse.classList.remove('show');
  } else {
    navbarCollapse.classList.add('show');
  }
});