// Home page: hero with CTA to chat
export function renderHome() {
  document.querySelector('#app').innerHTML = `
    <div class="page page--home">
      <header class="topbar">
        <a class="logo" href="/" aria-label="Quanta inicio">
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
      <main class="hero">
        <h1 class="hero__title">Quanta</h1>
        <p class="hero__tagline">Tu compañera de conversación con curiosidad cuántica.</p>
        <a class="cta" href="/chat">Empezar a chatear</a>
      </main>
    </div>
  `;
}
