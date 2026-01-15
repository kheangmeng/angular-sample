import { Component, inject } from '@angular/core';
import { ProductForm } from '../product-form/product-form';

@Component({
  selector: 'app-product-create',
  imports: [ProductForm],
  templateUrl: './product-create.html',
  styleUrl: './product-create.css'
})
export class ProductCreate {

  constructor() {}
}
