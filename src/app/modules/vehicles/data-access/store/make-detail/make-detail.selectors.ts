
import { createFeatureSelector, createSelector } from '@ngrx/store';
import { MakeDetailState } from './make-detail.state';

export const selectMakeDetailState = createFeatureSelector<MakeDetailState>('makeDetail');

export const selectModels = createSelector(
	selectMakeDetailState,
	(state: MakeDetailState) => state.models
);

export const selectVehicleTypes = createSelector(
	selectMakeDetailState,
	(state: MakeDetailState) => state.vehicleTypes
);

export const selectLoadingModels = createSelector(
	selectMakeDetailState,
	(state: MakeDetailState) => state.loadingModels
);

export const selectLoadingTypes = createSelector(
	selectMakeDetailState,
	(state: MakeDetailState) => state.loadingTypes
);

export const selectErrorModels = createSelector(
	selectMakeDetailState,
	(state: MakeDetailState) => state.errorModels
);

export const selectErrorTypes = createSelector(
	selectMakeDetailState,
	(state: MakeDetailState) => state.errorTypes
);
