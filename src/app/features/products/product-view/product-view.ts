import { Component, inject, } from '@angular/core';
import { Observable } from 'rxjs';
import { CurrencyPipe } from '@angular/common';
import {toSignal} from '@angular/core/rxjs-interop';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import { ProductApiService } from '../../../api/product/service';
import type {ProductResponse} from '../../../types';

@Component({
  selector: 'product-view',
  imports: [MatCardModule, MatDividerModule, CurrencyPipe],
  templateUrl: './product-view.html',
  styleUrl: './product-view.css'
})
export class ProductView {
  private api = inject(ProductApiService);

  product$ = this.api.getProductById(1) as unknown as Observable<ProductResponse[]>;
  product = toSignal(this.product$, { initialValue: [] });
}
