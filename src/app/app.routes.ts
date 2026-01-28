import { InjectionToken } from '@angular/core';
import { Routes } from '@angular/router';
import { AdminLayout } from './layouts/admin-layout/admin-layout';
import { authGuardGuard } from './shared/auth/auth-guard';
import productsRoutes from './features/products/products.routes';
import customersRoutes from './features/customers/customers.routes';

export const ADMIN_KEY = new InjectionToken<any>('app.routes');

const appRoutes: Routes = [
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
        path: 'setting',
        loadComponent: () => import('./features/admin-setting/admin-setting').then(m => m.AdminSetting)
      },
      ...productsRoutes,
      ...customersRoutes,
    ],
  },
  {
    path: '',
    loadComponent: () => import('./features/home-page/home-page').then(m => m.HomePage)
  },
  {
    path: 'login',
    loadComponent: () => import('./features/login/login').then(m => m.Login)
  },
  {
    path: '**',
    loadComponent: () => import('./features/page-not-found/page-not-found').then(m => m.PageNotFound)
  }
];

export const routes: Routes = [
  {
    path: 'fr',
    children: appRoutes
  },
  ...appRoutes
];
