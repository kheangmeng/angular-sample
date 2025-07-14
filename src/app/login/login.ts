import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth-service';
import { FormsModule } from '@angular/forms';
import { LoginModel } from './model';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  private router = inject(Router)
  public login = new LoginModel('', '')

  constructor(public auth: AuthService) {}

  handleSubmit():void {
    this.auth.setToken('auth-token-123')
    this.router.navigate(['profile'], {
      queryParams: { 'first-login': true, username: 'hello' }
    })
  }
}
