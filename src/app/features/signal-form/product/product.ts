import { Component, signal } from '@angular/core';
import { FormField, form, required, min, max } from '@angular/forms/signals';
import { FieldWrapper } from '@components/field-wrapper/field-wrapper';

interface ProductModel {
  name: string;
  qty: number;
  description: string;
}

@Component({
  selector: 'app-product',
  imports: [FieldWrapper, FormField],
  templateUrl: './product.html',
  styleUrl: './product.css'
})

export class ProductForm {
  productModel = signal<ProductModel>({
    name: '',
    qty: 0,
    description: '',
  })
  productForm = form(this.productModel, (schemaPath) => {
    required(schemaPath.name, { message: 'Name is required' })

    required(schemaPath.qty, { message: 'Quantity is required' })
    min(schemaPath.qty, 1, { message: 'Quantity must be at least 1' })
    max(schemaPath.qty, 1000, { message: 'Quantity must be at most 1000'})

    required(schemaPath.description, { message: 'Description is required' })
    max(schemaPath.description, 200, { message: 'Description must be at most 200 characters'})
  })

  resetForm() {
    this.productForm().reset()
    this.productModel.set({
      name: '',
      qty: 0,
      description: '',
    })
  }

  onSubmit() {
    // Wait for any pending async validation
    if (this.productForm().pending()) {
      console.log('Waiting for validation...');
      return;
    }

    if (this.productForm().invalid()) {
      console.error('Form is invalid');
      return;
    }
    const data = this.productModel();
    console.log('Registration Successful', data)
    // await this.api.product(data);
  }
}
