import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage, Messaging } from 'firebase/messaging';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

interface Notification {
  title: string;
  body: string;
  icon?: string;
  badge?: string;
  tag?: string;
  timestamp?: number;
}

@Injectable({
  providedIn: 'root'
})
export class PushNotificationService {
  private messaging: Messaging | null = null;
  private notificationSubject = new BehaviorSubject<Notification | null>(null);
  private tokenSubject = new BehaviorSubject<string | null>(null);
  private permissionSubject = new BehaviorSubject<NotificationPermission>('default');
  private serviceWorkerRegistration: ServiceWorkerRegistration | null = null;
  private isServiceWorkerRegistering: boolean = false;

  notification$: Observable<Notification | null> = this.notificationSubject.asObservable();
  token$: Observable<string | null> = this.tokenSubject.asObservable();
  permission$: Observable<NotificationPermission> = this.permissionSubject.asObservable();

  constructor() {
    this.initializeFirebase();
    this.initializeMessaging();
  }

  /**
   * Initialize Firebase
   */
  private initializeFirebase(): void {
    try {
      initializeApp(environment.firebase);
    } catch (error) {
      console.warn('Firebase already initialized or initialization error:', error);
    }
  }

  /**
   * Initialize Firebase Messaging and set up listeners
   */
  private initializeMessaging(): void {
    if (!('serviceWorker' in navigator)) {
      console.warn('Service Workers are not supported in this browser');
      return;
    }

    try {
      this.messaging = getMessaging();

      // Update permission status
      this.permissionSubject.next(Notification.permission);

      // Listen for messages when the app is in the foreground
      onMessage(this.messaging, (payload) => {
        console.log('Message received in foreground:', payload);

        const notification: Notification = {
          title: payload.notification?.title || 'Notification',
          body: payload.notification?.body || '',
          icon: payload.notification?.icon,
          // badge: payload.notification?.badge,
          tag: payload.data?.['tag'] || 'app-notification',
          timestamp: Date.now()
        };

        this.notificationSubject.next(notification);

        // Show a browser notification even when the app is open
        if (Notification.permission === 'granted') {
          this.showBrowserNotification(notification);
        }
      });
    } catch (error) {
      console.warn('Firebase Messaging not available:', error);
    }
  }

  /**
   * Request permission and get FCM token
   */
  async requestPermissionAndGetToken(): Promise<string | null> {
    try {
      if (!this.messaging) {
        console.error('Firebase Messaging not initialized');
        return null;
      }

      // Request notification permission
      const permission = await Notification.requestPermission();
      this.permissionSubject.next(permission);

      if (permission !== 'granted') {
        console.log('Notification permission denied');
        return null;
      }

      // Register Service Worker
      await this.registerServiceWorker();

      // Get FCM token
      const token = await getToken(this.messaging, {
        vapidKey: 'BNSV2DvPsrNblkgChinb112a7rGz-w5jtupXhiGKlGcs4NGp9BBzhNWXseKP-oxPoSxPwxDucnjlOaKpioDISqE',
      });

      this.tokenSubject.next(token);
      console.log('FCM Token:', token);

      // Save token to your backend
      await this.sendTokenToBackend(token);

      return token;
    } catch (error) {
      console.error('Error getting FCM token:', error);
      return null;
    }
  }

  private async registerServiceWorker(): Promise<void> {
    try {
      // Prevent duplicate registrations
      if (this.serviceWorkerRegistration) {
        console.log('Service Worker already registered:', this.serviceWorkerRegistration.scope);
        return;
      }

      // Prevent concurrent registration attempts
      if (this.isServiceWorkerRegistering) {
        console.log('Service Worker registration already in progress');
        return;
      }

      this.isServiceWorkerRegistering = true;

      // Check for existing registrations to avoid conflicts
      const registrations = await navigator.serviceWorker.getRegistrations();
      console.log('Existing service worker registrations:', registrations.length);

      for (const reg of registrations) {
        console.log('Found existing SW registration at scope:', reg.scope);
        // Unregister old/conflicting registrations if they're not the firebase messaging one
        if (reg.scope.includes('firebase-messaging-push-scope')) {
          try {
            await reg.unregister();
            console.log('Unregistered old firebase messaging service worker');
          } catch (err) {
            console.warn('Failed to unregister old service worker:', err);
          }
        }
      }

      // Register the service worker
      // For GitHub Pages, the path might be under a subdirectory
      const swPath = `${this.getBasePath()}firebase-messaging-sw.js`;
      console.log('Registering service worker from:', swPath);

      const registration = await navigator.serviceWorker.register(swPath, {
        scope: `${this.getBasePath()}`
      });

      this.serviceWorkerRegistration = registration;
      console.log('Service Worker registered successfully at scope:', registration.scope);
    } catch (error) {
      console.error('Service Worker registration failed:', error);
      this.serviceWorkerRegistration = null;
    } finally {
      this.isServiceWorkerRegistering = false;
    }
  }

  /**
   * Get the base path for the application
   * Handles both root path (/) and subdirectory paths (e.g., /repo-name/)
   */
  private getBasePath(): string {
    // Get the base path from the document
    const baseElement = document.querySelector('base');
    if (baseElement && baseElement.href) {
      const url = new URL(baseElement.href);
      return url.pathname.endsWith('/') ? url.pathname : url.pathname + '/';
    }
    return '/';
  }

  private async sendTokenToBackend(token: string): Promise<void> {
    try {
      // Example: Send token to your backend
      // await this.http.post('/api/notifications/token', { token }).toPromise();
      console.log('Token sent to backend:', token);
    } catch (error) {
      console.error('Error sending token to backend:', error);
    }
  }

  private showBrowserNotification(notification: Notification): void {
    if ('serviceWorker' in navigator && 'Notification' in window) {
      navigator.serviceWorker.ready.then((registration) => {
        registration.showNotification(notification.title, {
          body: notification.body,
          icon: notification.icon || 'https://placehold.co/600x400/ff5290/ffffff?font=playfair-display&text=NG%20Icon',
          badge: notification.badge || 'https://placehold.co/600x400/ff5290/ffffff?font=playfair-display&text=NG%20Badge',
          tag: notification.tag,
          requireInteraction: false,
          data: { timestamp: notification.timestamp }
        });
      });
    }
  }

  getToken(): string | null {
    return this.tokenSubject.value;
  }

  getPermission(): NotificationPermission {
    return this.permissionSubject.value;
  }

  async unsubscribe(): Promise<void> {
    try {
      const token = this.tokenSubject.value;
      if (token) {
        // Notify backend to remove token
        console.log('Unsubscribing from notifications');
        this.tokenSubject.next(null);
      }
    } catch (error) {
      console.error('Error unsubscribing:', error);
    }
  }

  isNotificationEnabled(): boolean {
    return Notification.permission === 'granted' && this.tokenSubject.value !== null;
  }
}
