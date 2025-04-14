
const overlay = document.getElementById('tuoverlay');
const closeBtn = document.getElementById('tucloseOverlayBtn');
const closeBtnX = document.getElementById('tucloseOverlayBtnX');

function showOverlayRequest() {
  overlay.style.display = 'flex';
}

closeBtn.addEventListener('click', (e) => {
  e.preventDefault();
  overlay.style.display = 'none';
});

closeBtnX.addEventListener('click', (e) => {
  e.preventDefault();
  overlay.style.display = 'none';
});

