const CACHE_NAME = 'devhumayun-v2.0';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/favicon.webp',
  '/me.webp',
  '/realme.webp'
];

// Additional resources to cache dynamically
const CACHEABLE_EXTENSIONS = ['js', 'css', 'webp', 'png', 'jpg', 'jpeg', 'svg', 'woff2'];

// Install event - cache core assets
self.addEventListener('install', event => {
  self.skipWaiting(); // Force this SW to become active immediately
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch event
self.addEventListener('fetch', event => {
  // Only cache GET requests
  if (event.request.method !== 'GET') {
    return;
  }

  const url = new URL(event.request.url);

  // Strategy 1: Network First for HTML/Navigation (ensures we get latest index.html)
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then(response => {
          // Update cache with new version
          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseToCache);
          });
          return response;
        })
        .catch(() => {
          // Fallback to cache if offline
          return caches.match(event.request);
        })
    );
    return;
  }

  // Strategy 2: Cache First, then Network for static assets
  const extension = url.pathname.split('.').pop();
  if (CACHEABLE_EXTENSIONS.includes(extension)) {
    event.respondWith(
      caches.match(event.request)
        .then(response => {
          if (response) {
            return response;
          }
          return fetch(event.request).then(response => {
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            const responseToCache = response.clone();
            caches.open(CACHE_NAME).then(cache => {
              cache.put(event.request, responseToCache);
            });
            return response;
          });
        })
    );
  }
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});