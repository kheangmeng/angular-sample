import {ChangeDetectionStrategy, Component, signal} from '@angular/core';
import { FormField, form, disabled, required, min, max, submit } from '@angular/forms/signals';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatStepperModule} from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatCardModule} from '@angular/material/card';
import { FileUpload } from '@components/file-upload/file-upload';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatTabsModule} from '@angular/material/tabs';
import {MatExpansionModule} from '@angular/material/expansion';
import { ProductVariant, Product } from '../../../types/product';

@Component({
  selector: 'product-form',
  templateUrl: 'product-form.html',
  styleUrl: 'product-form.css',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    MatButtonModule,
    MatStepperModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatIconModule,
    MatTabsModule,
    FormField,
    MatSlideToggleModule,
    MatCardModule,
    MatExpansionModule,
    FileUpload,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductForm {
  readonly panelOpenState = signal(true);
  productModel = signal<Product>({
    id: null,
    name: '',
    slug: '',
    description: '',
    categoryId: 0,
    brand: '',
    basePrice: 0,
    isActive: true,
  })
  productForm = form(this.productModel, (schemaPath) => {
    required(schemaPath.name, { message: 'Name is required' })
    required(schemaPath.slug, { message: 'Slug is required' })

    required(schemaPath.basePrice, { message: 'Base price is required' })
    min(schemaPath.basePrice, 1, { message: 'Base price must be at least 1' })
    max(schemaPath.basePrice, 1000, { message: 'Base price must be at most 1000'})

    required(schemaPath.categoryId, { message: 'Category is required' })
  })

  productVariantModel = signal<ProductVariant>({
    id: null,
    productId: null,
    sku: '',
    price: '',
    stockQuantity: 0,
    weight: 0,
    isActive: true,
    image: '',
    optionTypeId: 0,
    optionValueId: 0,
  })
  productVariantForm = form(this.productVariantModel, (schemaPath) => {
    disabled(schemaPath.price, ({valueOf}) => valueOf(schemaPath.id) !== null)

    required(schemaPath.sku, { message: 'SKU is required' })
    required(schemaPath.optionTypeId, { message: 'Option Type is required' })
    required(schemaPath.optionValueId, { message: 'Option is required' })

    required(schemaPath.price, { message: 'Price is required' })
    min(schemaPath.price, 1, { message: 'Price must be at least 1' })
    max(schemaPath.price, 1000, { message: 'Price must be at most 1000'})

    required(schemaPath.stockQuantity, { message: 'Stock quantity is required' })
    min(schemaPath.stockQuantity, 1, { message: 'Stock quantity must be at least 1' })
  })

  resetForm() {
    this.productForm().reset()
    this.productModel.set({
      id: null,
      name: '',
      slug: '',
      description: '',
      categoryId: 0,
      brand: '',
      basePrice: 0,
      isActive: true,
    })

    this.productVariantForm().reset()
    this.productVariantModel.set({
      id: null,
      productId: null,
      sku: '',
      price: '',
      stockQuantity: 0,
      weight: 0,
      isActive: true,
      image: '',
      optionTypeId: 0,
      optionValueId: 0,
    })
  }

  getUploadedFileUrl(fileUrl: string) {
    console.log('Uploaded file URL:', fileUrl);
    const currentImage = this.productVariantModel().image;
    this.productVariantModel.set({
      ...this.productVariantModel(),
      image: fileUrl || currentImage,
    });
  }

  onSubmit(event: Event) {
    event.preventDefault();
    submit(this.productVariantForm, async () => {
      console.log('productForm is valid! Submitting...', this.productVariantModel());
      console.log('productVariantForm is valid! Submitting...', this.productVariantModel());
    });
    // if (this.productForm().pending()) {
    //   console.log('Waiting for validation...');
    //   return;
    // }

    // if (this.productForm().invalid()) {
    //   console.error('Form is invalid');
    //   return;
    // }
    // const data = this.productModel();
    // console.log('Registration Successful', data)
    // await this.api.product(data);
  }
}
