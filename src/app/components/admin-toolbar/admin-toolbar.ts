import {Component} from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatToolbarModule} from '@angular/material/toolbar';

@Component({
  selector: 'admin-toolbar',
  templateUrl: 'admin-toolbar.html',
  styleUrl: 'admin-toolbar.css',
  standalone: true,
  imports: [MatToolbarModule, MatMenuModule, MatIconModule],
})
export class AdminToolbar {}
