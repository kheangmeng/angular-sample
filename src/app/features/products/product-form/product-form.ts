import {ChangeDetectionStrategy, Component, OnInit, signal} from '@angular/core';
import { applyEach, form, disabled, required, min, max, submit,  FormField, SchemaPathTree } from '@angular/forms/signals';
import { Observable, forkJoin, map } from 'rxjs';
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
import { ProductApiService } from '../../../api/product/service';
import { mapOptionTypeWithValues } from '../../../api/product/mapping';
import type { OptionValue, OptionTypeWithValues } from '../../../types';

function ItemSchema(schemaPath: SchemaPathTree<ProductVariant>) {
  disabled(schemaPath.price, ({valueOf}) => valueOf(schemaPath.id) !== null)

  required(schemaPath.sku, { message: 'SKU is required' })
  required(schemaPath.optionTypeId, { message: 'Option Type is required' })
  required(schemaPath.optionValueId, { message: 'Option is required' })

  required(schemaPath.price, { message: 'Price is required' })
  min(schemaPath.price, 1, { message: 'Price must be at least 1' })
  max(schemaPath.price, 1000, { message: 'Price must be at most 1000'})

  required(schemaPath.stockQuantity, { message: 'Stock quantity is required' })
  min(schemaPath.stockQuantity, 1, { message: 'Stock quantity must be at least 1' })
}

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
export class ProductForm implements OnInit {
  constructor(private api: ProductApiService) {}
  readonly panelOpenState = signal(true);
  optionData: OptionTypeWithValues[] = [];
  optionValues: OptionValue[][] = [];
  ngOnInit() {
    this.getOptionTypeWithValues().subscribe((data) => {
      this.optionData = data;
    });
  }
  productModel = signal<Product>({
    id: null,
    name: '',
    slug: '',
    description: '',
    categoryId: 0,
    brand: '',
    basePrice: 0,
    isActive: true,
    variants: [{
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
    }],
  })
  productForm = form(this.productModel, (schemaPath) => {
    required(schemaPath.name, { message: 'Name is required' })
    required(schemaPath.slug, { message: 'Slug is required' })

    required(schemaPath.basePrice, { message: 'Base price is required' })
    min(schemaPath.basePrice, 1, { message: 'Base price must be at least 1' })
    max(schemaPath.basePrice, 1000, { message: 'Base price must be at most 1000'})

    required(schemaPath.categoryId, { message: 'Category is required' })

    applyEach(schemaPath.variants, ItemSchema)
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
      variants: [{
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
      }],
    })
  }

  addVariant() {
    const variant = {
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
    };
    this.productModel.set({
      ...this.productModel(),
      variants: [...this.productModel().variants, variant],
    });
  }
  onOptionType(index: number) {
    const selectedOptionTypeId = this.productModel().variants[index].optionTypeId;
    const selectedOptionType = this.optionData.find(option => option.id === selectedOptionTypeId);
    this.optionValues[index] = selectedOptionType ? selectedOptionType.values : [];
  }

  getUploadedFileUrl(fileUrl: string, index: number) {
    console.log('Uploaded file URL:', fileUrl);
    const currentImage = this.productModel().variants[index].image;
    this.productModel.set({
      ...this.productModel(),
      variants: this.productModel().variants.map((variant, i) => {
        if (i === index) {
          return {
            ...variant,
            image: fileUrl || currentImage,
          };
        }
        return variant;
      }),
    });
  }
  getOptionTypeWithValues(): Observable<OptionTypeWithValues[]> {
    return forkJoin({
      optionTypes: this.api.getOptionTypes(10),
      optionValues: this.api.getOptionValues(100),
    })
    .pipe(
      map(({ optionTypes, optionValues }) => {
        return mapOptionTypeWithValues(optionTypes, optionValues)
      }))
  }

  onSubmit(event: Event) {
    event.preventDefault();
    submit(this.productForm, async () => {
      console.log('productForm is valid! Submitting...', this.productModel());
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
