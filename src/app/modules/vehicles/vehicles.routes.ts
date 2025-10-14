import { Routes } from '@angular/router';

export const vehiclesRoutes: Routes = [
  {
    path: '',
    loadComponent: () => import('./ui/pages/vehicles-dashboard-page/vehicles-dashboard-page.component').then(m => m.VehiclesDashboardPageComponent),
    title: 'Vehicles Dashboard'
  },
  {
    path: 'manufacturers',
    loadComponent: () => import('./ui/pages/vehicle-manufacturer-page/manufacturer-list-page.component').then(m => m.ManufacturerListPageComponent),
    title: 'Vehicle Manufacturers'
  },
  {
    path: 'manufacturers/:id',
    loadComponent: () => import('./ui/pages/manufacturer-detail-page/manufacturer-detail-page.component').then(m => m.ManufacturerDetailPageComponent),
    title: 'Manufacturer Details'
  },
  {
    path: 'makes',
    loadComponent: () => import('./ui/pages/makes-page/makes-page.component').then(m => m.MakesPageComponent),
    title: 'Vehicle Makes'
  },
  {
    path: 'makes/:makeId/:makeName',
    loadComponent: () => import('./ui/pages/make-detail-page/make-detail-page.component').then(m => m.MakeDetailPageComponent),
    title: 'Make Details'
  }
];
