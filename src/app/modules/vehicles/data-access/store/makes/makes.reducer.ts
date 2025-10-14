import { createReducer, on } from '@ngrx/store';
import * as MakesActions from './makes.actions';
import { MakesState, initialMakesState } from './makes.state';

export const makesReducer = createReducer(
  initialMakesState,

  on(MakesActions.loadMakes, (state): MakesState => ({
    ...state,
    loading: true,
    error: null
  })),
  on(MakesActions.loadMakesSuccess, (state, { makes }): MakesState => ({
    ...state,
    makes: makes,
    loading: false,
    error: null,
    currentPage: 1,
    totalCount: makes.length
  })),
  on(MakesActions.loadMakesFailure, (state, { error }): MakesState => ({
    ...state,
    loading: false,
    error
  })),
  on(MakesActions.searchMakes, (state, { searchTerm }): MakesState => ({
    ...state,
    searchTerm
  })),
  on(MakesActions.clearMakesSearch, (state): MakesState => ({
    ...state,
    searchTerm: ''
  })),
  on(MakesActions.loadMoreMakes, (state): MakesState => ({
    ...state,
    loadingMore: true,
    error: null
  })),
  on(MakesActions.setSelectedMake, (state, { make }): MakesState => ({
    ...state,
    selectedMake: make
  })),
  on(MakesActions.clearSelectedMake, (state): MakesState => ({
    ...state,
    selectedMake: null
  }))
);
