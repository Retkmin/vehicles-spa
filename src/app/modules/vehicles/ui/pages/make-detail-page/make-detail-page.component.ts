import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { VehiclesApiService } from '../../../data-access/services/vehicles-api.service';
import { VehicleModel } from '../../../domain/models/vehicle-model.model';
import { VehicleType } from '../../../domain/models/vehicle-type.model';

@Component({
  selector: 'app-make-detail-page',
  standalone: true,
  imports: [
    CommonModule,
    ScrollingModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule
  ],
  templateUrl: './make-detail-page.component.html',
  styleUrl: './make-detail-page.component.scss'
})
export class MakeDetailPageComponent implements OnInit {
  private static readonly VIRTUAL_SCROLL_ITEM_HEIGHT = 140;
  private static readonly CARDS_PER_ROW = 4;

  private vehiclesApiService = inject(VehiclesApiService);
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);

  makeName = signal<string>('');
  makeId = signal<number | null>(null);

  readonly itemHeight = MakeDetailPageComponent.VIRTUAL_SCROLL_ITEM_HEIGHT;

  models = signal<VehicleModel[]>([]);
  vehicleTypes = signal<VehicleType[]>([]);

  loadingModels = signal(false);
  loadingTypes = signal(false);

  errorModels = signal<string | null>(null);
  errorTypes = signal<string | null>(null);

  // Computed signals for grouping data into rows
  modelRows = signal<VehicleModel[][]>([]);
  vehicleTypeRows = signal<VehicleType[][]>([]);

  ngOnInit(): void {
    this.loadMakeInfo();
  }

  private loadMakeInfo(): void {
    const makeIdParam = this.activatedRoute.snapshot.paramMap.get('makeId');
    const makeNameParam = this.activatedRoute.snapshot.paramMap.get('makeName');

    if (!makeIdParam || !makeNameParam || isNaN(Number(makeIdParam))) {
      this.router.navigate(['/vehicles/makes']);
      return;
    }

    this.makeId.set(Number(makeIdParam));
    this.makeName.set(decodeURIComponent(makeNameParam));

    this.loadModels();
    this.loadVehicleTypes();
  }

  private loadModels(): void {
    const makeName = this.makeName();
    if (!makeName) return;

    this.loadingModels.set(true);
    this.errorModels.set(null);

    this.vehiclesApiService.getModelsForMake(makeName).subscribe({
      next: (models) => {
        this.models.set(models);
        this.modelRows.set(this.chunkArray(models, MakeDetailPageComponent.CARDS_PER_ROW));
        this.loadingModels.set(false);
      },
      error: (error) => {
        console.error('Error loading models:', error);
        this.errorModels.set('Error loading models for this make');
        this.loadingModels.set(false);
      }
    });
  }

  private loadVehicleTypes(): void {
    const makeName = this.makeName();
    if (!makeName) return;

    this.loadingTypes.set(true);
    this.errorTypes.set(null);

    this.vehiclesApiService.getVehicleTypesForMake(makeName).subscribe({
      next: (types) => {
        this.vehicleTypes.set(types);
        this.vehicleTypeRows.set(this.chunkArray(types, MakeDetailPageComponent.CARDS_PER_ROW));
        this.loadingTypes.set(false);
      },
      error: (error) => {
        console.error('Error loading vehicle types:', error);
        this.errorTypes.set('Error loading vehicle types for this make');
        this.loadingTypes.set(false);
      }
    });
  }

  public goBack(): void {
    this.router.navigate(['/vehicles/makes']);
  }

  public retryModels(): void {
    this.loadModels();
  }

  public retryTypes(): void {
    this.loadVehicleTypes();
  }

  public trackByModelId(index: number, model: VehicleModel): number {
    return model.modelId;
  }

  public trackByTypeId(index: number, type: VehicleType): number {
    return type.typeId;
  }

  public trackByRowIndex(index: number): number {
    return index;
  }

  private chunkArray<T>(array: T[], size: number): T[][] {
    const chunks: T[][] = [];
    for (let i = 0; i < array.length; i += size) {
      chunks.push(array.slice(i, i + size));
    }
    return chunks;
  }
}
