import { Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./dashboard/dashboard.routes')
      .then(m => m.default)
  },
  {
    path: 'stats',
    loadChildren: () => import('./stats/stats.routes')
      .then(m => m.default)
  },
  {
    path: 'users',
    loadChildren: () => import('./users/users.routes')
    .then(m => m.default)
  }
];

export default routes;