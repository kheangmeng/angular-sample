import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService, Theme } from './theme.service';

@Component({
  selector: 'app-theme-toggle',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h3>State Management (BehaviorSubject)</h3>
    <p>Current theme is: <strong>{{ themeService.theme$ | async }}</strong></p>
    <button (click)="setTheme('light')" class="btn btn-light">Light</button>
    <button (click)="setTheme('dark')" class="btn btn-dark">Dark</button>
  `,
})
export class ThemeToggleComponent {
  // Make the service public to access its observable in the template
  public themeService = inject(ThemeService);

  setTheme(theme: Theme) {
    this.themeService.setTheme(theme);
  }
}
