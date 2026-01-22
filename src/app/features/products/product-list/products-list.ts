import { RouterLink } from '@angular/router'
import { ADMIN_KEY } from '../../../app.routes';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {AfterViewInit, Component, ViewChild, inject, Inject} from '@angular/core';
import {PageEvent, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatSort, Sort, MatSortModule} from '@angular/material/sort';
import { MatButton } from '@angular/material/button';
import { CurrencyPipe } from '@angular/common';
import { CustomerApiService } from "../../../api/customer/service";
import { ProductResponse } from "../../../types";
import { formatDate } from '../../../shared/helper';
import { generateFakeProduct } from '../../../shared/faker/product';

@Component({
  selector: 'app-products-list',
  imports: [
    RouterLink,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButton,
    CurrencyPipe,
  ],
  exportAs: 'products-list',
  templateUrl: './products-list.html',
  styleUrl: './products-list.css'
})
export class ProductList {
  constructor(
    @Inject(ADMIN_KEY) private adminKey: string,
    private customerApiService: CustomerApiService
  ) {
    console.log(this.adminKey);
  }
  private _liveAnnouncer = inject(LiveAnnouncer);
  formatDate = formatDate
  displayedColumns: string[] = ['slug', 'name', 'description', 'categoryId', 'brand', 'basePrice', 'createdAt', 'updatedAt'];
  customers = new MatTableDataSource<ProductResponse>([]);

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

  ngOnInit(): void {
    // this.fetchProducts()
    const temp = generateFakeProduct(10).map((c: any) => ({
      id: c.id,
      name: c.name,
      slug: c.slug,
      description: c.description,
      categoryId: c.category,
      brand: c.brand,
      basePrice: c.basePrice,
      createdAt: c.createdAt,
      updatedAt: c.updatedAt,
    })) as ProductResponse[];
    this.customers = new MatTableDataSource<ProductResponse>(temp)
  }

  fetchProducts(): void {
    // this.customerApiService.getCustomers({page: 1, limit: 10}).subscribe({
    //   next: (res: ProductResponse[]) => {
    //     this.customers = new MatTableDataSource<ProductResponse>(res)
    //   },
    //   error: (err) => {
    //     console.log(err)
    //   }
    // })
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

    // this.fetchProducts()
    const temp = generateFakeProduct(10).map((c: any) => ({
      id: c.id,
      name: c.name,
      slug: c.slug,
      description: c.description,
      categoryId: c.category,
      brand: c.brand,
      basePrice: c.basePrice,
      createdAt: c.createdAt,
      updatedAt: c.updatedAt,
    })) as ProductResponse[];
    this.customers = new MatTableDataSource<ProductResponse>(temp)
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }
}
