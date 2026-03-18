const CACHE_NAME = 'adivina-palabra-v2';
const archivosParaCachear = [
  './',
  './index.html',
  './manifest.json',
  './icono.png'
];

self.addEventListener('install', evento => {
  evento.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(archivosParaCachear);
      })
  );
});

self.addEventListener('fetch', evento => {
  evento.respondWith(
    caches.match(evento.request)
      .then(respuesta => {
        return respuesta || fetch(evento.request);
      })
  );
});

// Esto ayuda a borrar la memoria vieja del juego de números
self.addEventListener('activate', evento => {
  evento.waitUntil(
    caches.keys().then(nombresCache => {
      return Promise.all(
        nombresCache.map(nombre => {
          if (nombre !== CACHE_NAME) {
            return caches.delete(nombre);
          }
        })
      );
    })
  );
});