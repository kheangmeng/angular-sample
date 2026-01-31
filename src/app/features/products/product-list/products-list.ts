import { RouterLink } from '@angular/router'
import { ADMIN_KEY } from '../../../app.routes';
import {LiveAnnouncer} from '@angular/cdk/a11y';
import {AfterViewInit, Component, ViewChild, inject, Inject} from '@angular/core';
import {PageEvent, MatPaginatorModule} from '@angular/material/paginator';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatSort, Sort, MatSortModule} from '@angular/material/sort';
import { MatButton } from '@angular/material/button';
import {MatTooltipModule} from '@angular/material/tooltip';
import { MatIcon } from "@angular/material/icon";
import {MatSnackBar} from '@angular/material/snack-bar';
import {
  MatDialog,
  MatDialogActions,
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogContent,
  MatDialogRef,
} from '@angular/material/dialog';
import { CurrencyPipe } from '@angular/common';
import { ProductApiService } from "../../../api/product/service";
import { ProductResponse } from "../../../types";
import { formatDate } from '../../../shared/helper';

@Component({
  selector: 'app-products-list',
  imports: [
    RouterLink,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButton,
    MatIcon,
    MatTooltipModule,
    CurrencyPipe,
  ],
  exportAs: 'products-list',
  templateUrl: './products-list.html',
  styleUrl: './products-list.css'
})
export class ProductList implements AfterViewInit {
  constructor(
    @Inject(ADMIN_KEY) private adminKey: string,
    private productApiService: ProductApiService
  ) {
    console.log(this.adminKey);
  }
  private _snackBar = inject(MatSnackBar);
  private _liveAnnouncer = inject(LiveAnnouncer);
  formatDate = formatDate
  displayedColumns: string[] = ['slug', 'name', 'description', 'categoryId', 'brand', 'basePrice', 'createdAt', 'updatedAt', 'actions'];
  products = new MatTableDataSource<ProductResponse>([]);

  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.products.sort = this.sort;
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  ngOnInit(): void {
    this.fetchProducts()
  }

  fetchProducts(): void {
    this.productApiService.getProducts({page: 1, limit: 10}).subscribe({
      next: (res: ProductResponse[]) => {
        this.products = new MatTableDataSource<ProductResponse>(res)
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
    this.pageEvent = e;
    this.length = e.length;
    this.pageSize = e.pageSize;
    this.pageIndex = e.pageIndex;

    this.fetchProducts();
  }
  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }

  readonly dialog = inject(MatDialog);
  openDialog(id: string): void {
    const dialogRef = this.dialog.open(ProductDeleteDialog, {
      data: id,
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result === 'confirm') {
        this._snackBar.open(`Customer with ID Card: ${id} deleted.`, 'Close');
        this.fetchProducts();
      }
    });
  }
}

@Component({
  selector: 'product-delete-dialog',
  templateUrl: 'product-delete-dialog.html',
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatButton,
  ],
})
export class ProductDeleteDialog {
  readonly dialogRef = inject(MatDialogRef<ProductDeleteDialog>);
  productId = inject(MAT_DIALOG_DATA);

  onCancel(): void {
    this.dialogRef.close();
  }
  onConfirm(): void {
    this.dialogRef.close('confirm');
  }
}
