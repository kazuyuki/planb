/*
self.addEventListener("install", event => {
  console.log('WORKER: Install', event.request);
});
self.addEventListener("activate", event => {
  console.log('WORKER: Activate', event.request);
});
self.addEventListener("fetch", event => {
  console.log('WORKER: Fetch', event.request);
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

