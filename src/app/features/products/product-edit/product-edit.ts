import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import {toSignal} from '@angular/core/rxjs-interop';
import { ProductForm } from '../product-form/product-form';
import { ProductApiService } from '../../../api/product/service';
import type {ProductResponse} from '../../../types';

@Component({
  selector: 'app-product-edit',
  imports: [ProductForm],
  templateUrl: './product-edit.html',
  styleUrl: './product-edit.css'
})
export class ProductEdit {
  private api = inject(ProductApiService);

  product$ = this.api.getProductById(1) as unknown as Observable<ProductResponse[]>;
  product = toSignal(this.product$, { initialValue: [] });
}
