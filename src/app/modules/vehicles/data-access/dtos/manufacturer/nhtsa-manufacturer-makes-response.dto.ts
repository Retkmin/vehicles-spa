import { NHTSAManufacturerMakeDTO } from './nhtsa-manufacturer-make.dto';

/**
 * DTO representing the complete response from NHTSA GetMakeForManufacturer API endpoint
 */
export interface NHTSAManufacturerMakesResponse {
  Count: number;
  Message: string;
  SearchCriteria: string;
  Results: NHTSAManufacturerMakeDTO[];
}
