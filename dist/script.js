const body = document.body;
const themeButton = document.querySelector('.theme-toggle');
const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.site-nav');
const themeMeta = document.querySelector('meta[name="theme-color"]');

function setTheme(theme) {
  const isLight = theme === 'light';
  body.classList.toggle('light-theme', isLight);
  themeButton.setAttribute('aria-label', isLight ? 'Ativar tema escuro' : 'Ativar tema claro');
  themeMeta.setAttribute('content', isLight ? '#f4f4ed' : '#111310');
}

let savedTheme = null;
try { savedTheme = localStorage.getItem('vitor-portfolio-theme'); } catch (_) { /* armazenamento pode estar indisponível */ }
setTheme(savedTheme || (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark'));

themeButton.addEventListener('click', () => {
  const nextTheme = body.classList.contains('light-theme') ? 'dark' : 'light';
  setTheme(nextTheme);
  try { localStorage.setItem('vitor-portfolio-theme', nextTheme); } catch (_) { /* tema segue funcional sem persistência */ }
});

menuButton.addEventListener('click', () => {
  const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Abrir menu' : 'Fechar menu');
  nav.classList.toggle('is-open', !isOpen);
});

nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  nav.classList.remove('is-open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.setAttribute('aria-label', 'Abrir menu');
}));

document.querySelector('#current-year').textContent = new Date().getFullYear();

document.querySelectorAll('#send-email, #hero-email').forEach((emailLink) => {
  const feedback = document.querySelector(emailLink.id === 'hero-email' ? '#hero-email-feedback' : '#email-feedback');
  emailLink.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText('vitor.luiz.paz@live.com');
      feedback.textContent = 'Se o aplicativo de e-mail não abrir, o endereço foi copiado.';
    } catch (_) {
      feedback.textContent = 'E-mail: vitor.luiz.paz@live.com';
    }
  });
});
