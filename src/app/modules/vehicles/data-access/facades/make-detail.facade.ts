import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { VehiclesState } from '@vehicles/data-access/store/vehicles-state';
import { VehicleModel } from '@vehicles/domain/models/vehicle-model.model';
import { VehicleType } from '@vehicles/domain/models/vehicle-type.model';
import {
  loadMakeDetail,
  selectModels,
  selectVehicleTypes,
  selectLoadingModels,
  selectLoadingTypes,
  selectErrorModels,
  selectErrorTypes,
} from '@vehicles/data-access/store/make-detail';

@Injectable({ providedIn: 'root' })
export class MakeDetailFacade {
  private store = inject(Store<VehiclesState>);

  readonly models$: Observable<VehicleModel[]> = this.store.select(selectModels);
  readonly vehicleTypes$: Observable<VehicleType[]> = this.store.select(selectVehicleTypes);
  readonly loadingModels$: Observable<boolean> = this.store.select(selectLoadingModels);
  readonly loadingTypes$: Observable<boolean> = this.store.select(selectLoadingTypes);
  readonly errorModels$: Observable<string | null> = this.store.select(selectErrorModels);
  readonly errorTypes$: Observable<string | null> = this.store.select(selectErrorTypes);

  loadMakeDetail(makeId: number): void {
    this.store.dispatch(loadMakeDetail({ makeId }));
  }
}
