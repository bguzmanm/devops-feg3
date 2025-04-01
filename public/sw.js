const CACHE_NAME = "cache-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/icons/ico-128x128.png",
  "/icons/ico-512x512.png",
];

self.addEventListener("install", (event) => {
  console.log("Service Worker installing.");

  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Cache abierto.");
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("activate", () => {
  console.log("Service Worker activating.");
});
// cache first
// self.addEventListener("fetch", (event) => {
//   event.respondWith(
//     caches.match(event.request).then((response) => {
//       console.log(
//         response ? "desde el cache " : "desde la red",
//         event.request.url
//       );
//       return response || fetch(event.request);
//     })
//   );
// });

// network first
self.addEventListener("fetch", (event) => {
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        console.log("desde la red", event.request.url);
        return caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, response.clone());
          return response;
        });
      })
      .catch(() => {
        console.log("desde el cache", event.request.url);
        return caches.match(event.request);
      })
  );
});
