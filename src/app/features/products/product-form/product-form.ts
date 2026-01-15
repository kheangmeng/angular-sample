import {Component, inject} from '@angular/core';
import {FormBuilder, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatStepperModule} from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { FileUpload } from '@components/file-upload/file-upload';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatTabsModule} from '@angular/material/tabs';

@Component({
  selector: 'product-form',
  templateUrl: 'product-form.html',
  styleUrl: 'product-form.css',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    MatButtonModule,
    MatStepperModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatIconModule,
    MatTabsModule,
    FileUpload,
  ],
})
export class ProductForm {
  private _formBuilder = inject(FormBuilder);

  firstFormGroup = this._formBuilder.group({
    firstName: ['', Validators.required, Validators.minLength(2)],
    lastName: ['', Validators.required, Validators.minLength(2)],
    gender: ['', Validators.required],
    dob: ['', Validators.required],
    pob: ['', Validators.required],
    phone: ['', Validators.required],
    email: ['', Validators.required, Validators.email],
  });
  secondFormGroup = this._formBuilder.group({
    street: ['', Validators.required],
    city: ['', Validators.required],
    state: ['', Validators.required],
    zipCode: ['', Validators.required, Validators.pattern('^[0-9]{5}(?:-[0-9]{4})?$')],
    country: ['', Validators.required],
  });
  thirdFormGroup = this._formBuilder.group({
    idCardFront: ['', Validators.required],
    idCardBack: ['', Validators.required],
  });
  isLinear = false;

  getUploadedFileUrl(fileUrl: string, controlName: string) {
    if (controlName === 'idCardFront') {
      this.thirdFormGroup.patchValue({ idCardFront: fileUrl });
    } else if (controlName === 'idCardBack') {
      this.thirdFormGroup.patchValue({ idCardBack: fileUrl });
    }
  }
  onSubmit() {
    const customerData = {
      ...this.firstFormGroup.value,
      ...this.secondFormGroup.value,
      ...this.thirdFormGroup.value,
    };
    console.log('Customer Data:', customerData);
  }
}
