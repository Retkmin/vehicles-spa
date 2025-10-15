import { TestBed } from '@angular/core/testing';
import { VehiclesApiService } from './vehicles-api.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { API_CONFIG } from '@core/config/api.config';
import { getTestConfig } from '@shared/utils/test-helpers';

describe('VehiclesApiService', () => {
  let service: VehiclesApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule(getTestConfig([HttpClientTestingModule], [], undefined));
    service = TestBed.inject(VehiclesApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch all makes', () => {
    const mockResponse = {
      Results: [
        { Make_ID: 1, Make_Name: 'Toyota' },
        { Make_ID: 2, Make_Name: 'Honda' },
      ],
    };
    service.getAllMakes().subscribe((makes) => {
      expect(makes).toEqual([
        { makeId: 1, makeName: 'Toyota' },
        { makeId: 2, makeName: 'Honda' },
      ]);
    });
    const req = httpMock.expectOne(`${API_CONFIG.NHTSA.BASE_URL}/GetAllMakes?format=json`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should fetch models for a make', () => {
    const mockResponse = {
      Results: [
        { Model_ID: 10, Model_Name: 'Corolla' },
        { Model_ID: 20, Model_Name: 'Civic' },
      ],
    };
    service.getModelsForMake('Toyota').subscribe((models) => {
      expect(models).toEqual([
        { modelId: 10, modelName: 'Corolla' },
        { modelId: 20, modelName: 'Civic' },
      ]);
    });
    const req = httpMock.expectOne(
      `${API_CONFIG.NHTSA.BASE_URL}/GetModelsForMake/Toyota?format=json`,
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should fetch vehicle types for a make', () => {
    const mockResponse = {
      Results: [
        { VehicleTypeId: 100, VehicleTypeName: 'Sedan' },
        { VehicleTypeId: 200, VehicleTypeName: 'SUV' },
      ],
    };
    service.getVehicleTypesForMake('Toyota').subscribe((types) => {
      expect(types).toEqual([
        { typeId: 100, typeName: 'Sedan' },
        { typeId: 200, typeName: 'SUV' },
      ]);
    });
    const req = httpMock.expectOne(
      `${API_CONFIG.NHTSA.BASE_URL}/GetVehicleTypesForMake/Toyota?format=json`,
    );
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });
});
