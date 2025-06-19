import { Routes } from '@angular/router';
import { authGuard } from './features/services/auth.guard';

export const routes: Routes = [
  {
    path: '',
    canActivate: [authGuard],
    loadChildren: () => import('./features/dashboard/dashboard.routes')
      .then(m => m.default)
  },
  {
    path: 'stats',
    canActivate: [authGuard],
    loadChildren: () => import('./features/stats/stats.routes')
      .then(m => m.default)
  },
  {
    path: 'users',
    canActivate: [authGuard],
    loadChildren: () => import('./features/users/users.routes')
    .then(m => m.default)
  },
  {
    path: 'propagation',
    canActivate: [authGuard],
    loadChildren: () => import('./features/propagation/propagation.routes')
      .then(m => m.default)
  },
  {
    path: 'connexion',
    loadChildren: () => import('./features/connexion/connexion.routes')
      .then(m => m.default)
  },
  {
    path: 'register',
    loadChildren: () => import('./features/register/register.routes').then(m => m.default)
  }

];
