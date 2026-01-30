import { Component, inject, } from '@angular/core';
import { Observable } from 'rxjs';
import {toSignal} from '@angular/core/rxjs-interop';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import { CustomerApiService } from '../../../api/customer/service';
import type {CustomerResponse} from '../../../types';

@Component({
  selector: 'customer-view',
  imports: [MatCardModule, MatDividerModule],
  templateUrl: './customer-view.html',
  styleUrl: './customer-view.css'
})
export class CustomerView {
  private api = inject(CustomerApiService);

  customer$ = this.api.getCustomerById(1) as unknown as Observable<CustomerResponse[]>;
  customer = toSignal(this.customer$, { initialValue: [] });
}
