import { NHTSAMakeDTO } from './nhtsa-make.dto';

/**
 * DTO representing the complete response from NHTSA GetAllMakes API endpoint
 */
export interface NHTSAMakesResponse {
  Count: number;
  Message: string;
  SearchCriteria: string;
  Results: NHTSAMakeDTO[];
}
