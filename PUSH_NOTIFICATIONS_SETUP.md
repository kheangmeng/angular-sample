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

## Usage

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

### Service Worker not registered
- Ensure HTTPS is enabled
- Check browser console for errors
- Verify `firebase-messaging-sw.js` is in the `public` folder

### Notifications not appearing
- Check browser notification permissions
- Verify Firebase project is configured correctly
- Check `firebase-messaging-sw.js` is properly registered
- Ensure VAPID key is correct

### Token not being generated
- Verify user has granted notification permission
- Check Firebase configuration is correct
- Ensure Service Worker registration was successful

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
