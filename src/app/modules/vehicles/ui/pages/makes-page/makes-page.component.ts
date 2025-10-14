import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { VehiclesApiService } from '../../../data-access/services/vehicles-api.service';
import { VehicleMake } from '../../../domain/models/vehicle-make.model';

@Component({
  selector: 'app-makes-page',
  standalone: true,
  imports: [
    CommonModule,
    ScrollingModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule
  ],
  templateUrl: './makes-page.component.html',
  styleUrl: './makes-page.component.scss'
})
export class MakesPageComponent implements OnInit {
  private static readonly VIRTUAL_SCROLL_ITEM_HEIGHT = 120;

  private vehiclesApiService = inject(VehiclesApiService);
  private router = inject(Router);

  makes = signal<VehicleMake[]>([]);
  filteredMakes = signal<VehicleMake[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);
  searchTerm = signal('');

  readonly itemHeight = MakesPageComponent.VIRTUAL_SCROLL_ITEM_HEIGHT;

  ngOnInit(): void {
    this.loadMakes();
  }

  private loadMakes(): void {
    this.loading.set(true);
    this.error.set(null);

    this.vehiclesApiService.getAllMakes().subscribe({
      next: (makes) => {
        this.makes.set(makes);
        this.filteredMakes.set(makes);
        this.loading.set(false);
      },
      error: (error) => {
        console.error('Error loading makes:', error);
        this.error.set('Error loading vehicle makes');
        this.loading.set(false);
      }
    });
  }

  public onSearchChange(searchTerm: string): void {
    this.searchTerm.set(searchTerm);
    this.filterMakes(searchTerm);
  }

  private filterMakes(searchTerm: string): void {
    const allMakes = this.makes();

    if (!searchTerm.trim()) {
      this.filteredMakes.set(allMakes);
      return;
    }

    const filtered = allMakes.filter(make =>
      make.makeName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    this.filteredMakes.set(filtered);
  }

  public viewMakeDetails(make: VehicleMake): void {
    // Navigate to make details page with models and vehicle types
    this.router.navigate(['/vehicles/makes', make.makeId, make.makeName]);
  }

  public trackByMakeId(index: number, make: VehicleMake): number {
    return make.makeId;
  }

  public goBack(): void {
    this.router.navigate(['/vehicles']);
  }

  public retryLoad(): void {
    this.loadMakes();
  }
}
