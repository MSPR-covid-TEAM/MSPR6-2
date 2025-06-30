import { Routes } from '@angular/router';
import { authGuard } from './features/services/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./features/home/home.routes').then(m => m.default)
  },
   {
    path: 'connexion',
    loadChildren: () => import('./features/connexion/connexion.routes').then(m => m.default)
  },
  {
    path: 'register',
    loadChildren: () => import('./features/register/register.routes').then(m => m.default)
  },
  {
    path: 'fr-cluster',
    canActivate: [authGuard],
    loadChildren: () => import('./features/fr-cluster/fr-cluster.routes').then(m => m.default)
  },
  {
    path: 'us-cluster',
    canActivate: [authGuard],
    loadChildren: () => import('./features/us-cluster/us-cluster.routes').then(m => m.default)
  },
  {
    path: 'ch-cluster',
    canActivate: [authGuard],
    loadChildren: () => import('./features/ch-cluster/ch-cluster.routes').then(m => m.default)
  },
];