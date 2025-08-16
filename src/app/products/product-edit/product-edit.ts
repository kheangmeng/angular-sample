import { Component, inject } from '@angular/core';
import { FormArray, FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { forbiddenNameValidator, unambiguousCategoryValidator } from '../../shared/validator';

@Component({
  selector: 'app-product-edit',
  imports: [ReactiveFormsModule],
  templateUrl: './product-edit.html',
  styleUrl: './product-edit.css'
})
export class ProductEdit {
  readonly productId: string;
  private route = inject(ActivatedRoute)
  private formBuilder = inject(FormBuilder)
  public productForm = this.formBuilder.group({
    name: ['', [Validators.required, forbiddenNameValidator(/test/i)]],
    category: ['', Validators.required],
    qty: [0, Validators.required],
    description: ['', [Validators.required, Validators.maxLength(200)]],
    detail: this.formBuilder.group({
      price: [0, Validators.required],
      color: ['', Validators.required],
      size: ['', Validators.required]
    }),
    // image: ['', Validators.required],
    tags: this.formBuilder.array([
      this.formBuilder.control('')
    ])
  })
  // { validators: unambiguousCategoryValidator }
  get name() {
    return this.productForm.get('name');
  }
  get category() {
    return this.productForm.get('category');
  }


  get tags() {
    return this.productForm.get('tags') as FormArray
  }
  addTag() {
    this.tags?.push(this.formBuilder.control(''))
  }
  removeTag(index: number) {
    this.tags?.removeAt(index)
  }

  updateProduct() {
    this.productForm.patchValue({
      description: 'Product detail',
      detail: {
        color: 'blue'
      }
    })
  }

  onSubmit() {
    console.log(this.productForm.value)
  }

  constructor() {
  this.productId = this.route.snapshot.paramMap.get('id') as string
  console.log('product id:', this.productId)
  }
}
