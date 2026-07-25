const CACHE_NAME="Minesweeper-Cache"
const PRECACHE_URLS = [
  '/',
  '/index.html',
  '/win7.html',
  '/win98.html',
  '/winxp.html'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_URLS);
    }).catch((e) => {});
});
