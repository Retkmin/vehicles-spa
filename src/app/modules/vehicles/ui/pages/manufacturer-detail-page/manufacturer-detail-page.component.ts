import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { VehiclesApiService } from '../../../data-access/services/vehicles-api.service';
import { ManufacturerDetails } from '../../../domain/models/manufacturer-details.model';

@Component({
  selector: 'app-manufacturer-detail-page',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './manufacturer-detail-page.component.html',
  styleUrl: './manufacturer-detail-page.component.scss'
})
export class ManufacturerDetailPageComponent implements OnInit {
  private vehiclesApiService = inject(VehiclesApiService);
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);

  manufacturerDetails = signal<ManufacturerDetails | null>(null);
  loading = signal(false);
  error = signal<string | null>(null);
  manufacturerId = signal<number | null>(null);

  ngOnInit(): void {
    this.loadManufacturerDetails();
  }

  private loadManufacturerDetails(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('id');

    if (!id || isNaN(Number(id))) {
      this.error.set('ID de fabricante inválido');
      return;
    }

    const manufacturerId = Number(id);
    this.manufacturerId.set(manufacturerId);
    this.loading.set(true);
    this.error.set(null);

    this.vehiclesApiService.getManufacturerDetails(manufacturerId).subscribe({
      next: (details) => {
        this.manufacturerDetails.set(details);
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Error loading manufacturer details:', error);
        this.error.set('Error al cargar los detalles del fabricante');
        this.loading.set(false);
      }
    });
  }

  public goBack(): void {
    this.router.navigate(['/vehicles']);
  }

  public hasContactInfo(): boolean {
    const details = this.manufacturerDetails();
    if (!details) return false;

    return !!(details.contact.email || details.contact.phone || details.contact.fax);
  }

  public hasPrincipalInfo(): boolean {
    const details = this.manufacturerDetails();
    if (!details) return false;

    return !!(details.principal.firstName || details.principal.lastName || details.principal.position);
  }

  public hasBusinessInfo(): boolean {
    const details = this.manufacturerDetails();
    if (!details) return false;

    return !!(details.businessInfo.primaryProduct || details.businessInfo.dbas || details.businessInfo.otherDetails);
  }
}
