// Home page: hero with CTA to chat
export function renderHome() {
  document.querySelector('#app').innerHTML = `
    <div class="page page--home">
      <header class="topbar">
        <a class="logo" href="/" aria-label="Quanta inicio">
          <span class="logo__ring"></span>
          <span class="logo__text">Quanta</span>
        </a>
      </header>
      <main class="hero">
        <h1 class="hero__title">Quanta</h1>
        <p class="hero__tagline">Tu compañera de conversación con curiosidad cuántica.</p>
        <a class="cta" href="/chat">Empezar a chatear</a>
      </main>
      <nav class="navbar">
        <a href="/">Inicio</a>
        <a href="/chat">Chat</a>
        <a href="/about">Acerca de</a>
      </nav>
    </div>
  `;
}
