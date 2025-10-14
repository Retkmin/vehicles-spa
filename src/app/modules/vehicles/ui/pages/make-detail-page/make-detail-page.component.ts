import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTabsModule } from '@angular/material/tabs';
import { MakeDetailFacade } from '../../../data-access/facades/make-detail.facade';
import { VehiclesUiCardComponent } from '@shared/components/vehicles-ui-card/vehicles-ui-card.component';
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
    TranslateModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    VehiclesUiCardComponent
  ],
  templateUrl: './make-detail-page.component.html',
  styleUrl: './make-detail-page.component.scss'
})
export class MakeDetailPageComponent implements OnInit {
  public makeName = '';
  public makeId: number | null = null;
  private static readonly VIRTUAL_SCROLL_ITEM_HEIGHT = 140;
  private static readonly CARDS_PER_ROW = 4;

  private makeDetailFacade = inject(MakeDetailFacade);
  private activatedRoute = inject(ActivatedRoute);
  private router = inject(Router);

  readonly itemHeight = MakeDetailPageComponent.VIRTUAL_SCROLL_ITEM_HEIGHT;

  readonly models$ = this.makeDetailFacade.models$;
  readonly vehicleTypes$ = this.makeDetailFacade.vehicleTypes$;
  readonly loadingModels$ = this.makeDetailFacade.loadingModels$;
  readonly loadingTypes$ = this.makeDetailFacade.loadingTypes$;
  readonly errorModels$ = this.makeDetailFacade.errorModels$;
  readonly errorTypes$ = this.makeDetailFacade.errorTypes$;

  ngOnInit(): void {
    const makeIdParam = this.activatedRoute.snapshot.paramMap.get('makeId');
    if (!makeIdParam || isNaN(Number(makeIdParam))) {
      this.router.navigate(['/vehicles/makes']);
      return;
    }

    this.makeId = Number(makeIdParam);
    this.makeDetailFacade.loadMakeDetail(this.makeId);
  }

  public goBack(): void {
    this.router.navigate(['/vehicles/makes']);
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
}
