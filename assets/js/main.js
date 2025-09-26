const body = document.body;
const themeToggle = document.querySelector('.theme-toggle');
const navLinks = document.querySelectorAll('.navigation__links a');
const mobileMenuButton = document.querySelector('.navigation__menu');
const mobileNav = document.querySelector('.mobile-nav');
const mobileLinks = document.querySelectorAll('.mobile-nav a');
const yearEl = document.getElementById('year');

const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
const savedTheme = localStorage.getItem('theme');

if (savedTheme) {
  body.setAttribute('data-theme', savedTheme);
} else if (!prefersDark.matches) {
  body.setAttribute('data-theme', 'light');
}

prefersDark.addEventListener('change', (event) => {
  if (!localStorage.getItem('theme')) {
    body.setAttribute('data-theme', event.matches ? 'dark' : 'light');
  }
});

themeToggle?.addEventListener('click', () => {
  const currentTheme = body.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
  body.setAttribute('data-theme', currentTheme);
  localStorage.setItem('theme', currentTheme);
  themeToggle.classList.add('theme-toggle--active');
  setTimeout(() => themeToggle.classList.remove('theme-toggle--active'), 500);
});

const closeMobileNav = () => {
  mobileNav?.classList.remove('is-open');
  mobileMenuButton?.setAttribute('aria-expanded', 'false');
};

mobileMenuButton?.addEventListener('click', () => {
  const isOpen = mobileNav?.classList.toggle('is-open');
  mobileMenuButton.setAttribute('aria-expanded', String(Boolean(isOpen)));
});

mobileLinks.forEach((link) =>
  link.addEventListener('click', () => {
    closeMobileNav();
  })
);

document.addEventListener('click', (event) => {
  if (
    mobileNav &&
    mobileMenuButton &&
    !mobileNav.contains(event.target) &&
    !mobileMenuButton.contains(event.target)
  ) {
    closeMobileNav();
  }
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      const id = entry.target.getAttribute('id');
      if (entry.isIntersecting && id) {
        navLinks.forEach((link) => {
          const isActive = link.getAttribute('href') === `#${id}`;
          link.classList.toggle('active', isActive);
        });
        mobileLinks.forEach((link) => {
          const isActive = link.getAttribute('href') === `#${id}`;
          link.classList.toggle('active', isActive);
        });
      }
    });
  },
  { rootMargin: '-50% 0px -45% 0px' }
);

document.querySelectorAll('section[id]').forEach((section) => observer.observe(section));

yearEl.textContent = new Date().getFullYear();
