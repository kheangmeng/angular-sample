import { InjectionToken } from '@angular/core';
import { Routes } from '@angular/router';
import { AdminLayout } from './layouts/admin-layout/admin-layout';
import { authGuardGuard } from './shared/auth/auth-guard';
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
        loadComponent: () => import('./features/dashboard/dashboard').then(m => m.Dashboard)
      },
      {
        path: 'products',
        loadComponent: () => import('./features/products/product-list/products').then(m => m.Products)
      },
      {
        path: 'products/:id',
        loadComponent: () => import('./features/products/product-edit/product-edit').then(m => m.ProductEdit)
      }
    ]
  },
  {
    path: 'users',
    loadChildren: () => import('./features/users/users-module').then(m => m.UsersModule)
  },
  {
    path: '',
    loadComponent: () => import('./features/home-page/home-page').then(m => m.HomePage)
  },
  {
    path: 'about',
    loadComponent: () => import('./features/about/about').then(m => m.About)
  },
  {
    path: 'login',
    loadComponent: () => import('./features/login/login').then(m => m.Login)
  },
  {
    path: 'profile',
    loadComponent: () => import('./features/profile/profile').then(m => m.Profile)
  },
  {
    path: '**',
    loadComponent: () => import('./features/page-not-found/page-not-found').then(m => m.PageNotFound)
  }
];
