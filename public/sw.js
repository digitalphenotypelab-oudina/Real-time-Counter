self.addEventListener('install', (e) => {
  console.log('App prête à être installée !');
});

self.addEventListener('fetch', (e) => {
  // Ce code permet à l'app de fonctionner même avec une connexion instable
  e.respondWith(fetch(e.request));
});
