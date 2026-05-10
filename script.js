const vikno = document.getElementById('vikno_overlay');
const overlay = vikno;

const hreshchyk = document.querySelector('.modal-hreshchyk');
const menuBtn = document.querySelector('.menu_item[data-modal="about"]');

menuBtn.addEventListener('click', function(e) {
  e.preventDefault();
  vikno.classList.add('active');
});

vikno.addEventListener('click', function(e) {
  if (e.target === overlay) {
    overlay.classList.remove('active');
  }
});

hreshchyk.addEventListener('click', function() {
  vikno.classList.remove('active');
});

document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    overlay.classList.remove('active');
  }
});
