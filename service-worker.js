// Name of the cache
const CACHE_NAME = 'jarvis-cache-v1';
// Files to cache
const urlsToCache = [
    '/',
    '/index.html',
    '/manifest.json',
    '/service-worker.js',
    '/styles.css', // Add your CSS file path
    '/script.js',  // Add your JavaScript file path
    '/d',
    '/icon-512x512.png'
];

// Install event - caching the resources
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
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // Return the cached resource if found, otherwise fetch from network
                return response || fetch(event.request);
            })
    );
});

// Activate event - update the cache when files change
self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (!cacheWhitelist.includes(cacheName)) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
