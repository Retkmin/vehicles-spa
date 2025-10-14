import { NHTSAModelDTO } from './nhtsa-model.dto';

/**
 * DTO representing the complete response from NHTSA GetModelsForMake API endpoint
 */
export interface NHTSAModelsResponse {
  Count: number;
  Message: string;
  SearchCriteria: string;
  Results: NHTSAModelDTO[];
}
