import { router } from './router.js';
import { setupLinkInterception } from './navigation.js';

// Wire up SPA: intercept links, handle back/forward, render initial route
setupLinkInterception();
window.addEventListener('popstate', router);
router();
