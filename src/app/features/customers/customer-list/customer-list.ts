import {LiveAnnouncer} from '@angular/cdk/a11y';
import {AfterViewInit, Component, ViewChild, inject} from '@angular/core';
import {PageEvent, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatSort, Sort, MatSortModule} from '@angular/material/sort';
import { MatButton } from '@angular/material/button';
import { CustomerApiService } from "../../../api/customer/service";
import { CustomerResponse } from "../../../types";
import { formatDate } from '../../../shared/helper';
import { generateFakeCustomer } from '../../../shared/faker/customer';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.html',
  styleUrl: './customer-list.css',
  imports: [MatTableModule, MatPaginatorModule, MatSortModule, MatButton],
})

export class CustomerList implements AfterViewInit {
  private _liveAnnouncer = inject(LiveAnnouncer);
  formatDate = formatDate
  displayedColumns: string[] = ['idCard', 'name', 'gender', 'email', 'phone', 'createdAt', 'updatedAt'];
  customers = new MatTableDataSource<CustomerResponse>([]);

  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.customers.sort = this.sort;
  }

  announceSortChange(sortState: Sort) {
    // console.log('sortState:', sortState)
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  constructor(private customerApiService: CustomerApiService) {}

  ngOnInit(): void {
    // this.fetchCustomers()
    const temp = generateFakeCustomer(10).map((c: any) => ({
      name: `${c.firstName} ${c.lastName}`,
      gender: c.sex,
      email: c.email,
      phone: c.phoneNumber,
      idCard: c.idCard,
      createdAt: c.createdAt,
      updatedAt: c.updatedAt,
    })) as CustomerResponse[];
    this.customers = new MatTableDataSource<CustomerResponse>(temp)
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

  // Pagination
  length = 50;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25];
  pageEvent: PageEvent = {} as PageEvent;

  handlePageEvent(e: PageEvent) {
    // console.log('paginate:', e);
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;

    // this.fetchCustomers()
    const temp = generateFakeCustomer(10).map((c: any) => ({
      name: `${c.firstName} ${c.lastName}`,
      gender: c.sex,
      email: c.email,
      phone: c.phoneNumber,
      idCard: c.idCard,
      createdAt: c.createdAt,
      updatedAt: c.updatedAt,
    })) as CustomerResponse[];
    this.customers = new MatTableDataSource<CustomerResponse>(temp)
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }
}
