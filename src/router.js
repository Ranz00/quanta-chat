import { renderHome } from './views/home.js';
import { renderChat } from './views/chat.js';
import { renderAbout } from './views/about.js';
import { renderNotFound } from './views/notFound.js';

// Route table: path → render function
const routes = {
  '/': renderHome,
  '/chat': renderChat,
  '/about': renderAbout,
};

// Match current path and render
export function router() {
  const path = window.location.pathname;
  const render = routes[path] || renderNotFound;
  render();
}

// Push state and re-render
export function navigateTo(path) {
  history.pushState(null, '', path);
  router();
}
