import { BrandMapper } from './brand.mapper';
import { NHTSAMakeDTO } from '@vehicles/data-access/dtos/vehicle-catalog';
import { Brand } from '@vehicles/domain/models/brand.model';

describe('BrandMapper', () => {
  it('should map a single DTO to Brand', () => {
    const dto: NHTSAMakeDTO = { Make_ID: 1, Make_Name: 'Toyota' };
    const brand: Brand = BrandMapper.fromDTO(dto);
    expect(brand).toEqual({ id: 1, name: 'Toyota' });
  });

  it('should map an array of DTOs to Brands', () => {
    const dtos: NHTSAMakeDTO[] = [
      { Make_ID: 1, Make_Name: 'Toyota' },
      { Make_ID: 2, Make_Name: 'Honda' },
    ];
    const brands: Brand[] = BrandMapper.fromDTOArray(dtos);
    expect(brands).toEqual([
      { id: 1, name: 'Toyota' },
      { id: 2, name: 'Honda' },
    ]);
  });

  it('should return empty array for empty input', () => {
    expect(BrandMapper.fromDTOArray([])).toEqual([]);
  });
});
