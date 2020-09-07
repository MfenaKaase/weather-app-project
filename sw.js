const cacheName = 'cache-v0';
const resourcesToPrecache = [
    './',
    './index.html',
    './style.css',
    './main.js',
    './img/day.svg',
    './img/night.svg',
    "./img/weather-overcast.svg",
    './icons/cloud.png',
    './icons/cloud1.png',
    './manifest.webmanifest'
];


self.addEventListener('install', event => {
    console.log('Install event!');
    event.waitUntil(
        caches.open(cacheName)
        .then(cache => {
            console.log('caching!')
            return cache.addAll(resourcesToPrecache);
        })
    );
});

self.addEventListener('activate', event => {
    console.log('Activate event!')
});

self.addEventListener('fetch', event => {
    console.log('Fetch event!');
    const {request} = event;
    const findResponsePromise = caches.open(cacheName)
    .then(cache => cache.match(request))
    .then(response => {
        if (response) {
            return response;
        }

        return fetch(request);
    });

    event.respondWith(findResponsePromise);
});
