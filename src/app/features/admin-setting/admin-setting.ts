import { Component } from '@angular/core';
import { ArrangeMenu } from '../../components/arrange-menu/arrange-menu';
import { PushNotification } from '../../components/push-notification/push-notification';

@Component({
  selector: 'app-admin-setting',
  imports: [ArrangeMenu, PushNotification],
  templateUrl: './admin-setting.html',
  styleUrl: './admin-setting.css'
})
export class AdminSetting {}
