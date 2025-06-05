import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./features/dashboard/dashboard.routes')
      .then(m => m.default)
  },
  {
    path: 'stats',
    loadChildren: () => import('./features/stats/stats.routes')
      .then(m => m.default)
  },
  {
    path: 'users',
    loadChildren: () => import('./features/users/users.routes')
    .then(m => m.default)
  },
  { path: 'propagation',
    loadChildren: () => import('./features/propagation/propagation.routes')
      .then(m => m.default)
  }

];
