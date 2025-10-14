import { createReducer, on } from '@ngrx/store';
import { initialMakeDetailState } from './make-detail.state';
import * as MakeDetailActions from './make-detail.actions';

export const makeDetailReducer = createReducer(
  initialMakeDetailState,
  on(MakeDetailActions.loadMakeDetail, (state) => ({
    ...state,
    loadingModels: true,
    loadingTypes: true,
    errorModels: null,
    errorTypes: null,
  })),
  on(MakeDetailActions.loadModelsSuccess, (state, { models }) => ({
    ...state,
    models,
    loadingModels: false,
    errorModels: null,
  })),
  on(MakeDetailActions.loadModelsFailure, (state, { error }) => ({
    ...state,
    loadingModels: false,
    errorModels: error,
  })),
  on(MakeDetailActions.loadTypesSuccess, (state, { types }) => ({
    ...state,
    vehicleTypes: types,
    loadingTypes: false,
    errorTypes: null,
  })),
  on(MakeDetailActions.loadTypesFailure, (state, { error }) => ({
    ...state,
    loadingTypes: false,
    errorTypes: error,
  }))
);
