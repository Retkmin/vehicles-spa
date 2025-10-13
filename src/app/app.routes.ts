import { Routes } from '@angular/router';

// Public routes
const publicRoutes: Routes = [
  {
    path: '',
    redirectTo: '/vehicles',
    pathMatch: 'full'
  },
    {
    path: '**',
    redirectTo: '/vehicles'
  }

];

// Authentication routes
const authRoutes: Routes = [];

export const routes: Routes = [
  ...publicRoutes,
  ...authRoutes,
];
