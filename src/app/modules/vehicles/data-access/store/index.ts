import { ActionReducerMap } from '@ngrx/store';
import { makesReducer, MakesState } from './makes';
import { makeDetailReducer, MakeDetailState } from './make-detail';

export interface VehiclesState {
  makes: MakesState;
  makeDetail: MakeDetailState;
}

export const vehiclesReducers: ActionReducerMap<VehiclesState> = {
  makes: makesReducer,
  makeDetail: makeDetailReducer
};

// Export all store modules
export * from './makes';
export * from './vehicles-state';
export * from './make-detail';
