import { Injectable, signal } from "@angular/core";
import { menuItems } from "../constants";

@Injectable({
    providedIn: 'root'
})
export class ArrangedMenuService {
  private menu = signal(menuItems);
  constructor() {
    const savedMenu = localStorage.getItem('arrangedMenu');
    if (savedMenu) {
      this.menu = signal(JSON.parse(savedMenu));
    }
  }

  setMenu(arrangedMenu: { title: string; icon: string; url: string }[]) {
    this.menu = signal(arrangedMenu);
    localStorage.setItem('arrangedMenu', JSON.stringify(arrangedMenu));
  }

  getMenu() {
    return this.menu();
  }
}
