import { Injectable, signal } from '@angular/core';
import { LoginResponse } from "../../types";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token = signal('')
  private refreshToken = signal('')

  setToken(val: LoginResponse): void {
    localStorage.setItem('token', val.token)
    this.token.update(t => t = val.token)
  }

  setRefreshToken(val: LoginResponse): void {
    localStorage.setItem('refreshToken', val.refreshToken)
    this.refreshToken.update(t => t = val.refreshToken)
  }

  getToken(): string {
    const tk = this.token() || localStorage.getItem('token')
    return tk ? `Bearer ${tk}` : ''
  }

  deleteToken(): void {
    this.token.set('')
    localStorage.removeItem('token')
  }

  isAuthenticate(): boolean {
    return !!this.token() || !!localStorage.getItem('token')
  }
}
