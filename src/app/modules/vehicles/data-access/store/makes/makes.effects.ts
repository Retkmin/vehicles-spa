import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { VehiclesApiService } from '@vehicles/data-access/services/vehicles-api.service';
import * as MakesActions from './makes.actions';

@Injectable()
export class MakesEffects {
  private actions$ = inject(Actions);
  private vehiclesApiService = inject(VehiclesApiService);

  loadMakes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MakesActions.loadMakes),
      switchMap(() =>
        this.vehiclesApiService.getAllMakes().pipe(
          map((makes) => MakesActions.loadMakesSuccess({ makes })),
          catchError((error) => {
            console.warn('Error loading makes:', error);
            return of(
              MakesActions.loadMakesFailure({
                error: error?.message || 'Failed to load makes',
              }),
            );
          }),
        ),
      ),
    ),
  );

  loadMoreMakes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(MakesActions.loadMoreMakes),
      switchMap(() =>
        this.vehiclesApiService.getAllMakes().pipe(
          map((makes) => MakesActions.loadMakesSuccess({ makes })),
          catchError((error) => {
            console.warn('Error loading more makes:', error);
            return of(
              MakesActions.loadMakesFailure({
                error: error?.message || 'Failed to load more makes',
              }),
            );
          }),
        ),
      ),
    ),
  );
}
