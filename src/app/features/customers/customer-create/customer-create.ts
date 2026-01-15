import { Component } from '@angular/core';
import { CustomerForm } from '../customer-form/customer-form';

@Component({
  selector: 'app-customer-create',
  imports: [CustomerForm],
  templateUrl: './customer-create.html',
  styleUrl: './customer-create.css'
})
export class CustomerCreate {}
