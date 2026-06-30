// About page: project description and character info
export function renderAbout() {
  document.querySelector('#app').innerHTML = `
    <div class="page page--about">
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
      <main class="aboutContent">
        <section>
          <h2>El proyecto</h2>
          <p>Quanta Chat es una SPA en JavaScript vanilla con routing vía History API
          e integración a Google Gemini mediante una Vercel Serverless Function
          que protege la API key.</p>
        </section>
        <section>
          <h2>El personaje</h2>
          <p>Quanta es una IA con mentalidad científica: precisa, concisa, directa.</p>
        </section>
      </main>
    </div>
  `;
}
