import { InjectionToken } from '@angular/core';
import { Routes } from '@angular/router';
import { AdminLayout } from './admin-layout/admin-layout';
// import { ProductLayout } from './product-layout/product-layout';
export const ADMIN_KEY = new InjectionToken<any>('app.routes');

export const routes: Routes = [
  {
    path: 'admin',
    component: AdminLayout,
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
        loadComponent: () => import('./products/products').then(m => m.Products)
      }
    ]
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
