// 404 page for unmatched routes
export function renderNotFound() {
  document.querySelector('#app').innerHTML = `
    <div class="page page--notfound">
      <h1>404</h1>
      <p>Esa ruta no existe.</p>
      <a href="/">Volver al inicio</a>
    </div>
  `;
}
