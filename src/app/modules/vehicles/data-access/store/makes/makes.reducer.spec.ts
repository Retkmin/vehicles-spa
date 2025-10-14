import { makesReducer } from './makes.reducer';
import * as MakesActions from './makes.actions';
import { initialMakesState } from './makes.state';

describe('makesReducer', () => {
  it('should set loading true and clear error on loadMakes', () => {
    const action = MakesActions.loadMakes();
    const state = makesReducer(initialMakesState, action);
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('should set makes, loading false, currentPage=1, totalCount on loadMakesSuccess', () => {
    const makes = [{ makeId: 1, makeName: 'Toyota' }];
    const action = MakesActions.loadMakesSuccess({ makes });
    const state = makesReducer(initialMakesState, action);
    expect(state.makes).toEqual(makes);
    expect(state.loading).toBe(false);
    expect(state.error).toBeNull();
    expect(state.currentPage).toBe(1);
    expect(state.totalCount).toBe(makes.length);
  });

  it('should set error and loading false on loadMakesFailure', () => {
    const action = MakesActions.loadMakesFailure({ error: 'fail' });
    const state = makesReducer(initialMakesState, action);
    expect(state.loading).toBe(false);
    expect(state.error).toBe('fail');
  });

  it('should set searchTerm on searchMakes', () => {
    const action = MakesActions.searchMakes({ searchTerm: 'toyota' });
    const state = makesReducer(initialMakesState, action);
    expect(state.searchTerm).toBe('toyota');
  });

  it('should clear searchTerm on clearMakesSearch', () => {
    const prevState = { ...initialMakesState, searchTerm: 'toyota' };
    const action = MakesActions.clearMakesSearch();
    const state = makesReducer(prevState, action);
    expect(state.searchTerm).toBe('');
  });

  it('should set loadingMore true and clear error on loadMoreMakes', () => {
    const action = MakesActions.loadMoreMakes({ page: 2 });
    const state = makesReducer(initialMakesState, action);
    expect(state.loadingMore).toBe(true);
    expect(state.error).toBeNull();
  });

  it('should set selectedMake on setSelectedMake', () => {
    const make = { makeId: 1, makeName: 'Toyota' };
    const action = MakesActions.setSelectedMake({ make });
    const state = makesReducer(initialMakesState, action);
    expect(state.selectedMake).toEqual(make);
  });

  it('should clear selectedMake on clearSelectedMake', () => {
    const prevState = { ...initialMakesState, selectedMake: { makeId: 1, makeName: 'Toyota' } };
    const action = MakesActions.clearSelectedMake();
    const state = makesReducer(prevState, action);
    expect(state.selectedMake).toBeNull();
  });
});
