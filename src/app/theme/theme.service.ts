import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type Theme = 'light' | 'dark';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  // 1. Private BehaviorSubject to hold the state
  private themeSubject = new BehaviorSubject<Theme>('light');

  // 2. Public observable for components to subscribe to
  public theme$ = this.themeSubject.asObservable();

  // 3. Method to update the state
  setTheme(theme: Theme) {
    this.themeSubject.next(theme);
  }
}
