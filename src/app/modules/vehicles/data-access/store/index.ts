import { ActionReducerMap } from '@ngrx/store';
import { makesReducer } from './makes';
import { makeDetailReducer } from './make-detail';
import { VehiclesState } from './vehicles-state';

export const vehiclesReducers: ActionReducerMap<VehiclesState> = {
  makes: makesReducer,
  makeDetail: makeDetailReducer,
};

// Export all store modules
export * from './makes';
export * from './vehicles-state';
export * from './make-detail';
