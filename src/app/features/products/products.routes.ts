export default [
  {
    path: 'products',
    loadComponent: () => import('./product-list/products').then(m => m.Products)
  },
  {
    path: 'products/:id',
    loadComponent: () => import('./product-edit/product-edit').then(m => m.ProductEdit)
  }
]
