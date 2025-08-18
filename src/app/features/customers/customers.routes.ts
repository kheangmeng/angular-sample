export default [
  {
    path: 'customers',
    loadComponent: () => import('./customer-list/customer-list').then(m => m.CustomerList)
  },
  // {
  //   path: 'customers/:id',
  //   loadComponent: () => import('./customer-edit/customer-edit').then(m => m.CustomerEdit)
  // }
]
