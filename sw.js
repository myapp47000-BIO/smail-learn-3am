// متفوّق 3 متوسط - Service Worker (عمل بدون إنترنت)

const CACHE_NAME = 'm3am-pwa-v3';
const ASSETS = [
    './',
    './index.html',
    './style.css',
    './app.js',
    './login.js',
    './data.js',
    './data-math.js',
    './data-arabic.js',
    './data-physics.js',
    './data-snv.js',
    './data-histgeo.js',
    './data-langs.js',
    './data-social.js',
    './data-break.js',
    './data-tri1.js',
    './data-tri2.js',
    './manifest.json',
    './icons/icon-192.png',
    './icons/icon-512.png'
];

self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(ASSETS))
            .then(() => self.skipWaiting())
    );
});

self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys()
            .then(keys => Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))))
            .then(() => self.clients.claim())
    );
});

self.addEventListener('fetch', (event) => {
    if (event.request.method !== 'GET') return;
    if (!event.request.url.startsWith('http')) return;

    // استثناء طلبات يوتيوب (يجب أن تذهب للشبكة)
    if (event.request.url.includes('youtube.com') || event.request.url.includes('googlevideo.com')) return;

    event.respondWith(
        fetch(event.request)
            .then(response => {
                const clone = response.clone();
                caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
                return response;
            })
            .catch(() => caches.match(event.request).then(res => {
                if (res) return res;
                if (event.request.headers.get('accept') &&
                    event.request.headers.get('accept').includes('text/html')) {
                    return caches.match('./index.html');
                }
                return new Response('Offline', { status: 503 });
            }))
    );
});
