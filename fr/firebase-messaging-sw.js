importScripts('https://www.gstatic.com/firebasejs/10.7.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.7.0/firebase-messaging-compat.js');

// Initialize Firebase in Service Worker
// Note: You need to initialize Firebase here with your config
firebase.initializeApp({
  apiKey: 'AIzaSyDq7dG8geDaLUO7a7o4x7JgABONam03bE4',
  authDomain: 'about-firebase.firebaseapp.com',
  projectId: 'about-firebase',
  storageBucket: 'about-firebase.firebasestorage.app',
  messagingSenderId: '437896780302',
  appId: '1:437896780302:web:492424b3f1c48c3414ba5f',
});

const messaging = firebase.messaging();

// Handle background messages
messaging.onBackgroundMessage((payload) => {
  console.log('Background message received:', payload);

  const notificationTitle = payload.notification.title || 'App Notification';
  const notificationOptions = {
    body: payload.notification.body || '',
    icon: payload.notification.icon || 'https://placehold.co/600x400/ff5290/ffffff?font=playfair-display&text=NG%20Icon',
    badge: payload.notification.badge || 'https://placehold.co/600x400/ff5290/ffffff?font=playfair-display&text=NG%20Badge',
    tag: payload.data.tag || 'app-notification',
    requireInteraction: false,
    data: payload.data || {}
  };

  return self.registration.showNotification(notificationTitle, notificationOptions);
});

// Handle notification clicks
self.addEventListener('push', (event) => {
  console.log('Push notification received in service worker:', event);
});

// Handle notification click
self.addEventListener('notificationclick', (event) => {
  console.log('Notification clicked:', event.notification);
  event.notification.close();

  // Handle different actions
  const urlToOpen = event.notification.data.link || '/';

  event.waitUntil(
    clients.matchAll({ type: 'window', includeUncontrolled: true })
      .then((clientList) => {
        // Check if there's already a window/tab open with the target URL
        for (let i = 0; i < clientList.length; i++) {
          const client = clientList[i];
          if (client.url === urlToOpen && 'focus' in client) {
            return client.focus();
          }
        }
        // If not, open a new window/tab with the target URL
        if (clients.openWindow) {
          return clients.openWindow(urlToOpen);
        }
      })
  );
});

// Handle notification close
self.addEventListener('notificationclose', (event) => {
  console.log('Notification closed:', event.notification);
});
