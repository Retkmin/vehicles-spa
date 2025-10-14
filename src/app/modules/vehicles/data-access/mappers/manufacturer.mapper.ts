import { ManufacturerDTO } from '../dtos/manufacturer';
import { Manufacturer } from '../../domain/models/manufacturer.model';

export class ManufacturerMapper {
  static fromDTO(dto: ManufacturerDTO): Manufacturer {
    return {
      id: dto.Mfr_ID,
      name: dto.Mfr_Name,
      commonName: dto.Mfr_CommonName || dto.Mfr_Name,
      country: dto.Country
    };
  }

  static fromDTOArray(dtos: ManufacturerDTO[]): Manufacturer[] {
    return dtos.map(dto => this.fromDTO(dto));
  }
}
