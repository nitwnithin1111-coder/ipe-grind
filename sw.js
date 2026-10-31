const CACHE_NAME = 'ipe-grind-v10';
const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './manifest.json',
  './css/style.css',
  './css/themes.css',
  './js/app.js',
  './js/feed.js',
  './js/flashcards.js',
  './js/ai.js',
  './js/quiz.js',
  './js/storage.js',
  './js/gamification.js',
  './js/speech.js',
  './js/countdown.js',
  './js/ambient_audio.js',
  './js/commute.js',
  './js/simulators.js',
  './js/mock_exam.js',
  './data/manifest.js',
  './data/physics/ch01-waves.js',
  './data/physics/ch02-ray-optics.js',
  './data/physics/ch03-wave-optics.js',
  './data/physics/ch04-electric-charges.js',
  './data/physics/ch05-potential-capacitance.js',
  './data/physics/ch06-current-electricity.js',
  './data/physics/ch07-moving-charges.js',
  './data/physics/ch08-magnetism-matter.js',
  './data/physics/ch09-induction.js',
  './data/physics/ch10-ac.js',
  './data/physics/ch11-em-waves.js',
  './data/physics/ch12-dual-nature.js',
  './data/physics/ch13-atoms.js',
  './data/physics/ch14-nuclei.js',
  './data/physics/ch15-semiconductors.js',
  './data/physics/ch16-communication.js',
  './data/chemistry/ch01-solid-state.js',
  './data/chemistry/ch02-solutions.js',
  './data/chemistry/ch03-electrochemistry.js',
  './data/chemistry/ch04-chemical-kinetics.js',
  './data/chemistry/ch05-surface-chemistry.js',
  './data/chemistry/ch06-metallurgy.js',
  './data/chemistry/ch07-p-block.js',
  './data/chemistry/ch08-df-block.js',
  './data/chemistry/ch09-coordination.js',
  './data/chemistry/ch10-haloalkanes.js',
  './data/chemistry/ch11-oxygen-organics.js',
  './data/chemistry/ch12-amines.js',
  './data/chemistry/ch13-biomolecules.js',
  './data/chemistry/ch14-polymers.js',
  './data/chemistry/ch15-everyday-life.js',
  './assets/icon.svg',
  './assets/icon-192.png',
  './assets/icon-512.png',
  './assets/katex/katex.min.css',
  './assets/katex/katex.min.js',
  './assets/katex/auto-render.min.js',
  './assets/katex/fonts/KaTeX_AMS-Regular.woff2',
  './assets/katex/fonts/KaTeX_Caligraphic-Bold.woff2',
  './assets/katex/fonts/KaTeX_Caligraphic-Regular.woff2',
  './assets/katex/fonts/KaTeX_Fraktur-Bold.woff2',
  './assets/katex/fonts/KaTeX_Fraktur-Regular.woff2',
  './assets/katex/fonts/KaTeX_Main-Bold.woff2',
  './assets/katex/fonts/KaTeX_Main-BoldItalic.woff2',
  './assets/katex/fonts/KaTeX_Main-Italic.woff2',
  './assets/katex/fonts/KaTeX_Main-Regular.woff2',
  './assets/katex/fonts/KaTeX_Math-BoldItalic.woff2',
  './assets/katex/fonts/KaTeX_Math-Italic.woff2',
  './assets/katex/fonts/KaTeX_SansSerif-Bold.woff2',
  './assets/katex/fonts/KaTeX_SansSerif-Italic.woff2',
  './assets/katex/fonts/KaTeX_SansSerif-Regular.woff2',
  './assets/katex/fonts/KaTeX_Script-Regular.woff2',
  './assets/katex/fonts/KaTeX_Size1-Regular.woff2',
  './assets/katex/fonts/KaTeX_Size2-Regular.woff2',
  './assets/katex/fonts/KaTeX_Size3-Regular.woff2',
  './assets/katex/fonts/KaTeX_Size4-Regular.woff2',
  './assets/katex/fonts/KaTeX_Typewriter-Regular.woff2'
];

self.addEventListener('install', (event) => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return Promise.allSettled(
        ASSETS_TO_CACHE.map((url) => {
          return cache.add(url).catch((err) => {
            console.warn('[SW] Precache skipped for:', url, err);
          });
        })
      );
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;

  const url = new URL(event.request.url);

  // For static local assets (JS, CSS, WOFF2, PNG, SVG), serve from Cache first for 0 lag and 100% offline
  const isStatic = url.pathname.endsWith('.js') ||
                   url.pathname.endsWith('.css') ||
                   url.pathname.endsWith('.woff2') ||
                   url.pathname.endsWith('.png') ||
                   url.pathname.endsWith('.svg') ||
                   url.pathname.endsWith('.json');

  if (isStatic) {
    event.respondWith(
      caches.match(event.request, { ignoreSearch: true }).then((cachedResponse) => {
        if (cachedResponse) {
          // In background, fetch fresh copy if online to keep cache up to date
          fetch(event.request).then((networkResponse) => {
            if (networkResponse && networkResponse.status === 200) {
              caches.open(CACHE_NAME).then((cache) => {
                cache.put(event.request, networkResponse);
              });
            }
          }).catch(() => {/* Offline, ignore */});
          return cachedResponse;
        }
        return fetch(event.request).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const copy = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, copy);
            });
          }
          return networkResponse;
        });
      })
    );
    return;
  }

  // Network-First for HTML navigation so updates reach clients, falling back to cache when offline
  event.respondWith(
    fetch(event.request)
      .then((networkResponse) => {
        if (networkResponse && networkResponse.status === 200) {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseToCache);
          });
        }
        return networkResponse;
      })
      .catch(() => {
        return caches.match(event.request, { ignoreSearch: true }).then((cachedResponse) => {
          if (cachedResponse) return cachedResponse;
          if (event.request.mode === 'navigate') {
            return caches.match('./index.html', { ignoreSearch: true });
          }
        });
      })
  );
});
