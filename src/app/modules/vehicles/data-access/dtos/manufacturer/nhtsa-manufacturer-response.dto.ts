import { ManufacturerDTO } from './manufacturer.dto';

export interface NHTSAManufacturerResponse {
  Count: number;
  Message: string;
  SearchCriteria: string;
  Results: ManufacturerDTO[];
}
