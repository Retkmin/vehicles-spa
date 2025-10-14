import {
  selectModels,
  selectVehicleTypes,
  selectLoadingModels,
  selectLoadingTypes,
  selectErrorModels,
  selectErrorTypes,
} from './make-detail.selectors';
import { MakeDetailState } from './make-detail.state';

describe('make-detail selectors', () => {
  const state: MakeDetailState = {
    models: [{ modelId: 1, modelName: 'Corolla' }],
    vehicleTypes: [{ typeId: 1, typeName: 'SUV' }],
    loadingModels: true,
    loadingTypes: false,
    errorModels: 'fail-models',
    errorTypes: null,
  };

  it('should select models', () => {
    expect(selectModels.projector(state)).toEqual(state.models);
  });

  it('should select vehicleTypes', () => {
    expect(selectVehicleTypes.projector(state)).toEqual(state.vehicleTypes);
  });

  it('should select loadingModels', () => {
    expect(selectLoadingModels.projector(state)).toBe(true);
  });

  it('should select loadingTypes', () => {
    expect(selectLoadingTypes.projector(state)).toBe(false);
  });

  it('should select errorModels', () => {
    expect(selectErrorModels.projector(state)).toBe('fail-models');
  });

  it('should select errorTypes', () => {
    expect(selectErrorTypes.projector(state)).toBeNull();
  });
});
