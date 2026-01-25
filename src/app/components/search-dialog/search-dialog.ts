import {Component, inject} from '@angular/core';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {A11yModule} from '@angular/cdk/a11y';
import { InputSearch } from '../input-search/input-search';

@Component({
  selector: 'app-search-dialog',
  templateUrl: './search-dialog.html',
  styleUrls: ['./search-dialog.css'],
  standalone: true,
  imports: [
    MatDialogModule,
    A11yModule,
    InputSearch,
  ],
})
export class SearchDialog {
  private readonly dialogRef = inject(MatDialogRef<SearchDialog>);

  onClose(): void {
    this.dialogRef.close();
  }
}
