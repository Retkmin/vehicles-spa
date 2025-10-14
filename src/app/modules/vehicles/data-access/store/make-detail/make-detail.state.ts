import { VehicleModel } from '../../../domain/models/vehicle-model.model';
import { VehicleType } from '../../../domain/models/vehicle-type.model';

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
