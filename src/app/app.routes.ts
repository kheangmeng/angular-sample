import { InjectionToken } from '@angular/core';
import { Routes } from '@angular/router';
import { AdminLayout } from './layouts/admin-layout/admin-layout';
import { authGuardGuard } from './auth/auth-guard';
export const ADMIN_KEY = new InjectionToken<any>('app.routes');

export const routes: Routes = [
  {
    path: 'admin',
    component: AdminLayout,
    canActivate: [authGuardGuard],
    providers: [{
      provide: ADMIN_KEY,
      useValue: '123456',
    }],
    children: [
      {
        path: '',
        loadComponent: () => import('./dashboard/dashboard').then(m => m.Dashboard)
      },
      {
        path: 'products',
        loadComponent: () => import('./products/product-list/products').then(m => m.Products)
      },
      {
        path: 'products/:id',
        loadComponent: () => import('./products/product-edit/product-edit').then(m => m.ProductEdit)
      }
    ]
  },
  {
    path: 'users',
    loadChildren: () => import('./users/users-module').then(m => m.UsersModule)
  },
  {
    path: '',
    loadComponent: () => import('./home-page/home-page').then(m => m.HomePage)
  },
  {
    path: 'about',
    loadComponent: () => import('./about/about').then(m => m.About)
  },
  {
    path: 'login',
    loadComponent: () => import('./login/login').then(m => m.Login)
  },
  {
    path: 'profile',
    loadComponent: () => import('./profile/profile').then(m => m.Profile)
  },
  {
    path: '**',
    loadComponent: () => import('./page-not-found/page-not-found').then(m => m.PageNotFound)
  }
];
