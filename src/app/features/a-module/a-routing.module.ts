import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./a-list-page').then(m => m.AListComponent),
  },
  {
    path: ':id',
    loadComponent: () => import('./a-detail-page').then(m => m.ADetailComponent),
  }
]

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class ARoutingModule { }
