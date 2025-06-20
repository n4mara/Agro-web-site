document.addEventListener('DOMContentLoaded', () => {
  const links = document.querySelectorAll('.main-nav .nav-link');
  const current = window.location.pathname.split('/').pop() || 'index.html';
  links.forEach(link => {
    if (link.getAttribute('href') === current) {
      link.classList.add('active');
    }
  });
});
