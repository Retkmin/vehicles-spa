import { ManufacturerDetailsDTO } from '../dtos/manufacturer';
import { ManufacturerDetails } from '../../domain/models/manufacturer-details.model';

export class ManufacturerDetailsMapper {
  static fromDTO(dto: ManufacturerDetailsDTO): ManufacturerDetails {
    return {
      id: dto.Mfr_ID,
      name: dto.Mfr_Name,
      commonName: dto.Mfr_CommonName,
      address: {
        street: dto.Address,
        street2: dto.Address2,
        city: dto.City,
        stateProvince: dto.StateProvince,
        postalCode: dto.PostalCode,
        country: dto.Country
      },
      contact: {
        email: dto.ContactEmail,
        phone: dto.ContactPhone,
        fax: dto.ContactFax
      },
      principal: {
        firstName: dto.PrincipalFirstName,
        lastName: dto.PrincipalLastName,
        position: dto.PrincipalPosition
      },
      businessInfo: {
        primaryProduct: dto.PrimaryProduct,
        dbas: dto.DBAs,
        otherDetails: dto.OtherManufacturerDetails
      },
      lastUpdated: dto.LastUpdated
    };
  }
}
