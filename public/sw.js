const CACHE_NAME = 'devhumayun-v1.1';
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
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch event - serve cached content when offline
self.addEventListener('fetch', event => {
  // Only cache GET requests
  if (event.request.method !== 'GET') {
    return;
  }

  // Check if request is for a cacheable resource
  const url = new URL(event.request.url);
  const extension = url.pathname.split('.').pop();
  
  if (CACHEABLE_EXTENSIONS.includes(extension) || url.origin === self.location.origin) {
    event.respondWith(
      caches.match(event.request)
        .then(response => {
          // Return cached version or fetch from network
          if (response) {
            return response;
          }
          
          // Clone the request because it's a stream and can only be consumed once
          const fetchRequest = event.request.clone();
          
          return fetch(fetchRequest).then(response => {
            // Check if we received a valid response
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }
            
            // Clone the response because it's a stream and can only be consumed once
            const responseToCache = response.clone();
            
            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
              });
              
            return response;
          });
        })
        .catch(() => {
          // If both cache and network fail, and it's a navigation request, return the offline page
          if (event.request.mode === 'navigate') {
            return caches.match('/index.html');
          }
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