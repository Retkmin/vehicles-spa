import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { VehiclesApiService } from '@vehicles/data-access/services/vehicles-api.service';
import * as MakeDetailActions from './make-detail.actions';
import { catchError, map, mergeMap, of, withLatestFrom } from 'rxjs';
import { Store } from '@ngrx/store';
import { VehiclesState } from '@vehicles/data-access/store/vehicles-state';

@Injectable()
export class MakeDetailEffects {
  private actions$ = inject(Actions);
  private vehiclesApiService = inject(VehiclesApiService);
  private store = inject(Store<VehiclesState>);

  loadMakeDetail$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MakeDetailActions.loadMakeDetail),
      withLatestFrom(this.store.select((state) => state.makes)),
      mergeMap(([action, makesState]) => {
        const makeName =
          makesState.makes.find(
            (m: { makeId: number; makeName: string }) => m.makeId === action.makeId,
          )?.makeName || '';
        console.warn('[MakeDetailEffect] Calling getModelsForMake with:', makeName);
        return this.vehiclesApiService.getModelsForMake(makeName).pipe(
          map((models) => MakeDetailActions.loadModelsSuccess({ models })),
          catchError((error) =>
            of(
              MakeDetailActions.loadModelsFailure({
                error: error.message || 'Error loading models',
              }),
            ),
          ),
        );
      }),
    ),
  );

  loadVehicleTypes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MakeDetailActions.loadMakeDetail),
      withLatestFrom(this.store.select((state) => state.makes)),
      mergeMap(([action, makesState]) => {
        const makeName =
          makesState.makes.find(
            (m: { makeId: number; makeName: string }) => m.makeId === action.makeId,
          )?.makeName || '';
        console.warn('[MakeDetailEffect] Calling getVehicleTypesForMake with:', makeName);
        return this.vehiclesApiService.getVehicleTypesForMake(makeName).pipe(
          map((types) => MakeDetailActions.loadTypesSuccess({ types })),
          catchError((error) =>
            of(
              MakeDetailActions.loadTypesFailure({ error: error.message || 'Error loading types' }),
            ),
          ),
        );
      }),
    ),
  );
}
