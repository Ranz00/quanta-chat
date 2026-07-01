import { appendUserMessage, appendAssistantMessage, getTrimmedHistory } from '../utils.js';

// Messages and history persist across navigations (module scope)
const messages = [
  { role: 'character', text: '¡Hola! Soy Quanta. ¿Sobre qué querés hablar hoy?' },
];
let history = [];

export function renderChat() {
  document.querySelector('#app').innerHTML = `
    <div class="chatApp">
      <header class="topbar">
        <a class="logo logo--sm" href="/">
          <span class="logo__icon">
            <span class="logo__fin logo__fin--l"></span>
            <span class="logo__fin logo__fin--r"></span>
            <span class="logo__orb"></span>
          </span>
          <span class="logo__text">Quanta Chat</span>
        </a>
        <nav class="topbar__nav">
          <a href="/">Inicio</a>
          <a href="/chat">Chat</a>
          <a href="/about">About</a>
        </nav>
      </header>
      <main class="chatMessages" id="chatMessages" aria-label="Mensajes"></main>
      <form class="chatComposer" id="chatComposer">
        <input class="chatInput" id="chatInput" type="text" placeholder="Escribí tu mensaje…" aria-label="Escribí tu mensaje" />
        <button class="chatSend" type="submit">Enviar</button>
      </form>
    </div>
  `;
  renderMessages();
  setupChatHandlers();
}

// Render messages to DOM
function renderMessages() {
  const c = document.querySelector('#chatMessages');
  c.innerHTML = messages.map(m => `<div class="message message--${m.role}">${m.text}</div>`).join('');
  c.scrollTop = c.scrollHeight;
}

// Fetch from /api/chat, loading "pensando…", error visible en chat
function setupChatHandlers() {
  const form = document.querySelector('#chatComposer');
  const input = document.querySelector('#chatInput');
  const btn = form.querySelector('.chatSend');
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const text = input.value.trim();
    if (!text) return;
    // Add user message to display and history
    messages.push({ role: 'user', text });
    history = appendUserMessage(history, text);
    input.value = '';
    renderMessages();

    // Disable inputs during fetch
    btn.disabled = true;
    input.disabled = true;

    // Show thinking indicator
    messages.push({ role: 'character', text: 'Quanta está pensando…', thinking: true });
    renderMessages();

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, history: getTrimmedHistory(history) }),
      });

      // Remove thinking indicator before adding response
      const thinkingIdx = messages.findIndex((m) => m.thinking);
      if (thinkingIdx !== -1) messages.splice(thinkingIdx, 1);

      // Add error or success message
      if (!res.ok) {
        messages.push({ role: 'character', text: 'Error: no se pudo obtener respuesta del servidor.' });
      } else {
        const data = await res.json();
        messages.push({ role: 'character', text: data.reply });
        history = appendAssistantMessage(history, data.reply);
      }
    } catch {
      const thinkingIdx = messages.findIndex((m) => m.thinking);
      if (thinkingIdx !== -1) messages.splice(thinkingIdx, 1);
      messages.push({ role: 'character', text: 'Error de conexión. Verificá tu red.' });
    } finally {
      // Re-enable inputs and re-render
      btn.disabled = false;
      input.disabled = false;
      input.focus();
      renderMessages();
    }
  });
}
