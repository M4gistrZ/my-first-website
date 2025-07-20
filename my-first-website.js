/* === ЭФФЕКТ ПЕЧАТИ (фикс бага + мигание перед началом) === */
document.querySelectorAll('.letter-block').forEach(block => {
  const text = block.dataset.text;
  const textEl = block.querySelector('.hidden-text');
  let typing = false;
  let currentTimeouts = [];

  function clearTyping() {
    currentTimeouts.forEach(t => clearTimeout(t));
    currentTimeouts = [];
    typing = false;
  }

  block.addEventListener('mouseenter', () => {
    if (typing) return;
    typing = true;

    // Сначала только мигающий курсор
    textEl.innerHTML = '<span class="caret"></span>';

    let i = 0;

    function typeNextLetter() {
      if (!typing) return;

      if (i < text.length) {
        textEl.innerHTML = text.slice(0, i + 1) + '<span class="caret"></span>';
        i++;
        currentTimeouts.push(setTimeout(typeNextLetter, Math.random() * 100 + 50));
      } else {
        const caret = textEl.querySelector('.caret');
        if (caret) caret.classList.add('hidden');
      }
    }

    // ✅ 1 секунда мигания перед началом печати
    currentTimeouts.push(setTimeout(typeNextLetter, 1000));
  });

  block.addEventListener('mouseleave', () => {
    clearTyping();
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

/* === DISCORD АВТОРИЗАЦИЯ === */
const clientId = "1395739526684479538"; 
const serverUrl = "https://my-first-website-5u8b.onrender.com/";

document.getElementById('discordLogin').addEventListener('click', () => {
  const redirectUri = `${serverUrl}/auth/discord`;
  const scope = "identify";
  const discordAuthUrl = 
    `https://discord.com/oauth2/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=${scope}`;
  window.location.href = discordAuthUrl;
});

/* === ОТОБРАЖЕНИЕ АВАТАРКИ ПОСЛЕ ЛОГИНА === */
const params = new URLSearchParams(window.location.search);
const username = params.get("username");
const avatar = params.get("avatar");

if (params.get("auth") === "cancelled") {
  alert("Вы отменили авторизацию через Discord.");
}
if (username && avatar) {
  document.getElementById('modalTitle').innerText = `Привет, ${username}!`;
  document.getElementById('discordLogin').src = avatar;
  modal.style.display = 'flex';
}
