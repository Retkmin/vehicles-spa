import { createSelector, createFeatureSelector } from '@ngrx/store';
import { MakesState } from './makes.state';

export const selectMakesState = createFeatureSelector<MakesState>('makes');

export const selectAllMakes = createSelector(
  selectMakesState,
  (state: MakesState) => state.makes
);

export const selectSelectedMake = createSelector(
  selectMakesState,
  (state: MakesState) => state.selectedMake
);

export const selectMakesLoading = createSelector(
  selectMakesState,
  (state: MakesState) => state.loading
);

export const selectMakesLoadingMore = createSelector(
  selectMakesState,
  (state: MakesState) => state.loadingMore
);

export const selectMakesError = createSelector(
  selectMakesState,
  (state: MakesState) => state.error
);

export const selectMakesSearchTerm = createSelector(
  selectMakesState,
  (state: MakesState) => state.searchTerm
);

export const selectMakesCurrentPage = createSelector(
  selectMakesState,
  (state: MakesState) => state.currentPage
);

export const selectMakesTotalCount = createSelector(
  selectMakesState,
  (state: MakesState) => state.totalCount
);

export const selectMakesHasMorePages = createSelector(
  selectMakesState,
  (state: MakesState) => state.hasMorePages
);

export const selectMakesCount = createSelector(
  selectMakesState,
  (state: MakesState) => state.makes.length
);


export const selectIsSearchingMakes = createSelector(
  selectMakesState,
  (state: MakesState) => state.searchTerm.length > 0
);

export const selectHasMakesData = createSelector(
  selectMakesState,
  (state: MakesState) => state.makes.length > 0
);

export const selectMakeNameById = (makeId: number) => createSelector(
  selectMakesState,
  (state: MakesState) => {
    const make = state.makes.find(m => m.makeId === makeId);
    return make ? make.makeName : '';
  }
);

export const selectFilteredMakes = createSelector(
  selectAllMakes,
  selectMakesSearchTerm,
  (makes, searchTerm) => {
    if (!searchTerm) return makes;
    const lowerTerm = searchTerm.toLowerCase();
    return makes.filter(make =>
      make.makeName?.toLowerCase().includes(lowerTerm)
    );
  }
);
