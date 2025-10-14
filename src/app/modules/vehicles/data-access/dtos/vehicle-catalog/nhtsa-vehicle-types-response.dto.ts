import { NHTSAVehicleTypeDTO } from './nhtsa-vehicle-type.dto';

/**
 * DTO representing the complete response from NHTSA GetVehicleTypesForMake API endpoint
 */
export interface NHTSAVehicleTypesResponse {
  Count: number;
  Message: string;
  SearchCriteria: string;
  Results: NHTSAVehicleTypeDTO[];
}
