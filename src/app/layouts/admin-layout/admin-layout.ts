import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AdminToolbar } from '@components/admin-toolbar/admin-toolbar';
import { AdminDrawer } from '@components/admin-drawer/admin-drawer';

@Component({
  selector: 'app-admin-layout',
  imports: [RouterOutlet, AdminToolbar, AdminDrawer],
  templateUrl: './admin-layout.html',
  styleUrl: './admin-layout.css'
})
export class AdminLayout {
  currentYear: number = new Date().getFullYear();
}
