import { createAction, props } from '@ngrx/store';
import { VehicleMake } from '@vehicles/domain/models/vehicle-make.model';

export const loadMakes = createAction('[Makes] Load Makes');

export const loadMakesSuccess = createAction(
  '[Makes] Load Makes Success',
  props<{ makes: VehicleMake[] }>(),
);

export const loadMakesFailure = createAction(
  '[Makes] Load Makes Failure',
  props<{ error: string }>(),
);

export const searchMakes = createAction('[Makes] Search Makes', props<{ searchTerm: string }>());

export const clearMakesSearch = createAction('[Makes] Clear Makes Search');

export const loadMoreMakes = createAction('[Makes] Load More Makes', props<{ page: number }>());

export const setSelectedMake = createAction(
  '[Makes] Set Selected Make',
  props<{ make: VehicleMake }>(),
);

export const clearSelectedMake = createAction('[Makes] Clear Selected Make');
