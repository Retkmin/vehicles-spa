/**
 * DTO representing a single manufacturer make relationship from NHTSA API
 */
export interface NHTSAManufacturerMakeDTO {
  MakeId: number;
  MakeName: string;
  MfrId: number;
  MfrName: string;
}
