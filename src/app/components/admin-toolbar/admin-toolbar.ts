import {Component, HostListener, inject} from '@angular/core';
import {MatDialog, MatDialogModule} from '@angular/material/dialog';
import {MatBadgeModule} from '@angular/material/badge';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatToolbarModule} from '@angular/material/toolbar';
import {LanguageToggleComponent} from '../../components/language-toggle/language-toggle';
import {SearchDialog} from '../../components/search-dialog/search-dialog';

@Component({
  selector: 'admin-toolbar',
  templateUrl: 'admin-toolbar.html',
  styleUrl: 'admin-toolbar.css',
  standalone: true,
  imports: [
    MatBadgeModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatDialogModule,
    LanguageToggleComponent,
  ],
})
export class AdminToolbar {
  private readonly dialog = inject(MatDialog);

  @HostListener('window:keydown.meta.k', ['$event'])
  @HostListener('window:keydown.control.k', ['$event'])
  onKeydown(event: Event) {
    const keyboardEvent = event as KeyboardEvent;
    event.preventDefault();
    this.openSearchDialog();
  }

  openSearchDialog(): void {
    this.dialog.open(SearchDialog, {
      width: '500px',
      panelClass: 'search-dialog-panel',
    });
  }
}
