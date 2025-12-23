export default [
  {
    path: 'register',
    loadComponent: () => import('./register/register').then(m => m.RegisterForm)
  },
  {
    path: 'product',
    loadComponent: () => import('./product/product').then(m => m.ProductForm)
  },
]
