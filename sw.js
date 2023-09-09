/*
self.addEventListener("fetch", event => {
  console.log('WORKER: Fetching', event.request);
});
*/

// This is the "Offline copy of pages" service worker
const CACHE = "pwabuilder-offline";
importScripts('https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js');
self.addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});
workbox.routing.registerRoute(
  new RegExp('/*'),
  new workbox.strategies.StaleWhileRevalidate({
    cacheName: CACHE
  })
);

//
// To be installable
//
const CACHE_NAME = 'cool-cache';
// Add whichever assets you want to pre-cache here:
const PRECACHE_ASSETS = [
    '/assets/',
    '/src/'
]
// Listener for the install event - pre-caches our assets list on service worker install.
self.addEventListener('install', event => {
    event.waitUntil((async () => {
        const cache = await caches.open(CACHE_NAME);
        cache.addAll(PRECACHE_ASSETS);
    })());
});
