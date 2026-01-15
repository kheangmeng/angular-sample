export default [
  {
    path: 'products',
    loadComponent: () => import('./product-list/products-list').then(m => m.ProductList)
  },
  {
    path: 'products/create',
    loadComponent: () => import('./product-create/product-create').then(m => m.ProductCreate)
  },
  {
    path: 'products/:id',
    loadComponent: () => import('./product-edit/product-edit').then(m => m.ProductEdit)
  }
]
