/* Transit Hub service worker: offline support for the app shell. */
const CACHE = "transit-hub-v2";
const SHELL = [
    "./", "./index.html", "./admin.html", "./style.css", "./script.js", "./fares.js",
    "./manifest.webmanifest", "./icons/icon-192.png", "./icons/icon-512.png"
];

self.addEventListener("install", e => {
    e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => {
    e.waitUntil(caches.keys()
        .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
        .then(() => self.clients.claim()));
});

self.addEventListener("fetch", e => {
    if (e.request.method !== "GET") return;
    const url = new URL(e.request.url);
    // Own files: network first so updates show up, cache as fallback when offline
    if (url.origin === location.origin) {
        e.respondWith(fetch(e.request)
            .then(res => { const copy = res.clone(); caches.open(CACHE).then(c => c.put(e.request, copy)); return res; })
            .catch(() => caches.match(e.request).then(r => r || caches.match("./index.html"))));
        return;
    }
    // CDN libraries and fonts: cache first
    e.respondWith(caches.match(e.request).then(hit => hit || fetch(e.request).then(res => {
        const copy = res.clone(); caches.open(CACHE).then(c => c.put(e.request, copy)); return res;
    })));
});