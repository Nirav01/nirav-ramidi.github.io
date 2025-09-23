// Year in footer
document.addEventListener('DOMContentLoaded', () => {
  const year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();
});

// Dark mode toggle (persisted)
(() => {
  const btn = document.querySelector('.theme-toggle');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const stored = localStorage.getItem('theme') || (prefersDark ? 'dark' : 'light');
  document.documentElement.dataset.theme = stored;
  if (btn) {
    btn.addEventListener('click', () => {
      const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
      document.documentElement.dataset.theme = next;
      localStorage.setItem('theme', next);
    });
  }
})();
