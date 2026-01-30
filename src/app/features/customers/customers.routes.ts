export default [
  {
    path: 'customers',
    loadComponent: () => import('./customer-list/customer-list').then(m => m.CustomerList)
  },
  {
    path: 'customers/create',
    loadComponent: () => import('./customer-create/customer-create').then(m => m.CustomerCreate)
  },
  {
    path: 'customers/:id',
    loadComponent: () => import('./customer-view/customer-view').then(m => m.CustomerView)
  },
  {
    path: 'customers/:id/edit',
    loadComponent: () => import('./customer-edit/customer-edit').then(m => m.CustomerEdit)
  },
]
