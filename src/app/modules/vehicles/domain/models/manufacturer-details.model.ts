export interface ManufacturerDetails {
  readonly id: number;
  readonly name: string;
  readonly commonName: string | null;
  readonly address: {
    readonly street: string | null;
    readonly street2: string | null;
    readonly city: string | null;
    readonly stateProvince: string | null;
    readonly postalCode: string | null;
    readonly country: string | null;
  };
  readonly contact: {
    readonly email: string | null;
    readonly phone: string | null;
    readonly fax: string | null;
  };
  readonly principal: {
    readonly firstName: string | null;
    readonly lastName: string | null;
    readonly position: string | null;
  };
  readonly businessInfo: {
    readonly primaryProduct: string | null;
    readonly dbas: string | null;
    readonly otherDetails: string | null;
  };
  readonly lastUpdated: string | null;
}
