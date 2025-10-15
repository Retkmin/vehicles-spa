export interface ManufacturerDetailsDTO {
  Address: string | null;
  Address2: string | null;
  City: string | null;
  ContactEmail: string | null;
  ContactFax: string | null;
  ContactPhone: string | null;
  Country: string | null;
  DBAs: string | null;
  EquipmentItems: unknown[];
  LastUpdated: string | null;
  ManufacturerTypes: unknown[];
  Mfr_CommonName: string | null;
  Mfr_ID: number;
  Mfr_Name: string;
  OtherManufacturerDetails: string | null;
  PostalCode: string | null;
  PrimaryProduct: string | null;
  PrincipalFirstName: string | null;
  PrincipalLastName: string | null;
  PrincipalPosition: string | null;
  StateProvince: string | null;
  SubmittedName: string | null;
  SubmittedOn: string | null;
  SubmittedPosition: string | null;
  VehicleTypes: unknown[];
}
