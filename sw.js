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
    }).catch((e) => {
      throw new Error("エラー0: " + e.message);
    });
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        return cachedResponse
      }
      return fetch(event.request).then((networkResponse) => {
        return caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, networkResponse.clone());
          return networkResponse;
        }).catch((e) => {
          throw new Error("エラー1: " + e.message);
        });
      }).catch((e) => {
        throw new Error("エラー2: " + e.message);
      });
　　　}).catch((e) => {
      throw new Error("エラー3: " + e.message);
    });
});
