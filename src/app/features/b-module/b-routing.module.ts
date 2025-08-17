import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./b-list-page').then(m => m.BListComponent),
  },
  {
    path: ':id',
    loadComponent: () => import('./b-detail-page').then(m => m.BDetailComponent),
  }
]

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class BRoutingModule { }
