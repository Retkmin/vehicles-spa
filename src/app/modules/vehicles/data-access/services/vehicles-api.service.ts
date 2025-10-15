import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { API_CONFIG } from '@core/config/api.config';
import { VehicleMake } from '@vehicles/domain/models/vehicle-make.model';
import { VehicleModel } from '@vehicles/domain/models/vehicle-model.model';
import { VehicleType } from '@vehicles/domain/models/vehicle-type.model';
import {
  NHTSAMakesResponse,
  NHTSAModelsResponse,
  NHTSAVehicleTypesResponse,
} from '@vehicles/data-access/dtos/vehicle-catalog';

@Injectable({
  providedIn: 'root',
})
export class VehiclesApiService {
  private static readonly NHTSA_PAGE_OFFSET = 1;

  private http = inject(HttpClient);

  /**
   * Get all makes (brands) from NHTSA API
   * Returns a list of all vehicle makes available in the database
   */
  getAllMakes(): Observable<VehicleMake[]> {
    const url = `${API_CONFIG.NHTSA.BASE_URL}/GetAllMakes?format=json`;

    return this.http.get<NHTSAMakesResponse>(url).pipe(
      map((response) => {
        return response.Results?.map((make) => ({
          makeId: make.Make_ID,
          makeName: make.Make_Name,
        }));
      }),
    );
  }

  /**
   * Get models for a specific make
   */
  getModelsForMake(makeName: string): Observable<VehicleModel[]> {
    const url = `${API_CONFIG.NHTSA.BASE_URL}/GetModelsForMake/${encodeURIComponent(makeName)}?format=json`;

    return this.http.get<NHTSAModelsResponse>(url).pipe(
      map((response) => {
        return response.Results?.map((model) => ({
          modelId: model.Model_ID,
          modelName: model.Model_Name,
        }));
      }),
    );
  }

  /**
   * Get vehicle types for a specific make
   */
  getVehicleTypesForMake(makeName: string): Observable<VehicleType[]> {
    const url = `${API_CONFIG.NHTSA.BASE_URL}/GetVehicleTypesForMake/${encodeURIComponent(makeName)}?format=json`;

    return this.http.get<NHTSAVehicleTypesResponse>(url).pipe(
      map((response) => {
        return response.Results?.map((type) => ({
          typeId: type.VehicleTypeId,
          typeName: type.VehicleTypeName,
        }));
      }),
    );
  }
}
