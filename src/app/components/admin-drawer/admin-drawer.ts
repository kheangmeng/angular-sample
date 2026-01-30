import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, Component, OnDestroy, inject} from '@angular/core';
import { RouterLink } from '@angular/router'
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import { ArrangedMenuService } from "../../shared/services/arranged-menu.service";

@Component({
  selector: 'admin-drawer',
  templateUrl: 'admin-drawer.html',
  styleUrl: 'admin-drawer.css',
  standalone: true,
  imports: [RouterLink, MatSidenavModule, MatIconModule],
})
export class AdminDrawer implements OnDestroy{
  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  constructor(public menuService:ArrangedMenuService) {
    const changeDetectorRef = inject(ChangeDetectorRef);
    const media = inject(MediaMatcher);

    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }
  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

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
