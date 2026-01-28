import {Component, inject} from '@angular/core';
import {FormBuilder, Validators, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {toSignal} from '@angular/core/rxjs-interop';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatStepperModule} from '@angular/material/stepper';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {FileUpload} from '@components/file-upload/file-upload';
import {provideNativeDateAdapter} from '@angular/material/core';
import { CustomerApiService } from '../../../api/customer/service';
import type {City} from '../../../types';

@Component({
  selector: 'customer-form',
  templateUrl: 'customer-form.html',
  styleUrl: 'customer-form.css',
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
    FileUpload,
  ],
})
export class CustomerForm {
  private api = inject(CustomerApiService);
  private _formBuilder = inject(FormBuilder);

  firstFormGroup = this._formBuilder.group({
    firstName: ['', [Validators.required, Validators.minLength(2)]],
    lastName: ['', [Validators.required, Validators.minLength(2)]],
    gender: ['', Validators.required],
    dob: [],
    pob: [],
    phone: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
  });
  secondFormGroup = this._formBuilder.group({
    country: [null, Validators.required],
    city: [null, Validators.required],
    zipCode: ['', [Validators.required, Validators.pattern('^[0-9]{5}(?:-[0-9]{4})?$')]],
    buildingNumber: ['', Validators.required],
    street: ['', Validators.required],
  });
  thirdFormGroup = this._formBuilder.group({
    idCardFront: ['', Validators.required],
    idCardBack: ['', Validators.required],
  });
  isLinear = false;
  countries$ = this.api.getCountries(10);
  cities$ = this.api.getCities(100);
  countries = toSignal(this.countries$, { initialValue: [] });
  cities: City[] = [];

  onCountryChange() {
    const countryId = this.secondFormGroup.get('country')?.value;
    this.api.getCities(100).subscribe((cities) => {
      this.cities = cities.filter((city) => city.countryId === countryId);
      this.secondFormGroup.patchValue({ city: null });
    });
  }

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
