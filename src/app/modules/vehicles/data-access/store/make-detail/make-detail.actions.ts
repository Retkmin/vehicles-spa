import { createAction, props } from '@ngrx/store';
import { VehicleModel } from '../../../domain/models/vehicle-model.model';
import { VehicleType } from '../../../domain/models/vehicle-type.model';

export const loadMakeDetail = createAction(
  '[MakeDetail] Load Make Detail',
  props<{ makeId: number }>()
);


export const loadModelsSuccess = createAction(
  '[MakeDetail] Load Models Success',
  props<{ models: VehicleModel[] }>()
);
export const loadModelsFailure = createAction(
  '[MakeDetail] Load Models Failure',
  props<{ error: string }>()
);

export const loadTypesSuccess = createAction(
  '[MakeDetail] Load Types Success',
  props<{ types: VehicleType[] }>()
);
export const loadTypesFailure = createAction(
  '[MakeDetail] Load Types Failure',
  props<{ error: string }>()
);
