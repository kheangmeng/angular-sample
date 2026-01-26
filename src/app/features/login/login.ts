import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { LoginModel } from './model';
import { AuthService } from '../../shared/auth/auth-service';
import { ForbiddenValidatorDirective } from '../../shared/template-validator';
import { AuthApiService } from '../../api/auth/service';

@Component({
  selector: 'app-login',
  imports: [
    FormsModule,
    ForbiddenValidatorDirective,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCardModule,
  ],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  private router = inject(Router)
  public login = new LoginModel('jonnhdoe@gmail.com', '123456789')

  constructor(public auth: AuthService, private authApiService: AuthApiService) {}

  handleSubmit():void {
    const token = { token: crypto.randomUUID() }  as unknown as any
    this.auth.setToken(token)
    this.router.navigate(['admin'])
    // this.authApiService.login(this.login).subscribe({
    //   next: (res) => {
    //     this.auth.setToken(res)
    //     this.auth.setRefreshToken(res)
    //     this.router.navigate(['profile'], {
    //       queryParams: { 'first-login': true, username: 'hello' }
    //       })
    //   },
    //   error: (err) => {
    //     console.log(err)
    //   }
    // })
  }
}
