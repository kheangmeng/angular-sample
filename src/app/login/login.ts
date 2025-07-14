import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth-service';
import { FormsModule } from '@angular/forms';
import { LoginModel } from './model';
import { ForbiddenValidatorDirective } from '../shared/template-validator';
import { JsonPipe } from '@angular/common';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-login',
  imports: [
    FormsModule,
    ForbiddenValidatorDirective,
    JsonPipe,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
  ],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  private router = inject(Router)
  public login = new LoginModel('jonnhdoe@gmail.com', '123456789')

  constructor(public auth: AuthService) {}

  handleSubmit():void {
    this.auth.setToken('auth-token-123')
    this.router.navigate(['profile'], {
      queryParams: { 'first-login': true, username: 'hello' }
    })
  }
}
