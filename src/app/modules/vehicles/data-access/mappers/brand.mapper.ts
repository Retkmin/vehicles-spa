import { Brand } from '@vehicles/domain/models/brand.model';
import { NHTSAMakeDTO } from '@vehicles/data-access/dtos/vehicle-catalog';

export class BrandMapper {
  static fromDTO(dto: NHTSAMakeDTO): Brand {
    return {
      id: dto.Make_ID,
      name: dto.Make_Name,
    };
  }

  static fromDTOArray(dtos: NHTSAMakeDTO[]): Brand[] {
    return dtos.map((dto) => this.fromDTO(dto));
  }
}
