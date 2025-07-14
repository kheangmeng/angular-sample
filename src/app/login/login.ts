import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth-service';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  private router = inject(Router)

  constructor(public auth: AuthService) {}

  handleSubmit():void {
    this.auth.setToken('auth-token-123')
    this.router.navigate(['profile'], {
      queryParams: { 'first-login': true, username: 'hello' }
    })
  }
}
