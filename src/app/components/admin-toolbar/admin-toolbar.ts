import {Component} from '@angular/core';
import {MatBadgeModule} from '@angular/material/badge';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatToolbarModule} from '@angular/material/toolbar';
import { LanguageToggleComponent } from '../../components/language-toggle/language-toggle';

@Component({
  selector: 'admin-toolbar',
  templateUrl: 'admin-toolbar.html',
  styleUrl: 'admin-toolbar.css',
  standalone: true,
  imports: [MatBadgeModule, MatToolbarModule, MatMenuModule, MatIconModule, LanguageToggleComponent],
})
export class AdminToolbar {}
