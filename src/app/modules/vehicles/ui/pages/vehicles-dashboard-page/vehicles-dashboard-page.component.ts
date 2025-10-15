import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-vehicles-dashboard-page',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './vehicles-dashboard-page.component.html',
  styleUrl: './vehicles-dashboard-page.component.scss'
})
export class VehiclesDashboardPageComponent {
  private router = inject(Router);

  public navigateToManufacturers(): void {
    this.router.navigate(['/vehicles/manufacturers']);
  }

  public navigateToMakes(): void {
    this.router.navigate(['/vehicles/makes']);
  }
}
