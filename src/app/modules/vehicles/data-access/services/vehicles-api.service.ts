import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { API_CONFIG } from '@core/config/api.config';
import { Manufacturer } from '../../domain/models/manufacturer.model';
import { ManufacturerDetails } from '../../domain/models/manufacturer-details.model';
import { VehicleMake, VehicleModel, VehicleType } from '../../domain/models/vehicle-catalog.model';
import { NHTSAManufacturerResponse, NHTSAManufacturerDetailsResponse } from '../dtos/manufacturer';
import { NHTSAMakesResponse, NHTSAModelsResponse, NHTSAVehicleTypesResponse } from '../dtos/vehicle-catalog';
import { ManufacturerMapper } from '../mappers/manufacturer.mapper';
import { ManufacturerDetailsMapper } from '../mappers/manufacturer-details.mapper';

@Injectable({
  providedIn: 'root'
})
export class VehiclesApiService {
  private static readonly NHTSA_PAGE_OFFSET = 1;

  private http = inject(HttpClient);

  /**
   * Get manufacturers with pagination from NHTSA API
   * Returns a paginated list of manufacturers with hasMore indicator
   */
  getManufacturersPaginated(page: number): Observable<{ manufacturers: Manufacturer[], hasMore: boolean }> {
    const nhtsaPage = page + VehiclesApiService.NHTSA_PAGE_OFFSET;
    const url = `${API_CONFIG.NHTSA.BASE_URL}/GetAllManufacturers?format=json&page=${nhtsaPage}`;

    return this.http.get<NHTSAManufacturerResponse>(url).pipe(
      map(response => {
        const manufacturers = ManufacturerMapper.fromDTOArray(response.Results || []);

        return {
          manufacturers,
          hasMore: manufacturers.length > 0
        };
      })
    );
  }

  /**
   * Get detailed information for a specific manufacturer
   * Returns complete manufacturer details including contact info and business data
   */
  getManufacturerDetails(manufacturerId: number): Observable<ManufacturerDetails | null> {
    const url = `${API_CONFIG.NHTSA.BASE_URL}/GetManufacturerDetails/${manufacturerId}?format=json`;

    return this.http.get<NHTSAManufacturerDetailsResponse>(url).pipe(
      map(response => {
        const detailsData = response.Results?.[0];
        return detailsData ? ManufacturerDetailsMapper.fromDTO(detailsData) : null;
      })
    );
  }

  /**
   * Get all makes (brands) from NHTSA API
   * Returns a list of all vehicle makes available in the database
   */
  getAllMakes(): Observable<VehicleMake[]> {
    const url = `${API_CONFIG.NHTSA.BASE_URL}/GetAllMakes?format=json`;

    return this.http.get<NHTSAMakesResponse>(url).pipe(
      map(response => {
        return response.Results?.map(make => ({
          makeId: make.Make_ID,
          makeName: make.Make_Name
        })) || [];
      }),
      catchError(error => {
        console.error('Error fetching makes:', error);
        return of([]);
      })
    );
  }

  /**
   * Get models for a specific make
   * @param makeName Name of the manufacturer/make
   */
  getModelsForMake(makeName: string): Observable<VehicleModel[]> {
    const url = `${API_CONFIG.NHTSA.BASE_URL}/GetModelsForMake/${encodeURIComponent(makeName)}?format=json`;

    return this.http.get<NHTSAModelsResponse>(url).pipe(
      map(response => {
        return response.Results?.map(model => ({
          modelId: model.Model_ID,
          modelName: model.Model_Name
        })) || [];
      }),
      catchError(error => {
        console.error('Error fetching models for make:', error);
        return of([]);
      })
    );
  }

  /**
   * Get vehicle types for a specific make
   * @param makeName Name of the manufacturer/make
   */
  getVehicleTypesForMake(makeName: string): Observable<VehicleType[]> {
    const url = `${API_CONFIG.NHTSA.BASE_URL}/GetVehicleTypesForMake/${encodeURIComponent(makeName)}?format=json`;

    return this.http.get<NHTSAVehicleTypesResponse>(url).pipe(
      map(response => {
        return response.Results?.map(type => ({
          typeId: type.VehicleTypeId,
          typeName: type.VehicleTypeName
        })) || [];
      }),
      catchError(error => {
        console.error('Error fetching vehicle types for make:', error);
        return of([]);
      })
    );
  }

}
