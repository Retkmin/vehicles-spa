import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { VehiclesApiService } from '../../../data-access/services/vehicles-api.service';
import { Manufacturer } from '../../../domain/models/manufacturer.model';

@Component({
  selector: 'app-manufacturer-list-page',
  standalone: true,
  imports: [
    CommonModule,
    ScrollingModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule
  ],
  templateUrl: './manufacturer-list-page.component.html',
  styleUrl: './manufacturer-list-page.component.scss'
})
export class ManufacturerListPageComponent {
  private static readonly VIRTUAL_SCROLL_ITEM_HEIGHT = 97;
  private static readonly SCROLL_BUFFER_THRESHOLD = 25;
  private static readonly INITIAL_PAGE = 0;

  private vehiclesApiService = inject(VehiclesApiService);
  private router = inject(Router);

  manufacturers = signal<Manufacturer[]>([]);
  loading = signal(false);
  loadingMore = signal(false);
  currentPage = signal(ManufacturerListPageComponent.INITIAL_PAGE);
  hasMoreData = signal(true);

  readonly itemHeight = ManufacturerListPageComponent.VIRTUAL_SCROLL_ITEM_HEIGHT;

  constructor() {
    this.loadInitialData();
  }

  private loadInitialData(): void {
    this.loading.set(true);
  this.loadPage(ManufacturerListPageComponent.INITIAL_PAGE);
  }

  public onScrollIndexChange(index: number): void {
    const currentManufacturers = this.manufacturers();
    const totalItems = currentManufacturers.length;
  const threshold = Math.max(0, totalItems - ManufacturerListPageComponent.SCROLL_BUFFER_THRESHOLD);

    const shouldLoadMore =
      index >= threshold &&
      !this.loadingMore() &&
      this.hasMoreData();

    if (shouldLoadMore) {
      this.loadMore();
    }
  }

  public trackByManufacturerId(index: number, manufacturer: Manufacturer): number {
    return manufacturer.id;
  }

  public navigateToManufacturerDetail(manufacturer: Manufacturer): void {
    this.router.navigate(['/vehicles/manufacturers', manufacturer.id]);
  }

  public goToDashboard(): void {
    this.router.navigate(['/vehicles']);
  }

  private loadMore(): void {
    if (this.loadingMore() || !this.hasMoreData()) {
      return;
    }

  this.loadPage(this.currentPage() + 1);
  }

  private loadPage(page: number): void {
  const isInitialLoad = page === ManufacturerListPageComponent.INITIAL_PAGE;

    if (!isInitialLoad) {
      this.loadingMore.set(true);
    }

    this.vehiclesApiService.getManufacturersPaginated(page).subscribe({
      next: (response) => {

        if (isInitialLoad) {
          this.manufacturers.set(response.manufacturers);
          this.loading.set(false);
        } else {
          this.manufacturers.update(current => [...current, ...response.manufacturers]);
          this.loadingMore.set(false);
        }

        this.currentPage.set(page);
        this.hasMoreData.set(response.hasMore);
      },
      error: (error) => {
        console.warn('Error loading the manufacturers:', error);
        this.loading.set(false);
        this.loadingMore.set(false);
      }
    });
  }

}
