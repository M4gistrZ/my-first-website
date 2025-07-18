/* === ЭФФЕКТ ПЕЧАТИ НА БУКВАХ === */
document.querySelectorAll('.letter-block').forEach(block => {
  const textEl = block.querySelector('.hidden-text');
  const text = textEl.dataset.text;
  let typing = false;

  block.addEventListener('mouseenter', () => {
    if (typing) return;
    typing = true;

    textEl.innerHTML = '<span class="caret"></span>';

    setTimeout(() => {
      let i = 0;
      function typeNextLetter() {
        if (i < text.length) {
          textEl.innerHTML = text.slice(0, i + 1) + '<span class="caret"></span>';
          i++;
          setTimeout(typeNextLetter, Math.random() * 100 + 50);
        } else {
          setTimeout(() => {
            const caret = textEl.querySelector('.caret');
            if (caret) caret.classList.add('hidden');
          }, 500);
        }
      }
      typeNextLetter();
    }, 1000);
  });

  block.addEventListener('mouseleave', () => {
    typing = false;
    textEl.innerHTML = '';
  });
});

/* === СЕКРЕТНАЯ КНОПКА + МОДАЛЬНОЕ ОКНО === */
const secretButton = document.querySelector('.hidden-button');
const modal = document.getElementById('discordModal');
const closeModal = document.getElementById('closeModal');

secretButton.addEventListener('click', () => {
  modal.style.display = 'flex';
  document.body.classList.add('modal-open');
});

closeModal.addEventListener('click', () => {
  modal.style.display = 'none';
  document.body.classList.remove('modal-open');
});

modal.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.style.display = 'none';
    document.body.classList.remove('modal-open');
  }
});

/* === DISCORD АВТОРИЗАЦИЯ === 
const clientId = "ТВОЙ_DISCORD_CLIENT_ID";
const redirectUri = encodeURIComponent("https://твой-сайт.ru");
const scope = encodeURIComponent("identify");

document.getElementById('discordLogin').addEventListener('click', () => {
  const discordAuthUrl =
    `https://discord.com/oauth2/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=token&scope=${scope}`;
  window.location.href = discordAuthUrl;
});
*/

/* Защита кода уровня "школьники не найдут" */
// Запретить ПКМ
document.addEventListener('contextmenu', (e) => e.preventDefault());

// Запретить F12, Ctrl+Shift+I и др.
document.addEventListener('keydown', (e) => {
  if (e.key === "F12" || 
      (e.ctrlKey && e.shiftKey && (e.key === "I" || e.key === "C" || e.key === "J")) ||
      (e.ctrlKey && e.key === "U")) {
    e.preventDefault();
  }
});
// Запретить выделение текста
document.addEventListener('selectstart', (e) => e.preventDefault());
