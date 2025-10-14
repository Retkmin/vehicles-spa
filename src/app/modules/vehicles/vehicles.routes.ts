import { Routes } from '@angular/router';

export const vehiclesRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./ui/pages/vehicles-dashboard-page/vehicles-dashboard-page.component').then(m => m.VehiclesDashboardPageComponent),
    title: 'Vehicles Dashboard'
  },
  {
    path: 'makes',
    loadComponent: () => import('./ui/pages/vehicle-makes-page/makes-page.component').then(m => m.MakesPageComponent),
    title: 'Vehicle Makes'
  },
  {
    path: 'makes/:makeId',
    loadComponent: () => import('./ui/pages/make-detail-page/make-detail-page.component').then(m => m.MakeDetailPageComponent),
    title: 'Make Details'
  }
];
