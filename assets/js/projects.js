// Simple client-side filtering for Projects
document.addEventListener('DOMContentLoaded', () => {
  const grid = document.getElementById('projectGrid');
  if (!grid) return;
  const cards = Array.from(grid.querySelectorAll('.card'));
  const chips = Array.from(document.querySelectorAll('.filters .chip'));

  const setActive = (btn) => {
    chips.forEach(c => c.classList.remove('active'));
    btn.classList.add('active');
  };

  const applyFilter = (filter) => {
    cards.forEach(card => {
      const tags = card.dataset.tags || '';
      const show = filter === 'all' || tags.split(/\s+/).includes(filter);
      card.style.display = show ? '' : 'none';
    });
  };

  chips.forEach(btn => {
    btn.addEventListener('click', () => {
      setActive(btn);
      applyFilter(btn.dataset.filter);
    });
  });
});
