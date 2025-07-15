import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./users-component').then(m => m.UsersComponent),
    children: [
      {
        path: '',
        loadComponent: () => import('./users-list-component').then(m => m.UserListComponent),
      },
      {
        path: ':id',
        loadComponent: () => import('./users-detail-component').then(m => m.UserDetailComponent),
      }
    ]
  }
]

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})
export class UsersRoutingModule { }
