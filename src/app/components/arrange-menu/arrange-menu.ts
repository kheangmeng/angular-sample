import {Component, inject} from '@angular/core';
import {CdkDrag, CdkDragDrop, CdkDropList, CdkDragPlaceholder, moveItemInArray } from '@angular/cdk/drag-drop';
import { MatButton } from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import { menuTitles, menuItems } from "../../shared/constants";
import { ArrangedMenuService } from "../../arranged-menu.service";

@Component({
  selector: 'arrange-menu',
  templateUrl: 'arrange-menu.html',
  styleUrl: 'arrange-menu.css',
  imports: [CdkDrag, CdkDropList, CdkDragPlaceholder, MatButton, MatCardModule],
})
export class ArrangeMenu {
  menu = menuTitles;
  arrangedMenu = menuItems;
  readonly dialog = inject(MatDialog);
  private _snackBar = inject(MatSnackBar);

  constructor(public menuService:ArrangedMenuService) {
    const savedMenu = localStorage.getItem('arrangedMenu');
    if (savedMenu) {
      this.menu = JSON.parse(savedMenu)
        .map((item: { title: string; icon: string; url: string }) => item.title);
    }
  }
  handleArrange(menu: string[]) {
    this.arrangedMenu = menu.map(title => {
      const found = this.arrangedMenu.find(item => item.title === title);
      return found ? found : { title, icon: '', url: '/' };
    });
  }

  drop(event: CdkDragDrop<string[]>) {
    const res = moveItemInArray(this.menu, event.previousIndex, event.currentIndex);
    this.handleArrange(this.menu);
  }

  saveArrangement(): void {
    const dialogRef = this.dialog.open(DialogConfirm);

    dialogRef.afterClosed().subscribe(result => {
      if(result !== undefined) {
        this.menuService.setMenu(this.arrangedMenu);
        this._snackBar.open('Menu Arranged', 'Saved');
      }
    });
  }
}

@Component({
  selector: 'dialog-confirm',
  templateUrl: 'dialog-confirm.html',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButton,
  ],
})
export class DialogConfirm {
  readonly dialogRef = inject(MatDialogRef<DialogConfirm>);

  onNoClick(): void {
    this.dialogRef.close();
  }
}
