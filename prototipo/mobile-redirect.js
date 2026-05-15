// mobile-redirect.js — Si el usuario está en móvil (≤760px) y carga una página
// con versión móvil dedicada, redirige automáticamente. Para páginas que ya
// son responsive (blog, producto, lista), no redirige.
(function() {
  if (typeof window === 'undefined') return;
  const isMobile = window.matchMedia('(max-width: 760px)').matches;
  if (!isMobile) return;

  const path = window.location.pathname;
  const search = window.location.search;
  const hash = window.location.hash;
  const file = path.split('/').pop();

  const map = {
    'index.html': 'mobile.html',
    '': 'mobile.html',
    'quienes-somos.html': 'mobile-quienes.html',
  };

  if (file in map && map[file] !== file) {
    window.location.replace(map[file] + search + hash);
  }
})();
