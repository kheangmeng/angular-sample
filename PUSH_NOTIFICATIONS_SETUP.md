# Push Notifications Setup with @angular/fire

This guide explains how to set up and use push notifications in your Angular application using Firebase Cloud Messaging (FCM).

## Prerequisites

- Firebase project created at [firebase.google.com](https://firebase.google.com)
- Service Worker support in your browser
- HTTPS enabled (required for service workers and notifications)

## Installation

The required packages have been added to `package.json`:

```bash
npm install
```

## Configuration

### 1. Get Firebase Credentials

1. Go to [Firebase Console](https://console.firebase.google.com)
2. Select your project
3. Go to **Project Settings** → **Service Accounts**
4. Copy your Firebase config

### 2. Update Environment Files

Update `src/environments/environment.ts` and `src/environments/environment.prod.ts`:

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000',
  firebase: {
    apiKey: 'YOUR_API_KEY',
    authDomain: 'YOUR_AUTH_DOMAIN',
    projectId: 'YOUR_PROJECT_ID',
    storageBucket: 'YOUR_STORAGE_BUCKET',
    messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
    appId: 'YOUR_APP_ID',
  }
};
```

### 3. Get VAPID Key

1. In Firebase Console, go to **Cloud Messaging** tab
2. Under **Web push certificates**, generate a new key pair or copy the existing one
3. Update `src/app/shared/services/push-notification.service.ts`:

```typescript
const token = await getToken(this.messaging, {
  vapidKey: 'YOUR_VAPID_KEY' // Paste your VAPID key here
});
```

### 4. Update Service Worker

Update `public/firebase-messaging-sw.js` with your Firebase config:

```javascript
firebase.initializeApp({
  apiKey: 'YOUR_API_KEY',
  authDomain: 'YOUR_AUTH_DOMAIN',
  projectId: 'YOUR_PROJECT_ID',
  storageBucket: 'YOUR_STORAGE_BUCKET',
  messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
  appId: 'YOUR_APP_ID',
});
```

### 5. Service Worker Registration

The service worker is registered manually in the `PushNotificationService` when the user enables notifications:

```typescript
private async registerServiceWorker(): Promise<void> {
  try {
    // Prevent duplicate registrations
    if (this.serviceWorkerRegistration) {
      console.log('Service Worker already registered:', this.serviceWorkerRegistration.scope);
      return;
    }

    // Check for existing registrations to avoid conflicts
    const registrations = await navigator.serviceWorker.getRegistrations();
    
    // Unregister old/conflicting registrations
    for (const reg of registrations) {
      if (reg.scope.includes('firebase-messaging-push-scope')) {
        await reg.unregister();
      }
    }

    // Register the service worker with proper scope
    const swPath = `${this.getBasePath()}firebase-messaging-sw.js`;
    const registration = await navigator.serviceWorker.register(swPath, {
      scope: `${this.getBasePath()}`
    });

    this.serviceWorkerRegistration = registration;
  } catch (error) {
    console.error('Service Worker registration failed:', error);
  }
}
```

**Key Features:**
- **Duplicate Prevention**: Checks if already registered to avoid multiple registrations
- **Conflict Resolution**: Automatically unregisters conflicting Firebase messaging service workers
- **GitHub Pages Support**: Automatically detects base path for subdirectory deployments (e.g., `https://username.github.io/repo-name/`)
- **Scope Management**: Registers with proper scope to prevent conflicts with other service workers

This method is called automatically when you invoke `requestPermissionAndGetToken()` in the service. The service worker file must be in the `public` folder to be accessible from the configured base path.

## Usage

### Service Worker Registration Process

The application uses **manual service worker registration** instead of the default Angular approach. Here's how it works:

1. When a user clicks "Enable Notifications" or calls `requestPermissionAndGetToken()`, the service worker registration is triggered
2. The browser downloads and registers `firebase-messaging-sw.js` from the `public` folder
3. The service worker handles background notifications when the app is closed
4. The main app handles foreground notifications through the Firebase messaging listener

### Manual Registration Benefits

- **Deferred registration**: Service worker only registers when the user consents to notifications
- **Better UX**: Avoids unnecessary service worker registration for users who won't use notifications
- **Cleaner setup**: No need to register in `main.ts` or `app.config.ts`
- **Centralized control**: All notification logic is in one service

### Using the Push Notification Component

Add the component to your application:

```typescript
import { PushNotificationComponent } from './components/push-notification/push-notification';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [PushNotificationComponent],
  template: `
    <app-push-notification></app-push-notification>
  `
})
export class AppComponent {}
```

### Using the Service Directly

```typescript
import { PushNotificationService } from './shared/services/push-notification.service';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-notification-button',
  template: `
    <button (click)="enableNotifications()">Enable Notifications</button>
  `
})
export class NotificationButtonComponent {
  private notificationService = inject(PushNotificationService);

  async enableNotifications() {
    const token = await this.notificationService.requestPermissionAndGetToken();
    if (token) {
      console.log('Notifications enabled!');
      console.log('FCM Token:', token);
    }
  }
}
```

### Subscribe to Notifications

```typescript
import { PushNotificationService } from './shared/services/push-notification.service';
import { Component, OnInit, inject } from '@angular/core';

@Component({
  selector: 'app-notification-listener',
  template: `
    <div *ngIf="notification$ | async as notification">
      <h3>{{ notification.title }}</h3>
      <p>{{ notification.body }}</p>
    </div>
  `
})
export class NotificationListenerComponent implements OnInit {
  private notificationService = inject(PushNotificationService);
  
  notification$ = this.notificationService.notification$;

  ngOnInit() {
    // Notifications will be emitted through notification$ observable
  }
}
```

## API Reference

### PushNotificationService

#### Methods

- **`requestPermissionAndGetToken(): Promise<string | null>`**
  - Requests user permission and retrieves FCM token
  - Returns the FCM token or null if denied

- **`getToken(): string | null`**
  - Returns the current FCM token

- **`getPermission(): NotificationPermission`**
  - Returns the current notification permission status ('granted', 'denied', 'default')

- **`isNotificationEnabled(): boolean`**
  - Returns true if notifications are enabled

- **`unsubscribe(): Promise<void>`**
  - Unsubscribes from notifications

#### Observables

- **`notification$: Observable<Notification | null>`**
  - Emits when a new notification is received

- **`token$: Observable<string | null>`**
  - Emits when the FCM token changes

- **`permission$: Observable<NotificationPermission>`**
  - Emits when the permission status changes

## Testing Push Notifications

### Using Firebase Console

1. Go to **Cloud Messaging** → **Send your first message**
2. Enter notification title and text
3. Click **Send test message**
4. Select the device or enter the FCM token manually

### Using cURL (Backend Example)

```bash
curl -X POST https://fcm.googleapis.com/fcm/send \
  -H "Authorization: key=YOUR_SERVER_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "to": "FCM_TOKEN_HERE",
    "notification": {
      "title": "Test Notification",
      "body": "This is a test message",
      "click_action": "https://yourdomain.com"
    }
  }'
```

## Backend Integration

To send notifications from your backend, save the FCM token when the user enables notifications:

```typescript
// In PushNotificationService, the token is sent via sendTokenToBackend()
private async sendTokenToBackend(token: string): Promise<void> {
  try {
    await this.http.post('/api/notifications/token', { token }).toPromise();
    console.log('Token sent to backend:', token);
  } catch (error) {
    console.error('Error sending token to backend:', error);
  }
}
```

Your backend can then use this token to send notifications via Firebase Admin SDK.

## Files Created/Modified

- `src/app/shared/services/push-notification.service.ts` - Main notification service
- `src/app/components/push-notification/push-notification.ts` - UI component
- `public/firebase-messaging-sw.js` - Service worker for background notifications
- `src/environments/environment.ts` - Environment configuration
- `src/environments/environment.prod.ts` - Production configuration
- `src/app/app.config.ts` - Firebase providers setup
- `package.json` - Added @angular/fire and firebase

## Troubleshooting

### Duplicate Service Worker Error
- **Problem**: Service worker gets registered multiple times or shows in DevTools with `/firebase-cloude-messaging-push-scope` and no status
- **Solution**: The fix now includes duplicate prevention and automatic cleanup
  - Checks if service worker is already registered
  - Prevents concurrent registration attempts
  - Automatically unregisters conflicting Firebase messaging workers
  - No action needed on your part - the service handles it automatically

### Service Worker not registered
- Ensure HTTPS is enabled (required for service workers)
- Check browser console for errors during registration
- Verify `firebase-messaging-sw.js` is in the `public` folder (will be served at the configured base path)
- Confirm that `requestPermissionAndGetToken()` is being called to trigger the registration
- In DevTools, go to Application → Service Workers to see registered workers
- Look for successful console message: "Service Worker registered successfully at scope: ..."

### Service Worker path issues on GitHub Pages
- The service worker path is now automatically detected from the `<base>` tag in `index.html`
- If deployed to `https://username.github.io/repo-name/`, ensure your `angular.json` has:
  ```json
  {
    "projects": {
      "angular-basic": {
        "architect": {
          "build": {
            "options": {
              "baseHref": "/repo-name/"
            }
          }
        }
      }
    }
  }
  ```
- This automatically sets the correct base path for all resources including the service worker
- For local testing, the base path defaults to `/`

### Notifications not appearing
- Check browser notification permissions (System level and browser level)
- Verify Firebase project is configured correctly
- Check browser console for Firebase Messaging errors
- Ensure VAPID key is correct in the service
- For background notifications, the service worker script must be valid and able to initialize Firebase
- Verify the service worker is actually running by checking DevTools Application → Service Workers tab

### Token not being generated
- Verify user has granted notification permission
- Check Firebase configuration is correct
- Ensure Service Worker registration completed successfully (check console logs)
- Verify notification permission is set to 'granted' status
- Clear browser cache and reload if you've updated the service worker file

## Browser Support

- Chrome 50+
- Firefox 48+
- Edge 17+
- Safari 16+ (limited support)

## Security Notes

- Never hardcode VAPID or API keys in your frontend code for production
- Use environment variables or secure backend endpoints
- Validate tokens on your backend before storing them
- Implement token refresh logic for long-lived applications

## References

- [Angular Fire Documentation](https://github.com/angular/angularfire)
- [Firebase Cloud Messaging](https://firebase.google.com/docs/cloud-messaging)
- [Web Push API](https://developer.mozilla.org/en-US/docs/Web/API/Push_API)
- [Service Workers](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)
