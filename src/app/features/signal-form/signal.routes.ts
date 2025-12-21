export default [
  {
    path: 'register',
    loadComponent: () => import('./register/register').then(m => m.RegisterForm)
  },
]
