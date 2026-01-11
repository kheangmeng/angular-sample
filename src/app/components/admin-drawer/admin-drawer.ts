import {Component} from '@angular/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import { ArrangedMenuService } from "../../arranged-menu.service";

@Component({
  selector: 'admin-drawer',
  templateUrl: 'admin-drawer.html',
  styleUrl: 'admin-drawer.css',
  standalone: true,
  imports: [MatSidenavModule, MatIconModule],
})
export class AdminDrawer {
  constructor(public menuService:ArrangedMenuService) {}

  showFiller = false;
}
