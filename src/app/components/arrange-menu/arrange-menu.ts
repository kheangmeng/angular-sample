import {Component} from '@angular/core';
import {CdkDrag, CdkDragDrop, CdkDropList, CdkDragPlaceholder, moveItemInArray } from '@angular/cdk/drag-drop';
import { MatButton } from '@angular/material/button';
import { menuTitles, menuItems } from "../../constants";
import { ArrangedMenuService } from "../../arranged-menu.service";

@Component({
  selector: 'arrange-menu',
  templateUrl: 'arrange-menu.html',
  styleUrl: 'arrange-menu.css',
  imports: [CdkDrag, CdkDropList, CdkDragPlaceholder, MatButton],
})
export class ArrangeMenu {
  menu = menuTitles;
  arrangedMenu = menuItems;

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
    console.log('arranged:', this.arrangedMenu);
  }

  saveArrangement() {
    this.menuService.setMenu(this.arrangedMenu);
    console.log('Saved arrangement:', this.arrangedMenu);
  }
}
