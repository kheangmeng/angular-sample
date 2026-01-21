import {Component} from '@angular/core';
import { RouterLink } from '@angular/router'
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import { ArrangedMenuService } from "../../arranged-menu.service";

@Component({
  selector: 'admin-drawer',
  templateUrl: 'admin-drawer.html',
  styleUrl: 'admin-drawer.css',
  standalone: true,
  imports: [RouterLink, MatSidenavModule, MatIconModule],
})
export class AdminDrawer {
  constructor(public menuService:ArrangedMenuService) {}

  showFiller = false;

  getTitle(title: string) {
    switch (title) {
      case 'Dashboard':
        return $localize`Dashboard`
      case 'Customers':
        return $localize`Customers`
      case 'Products':
        return $localize`Products`
      case 'Setting':
        return $localize`Setting`
      default:
        return $localize`${title}`
    }
  }
}
