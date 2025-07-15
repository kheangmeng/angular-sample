import { Component, Injectable } from "@angular/core";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'users',
  imports: [RouterOutlet],
  template: `
    <h2>Users</h2>
    <router-outlet></router-outlet>
  `
})

@Injectable()
export class UsersComponent {}
