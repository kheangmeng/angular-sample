import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';
import {MatCardModule} from '@angular/material/card';
import {MatButton} from '@angular/material/button';
import { PushNotificationService } from '../../shared/services/push-notification.service';

interface Notification {
  title: string;
  body: string;
  icon?: string;
  badge?: string;
  tag?: string;
  timestamp?: number;
}

@Component({
  selector: 'app-push-notification',
  standalone: true,
  imports: [CommonModule,MatCardModule,MatButton],
  templateUrl: './push-notification.html',
  styleUrl: './push-notification.css',
})
export class PushNotification implements OnInit {
  private notificationService = inject(PushNotificationService);

  notification$ = this.notificationService.notification$;
  token$ = this.notificationService.token$;
  permission$ = this.notificationService.permission$;

  notification = toSignal(this.notification$, { initialValue: null });
  token = toSignal(this.token$, { initialValue: null });
  permission = toSignal(this.permission$, { initialValue: null });
  isEnabled: boolean = false;

  ngOnInit(): void {
    this.updateNotificationStatus();

    // Subscribe to permission changes
    this.permission$.subscribe(() => {
      this.updateNotificationStatus();
    });

    // Subscribe to token changes
    this.token$.subscribe(() => {
      this.updateNotificationStatus();
    });
  }

  async enableNotifications(): Promise<void> {
    const token = await this.notificationService.requestPermissionAndGetToken();
    if (token) {
      console.log('Notifications enabled successfully');
      this.updateNotificationStatus();
    } else {
      alert('Failed to enable notifications. Please check your browser settings.');
    }
  }

  async disableNotifications(): Promise<void> {
    await this.notificationService.unsubscribe();
    this.updateNotificationStatus();
  }

  private updateNotificationStatus(): void {
    this.isEnabled = this.notificationService.isNotificationEnabled();
  }
}
