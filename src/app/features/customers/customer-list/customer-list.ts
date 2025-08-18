import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { CustomerApiService } from "../../../api/customer/service";
import { CustomerResponse } from "../../../types";
import { formatDate } from '../../../shared/helper';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.html',
  styleUrl: './customer-list.css',
  imports: [MatTableModule, MatPaginatorModule],
})

export class CustomerList {
  formatDate = formatDate
  displayedColumns: string[] = ['name', 'gender', 'email', 'phone', 'id_card_number', 'createdAt', 'updatedAt'];
  customers = new MatTableDataSource<CustomerResponse>([]);

  constructor(private customerApiService: CustomerApiService) {}

  ngOnInit(): void {
    this.fetchCustomers()
  }

  fetchCustomers(): void {
    this.customerApiService.getCustomers({page: 1, limit: 10}).subscribe({
      next: (res: CustomerResponse[]) => {
        this.customers = new MatTableDataSource<CustomerResponse>(res)
      },
      error: (err) => {
        console.log(err)
      }
    })
  }
}
