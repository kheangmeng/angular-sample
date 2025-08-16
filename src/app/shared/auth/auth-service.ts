import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token = signal('')

  setToken(val: string): void {
    this.token.update(t => t = val)
  }

  getToken(): string {
    return this.token() ? `Bearer ${this.token()}` : ''
  }

  isAuthenticate(): boolean {
    return !!this.token()
  }
}
