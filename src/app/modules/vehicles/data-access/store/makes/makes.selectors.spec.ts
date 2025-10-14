import {
  selectAllMakes,
  selectSelectedMake,
  selectMakesLoading,
  selectMakesLoadingMore,
  selectMakesError,
  selectMakesSearchTerm,
  selectMakesCurrentPage,
  selectMakesTotalCount,
  selectMakesHasMorePages,
  selectMakesCount,
  selectIsSearchingMakes,
  selectHasMakesData,
  selectMakeNameById,
  selectFilteredMakes,
} from './makes.selectors';
import { MakesState } from './makes.state';

describe('makes selectors', () => {
  const state: MakesState = {
    makes: [
      { makeId: 1, makeName: 'Toyota' },
      { makeId: 2, makeName: 'Honda' },
    ],
    selectedMake: { makeId: 2, makeName: 'Honda' },
    loading: true,
    loadingMore: false,
    error: 'fail',
    searchTerm: 'toy',
    currentPage: 2,
    totalCount: 2,
    hasMorePages: true,
  };

  it('should select all makes', () => {
    expect(selectAllMakes.projector(state)).toEqual(state.makes);
  });

  it('should select selectedMake', () => {
    expect(selectSelectedMake.projector(state)).toEqual(state.selectedMake);
  });

  it('should select loading', () => {
    expect(selectMakesLoading.projector(state)).toBe(true);
  });

  it('should select loadingMore', () => {
    expect(selectMakesLoadingMore.projector(state)).toBe(false);
  });

  it('should select error', () => {
    expect(selectMakesError.projector(state)).toBe('fail');
  });

  it('should select searchTerm', () => {
    expect(selectMakesSearchTerm.projector(state)).toBe('toy');
  });

  it('should select currentPage', () => {
    expect(selectMakesCurrentPage.projector(state)).toBe(2);
  });

  it('should select totalCount', () => {
    expect(selectMakesTotalCount.projector(state)).toBe(2);
  });

  it('should select hasMorePages', () => {
    expect(selectMakesHasMorePages.projector(state)).toBe(true);
  });

  it('should select makes count', () => {
    expect(selectMakesCount.projector(state)).toBe(2);
  });

  it('should select isSearchingMakes', () => {
    expect(selectIsSearchingMakes.projector(state)).toBe(true);
  });

  it('should select hasMakesData', () => {
    expect(selectHasMakesData.projector(state)).toBe(true);
  });

  it('should select make name by id', () => {
    expect(selectMakeNameById(2).projector(state)).toBe('Honda');
    expect(selectMakeNameById(3).projector(state)).toBe('');
  });

  it('should select filtered makes', () => {
    // searchTerm 'toy' should match 'Toyota'
    expect(selectFilteredMakes.projector(state.makes, state.searchTerm)).toEqual([
      { makeId: 1, makeName: 'Toyota' },
    ]);
    // empty searchTerm returns all
    expect(selectFilteredMakes.projector(state.makes, '')).toEqual(state.makes);
  });
});
