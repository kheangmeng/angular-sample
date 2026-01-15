import { Component, Inject } from '@angular/core';
import { RouterLink } from '@angular/router'
import { MatButton } from '@angular/material/button';
import { ADMIN_KEY } from '../../../app.routes';

@Component({
  selector: 'app-products',
  imports: [RouterLink, MatButton],
  exportAs: 'products',
  templateUrl: './products.html',
  styleUrl: './products.css'
})
export class Products {
  constructor(@Inject(ADMIN_KEY) private adminKey: string) {
    console.log(this.adminKey);
  }
}
