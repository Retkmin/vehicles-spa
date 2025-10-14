import { VehicleModel } from '@vehicles/domain/models/vehicle-model.model';
import { VehicleType } from '@vehicles/domain/models/vehicle-type.model';

export interface MakeDetailState {
  models: VehicleModel[];
  vehicleTypes: VehicleType[];
  loadingModels: boolean;
  loadingTypes: boolean;
  errorModels: string | null;
  errorTypes: string | null;
}

export const initialMakeDetailState: MakeDetailState = {
  models: [],
  vehicleTypes: [],
  loadingModels: false,
  loadingTypes: false,
  errorModels: null,
  errorTypes: null,
};
