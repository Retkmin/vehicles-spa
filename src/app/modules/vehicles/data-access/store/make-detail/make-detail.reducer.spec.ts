import { makeDetailReducer } from './make-detail.reducer';
import * as MakeDetailActions from './make-detail.actions';
import { initialMakeDetailState } from './make-detail.state';

describe('makeDetailReducer', () => {
  it('should set loading flags and clear errors on loadMakeDetail', () => {
    const action = MakeDetailActions.loadMakeDetail({ makeId: 1 });
    const state = makeDetailReducer(initialMakeDetailState, action);
    expect(state.loadingModels).toBe(true);
    expect(state.loadingTypes).toBe(true);
    expect(state.errorModels).toBeNull();
    expect(state.errorTypes).toBeNull();
  });

  it('should set models and loadingModels=false on loadModelsSuccess', () => {
    const models = [{ modelId: 1, modelName: 'Corolla' }];
    const action = MakeDetailActions.loadModelsSuccess({ models });
    const state = makeDetailReducer(initialMakeDetailState, action);
    expect(state.models).toEqual(models);
    expect(state.loadingModels).toBe(false);
    expect(state.errorModels).toBeNull();
  });

  it('should set errorModels and loadingModels=false on loadModelsFailure', () => {
    const action = MakeDetailActions.loadModelsFailure({ error: 'fail' });
    const state = makeDetailReducer(initialMakeDetailState, action);
    expect(state.loadingModels).toBe(false);
    expect(state.errorModels).toBe('fail');
  });

  it('should set vehicleTypes and loadingTypes=false on loadTypesSuccess', () => {
    const types = [{ typeId: 1, typeName: 'SUV' }];
    const action = MakeDetailActions.loadTypesSuccess({ types });
    const state = makeDetailReducer(initialMakeDetailState, action);
    expect(state.vehicleTypes).toEqual(types);
    expect(state.loadingTypes).toBe(false);
    expect(state.errorTypes).toBeNull();
  });

  it('should set errorTypes and loadingTypes=false on loadTypesFailure', () => {
    const action = MakeDetailActions.loadTypesFailure({ error: 'fail' });
    const state = makeDetailReducer(initialMakeDetailState, action);
    expect(state.loadingTypes).toBe(false);
    expect(state.errorTypes).toBe('fail');
  });
});
