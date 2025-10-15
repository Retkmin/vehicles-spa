import { Routes } from '@angular/router';

const publicRoutes: Routes = [
  {
    path: 'vehicles',
    loadChildren: () => import('./modules/vehicles/vehicles.routes').then(m => m.vehiclesRoutes)
  }
];

const authRoutes: Routes = [
  // Add authenticated routes here when needed
];

export const routes: Routes = [

  ...publicRoutes,
  ...authRoutes,
  {
    path: '**',
    redirectTo: '/vehicles'
  },
    {
    path: '',
    redirectTo: '/vehicles',
    pathMatch: 'full'
  },
];
