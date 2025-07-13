import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-edit',
  imports: [],
  templateUrl: './product-edit.html',
  styleUrl: './product-edit.css'
})
export class ProductEdit {
   readonly productId: string;
   private route = inject(ActivatedRoute)
   constructor() {
    this.productId = this.route.snapshot.paramMap.get('id') as string

    console.log('product id:', this.productId)
   }
}
