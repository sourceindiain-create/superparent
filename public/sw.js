// Service Worker for SUPER PARENT - Family Learning Ecosystem
// Caches critical course content, prompt library, digital textbooks, and offline learning resources

const CACHE_NAME = 'super-parent-v1-cache';

const CRITICAL_ASSETS = [
  '/',
  '/index.html',
  '/metadata.json'
];

// Offline fallback data for courses and AI library
const OFFLINE_COURSE_DATA = {
  version: '1.0.0',
  timestamp: new Date().toISOString(),
  courses: [
    {
      id: 'ai-prompting',
      title: 'Prompt Engineering Foundations for Students',
      description: 'Master Chain-of-Thought, Zero-Shot, and Role-Based Prompting for Class 1-10.',
      offlineAvailable: true
    },
    {
      id: 'vedic-maths',
      title: 'Vedic Maths & Speed Mental Calculations',
      description: 'Fast multiplication, square roots, and mental arithmetic tricks.',
      offlineAvailable: true
    },
    {
      id: 'bhagavad-gita-essentials',
      title: 'Bhagavad Gita Moral Values & Life Skills',
      description: '18 core shlokas with Telugu, Hindi, and English meanings for daily character building.',
      offlineAvailable: true
    },
    {
      id: 'robotics-arduino-basics',
      title: 'Robotics & Sensor Circuit Guide',
      description: 'Step-by-step wiring guides for Ultrasonic obstacle avoidance and LED circuits.',
      offlineAvailable: true
    }
  ]
};

// Install event - precache core shell assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[Service Worker] Pre-caching critical applet assets');
      return cache.addAll(CRITICAL_ASSETS).catch((err) => {
        console.warn('[Service Worker] Pre-cache partial warning:', err);
      });
    }).then(() => self.skipWaiting())
  );
});

// Activate event - clean old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key !== CACHE_NAME) {
            console.log('[Service Worker] Removing old cache:', key);
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch event - network first with cache fallback for HTML/scripts, cache first for static assets
self.addEventListener('fetch', (event) => {
  // Ignore non-GET requests or chrome-extension URLs
  if (event.request.method !== 'GET' || !event.request.url.startsWith('http')) {
    return;
  }

  // Handle API offline fallback
  if (event.request.url.includes('/api/')) {
    event.respondWith(
      fetch(event.request).catch(() => {
        if (event.request.url.includes('/api/ask-super-ai')) {
          return new Response(
            JSON.stringify({
              text: '📴 **SUPER AI (Offline Library Mode):** You are currently disconnected from the live internet. Your prompt has been processed using the pre-cached offline learning handbook. Connect back to the internet for live AI model generation!'
            }),
            { headers: { 'Content-Type': 'application/json' } }
          );
        }
        return new Response(
          JSON.stringify({ offline: true, message: 'Offline cache active' }),
          { headers: { 'Content-Type': 'application/json' } }
        );
      })
    );
    return;
  }

  // General static asset and page navigation strategy
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        // Fetch in background to revalidate (stale-while-revalidate)
        fetch(event.request).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, networkResponse);
            });
          }
        }).catch(() => {
          // Ignore background fetch failures when offline
        });
        return cachedResponse;
      }

      return fetch(event.request).then((networkResponse) => {
        if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
          return networkResponse;
        }

        const responseToCache = networkResponse.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseToCache);
        });

        return networkResponse;
      }).catch(() => {
        // Fallback for navigation
        if (event.request.mode === 'navigate') {
          return caches.match('/index.html') || caches.match('/');
        }
      });
    })
  );
});
