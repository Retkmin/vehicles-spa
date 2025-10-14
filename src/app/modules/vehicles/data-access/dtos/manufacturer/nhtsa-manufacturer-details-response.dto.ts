import { ManufacturerDetailsDTO } from './manufacturer-details.dto';

export interface NHTSAManufacturerDetailsResponse {
  Count: number;
  Message: string;
  SearchCriteria: string | null;
  Results: ManufacturerDetailsDTO[];
}
