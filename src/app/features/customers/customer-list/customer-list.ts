import {LiveAnnouncer} from '@angular/cdk/a11y';
import {AfterViewInit, Component, ViewChild, inject} from '@angular/core';
import { RouterLink } from '@angular/router'
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
import { CustomerApiService } from "../../../api/customer/service";
import { CustomerListResponse } from "../../../types";
import { formatDate } from '../../../shared/helper';

@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.html',
  styleUrl: './customer-list.css',
  imports: [
    RouterLink,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatButton,
    MatIcon,
    MatTooltipModule,
  ],
})

export class CustomerList implements AfterViewInit {
  private _snackBar = inject(MatSnackBar);
  private _liveAnnouncer = inject(LiveAnnouncer);
  formatDate = formatDate
  displayedColumns: string[] = ['idCard', 'name', 'gender', 'email', 'phoneNumber', 'createdAt', 'updatedAt', 'actions'];
  customers = new MatTableDataSource<CustomerListResponse>([]);

  @ViewChild(MatSort) sort!: MatSort;

  ngAfterViewInit() {
    this.customers.sort = this.sort;
  }

  announceSortChange(sortState: Sort) {
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  constructor(private customerApiService: CustomerApiService) {}

  ngOnInit(): void {
    this.fetchCustomers();
  }

  fetchCustomers(): void {
    this.customerApiService.getCustomers({page: 1, limit: 10}).subscribe({
      next: (res: CustomerListResponse[]) => {
        this.customers = new MatTableDataSource<CustomerListResponse>(res)
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

    this.fetchCustomers();
  }
  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }

  readonly dialog = inject(MatDialog);
  openDialog(customerIdCard: string): void {
    const dialogRef = this.dialog.open(CustomerDeleteDialog, {
      data: customerIdCard,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
      if(result === 'confirm') {
        this._snackBar.open(`Customer with ID Card: ${customerIdCard} deleted.`, 'Close');
        this.fetchCustomers();
      }
    });
  }
}

@Component({
  selector: 'customer-delete-dialog',
  templateUrl: 'customer-delete-dialog.html',
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatButton,
  ],
})
export class CustomerDeleteDialog {
  readonly dialogRef = inject(MatDialogRef<CustomerDeleteDialog>);
  customerIdCard = inject(MAT_DIALOG_DATA);

  onCancel(): void {
    this.dialogRef.close();
  }
  onConfirm(): void {
    this.dialogRef.close('confirm');
  }
}
