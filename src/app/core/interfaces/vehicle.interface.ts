export interface Vehicle {
  id: string;
  make: string;
  model: string;
  year: number;
  color: string;
  vin: string;
  licensePlate?: string;
  mileage?: number;
  fuelType: FuelType;
  transmission: TransmissionType;
  bodyType: BodyType;
  engineCapacity?: number;
  doors?: number;
  seats?: number;
  price?: number;
  isAvailable: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export enum FuelType {
  GASOLINE = 'gasoline',
  DIESEL = 'diesel',
  HYBRID = 'hybrid',
  ELECTRIC = 'electric',
  PLUGIN_HYBRID = 'plugin_hybrid'
}

export enum TransmissionType {
  MANUAL = 'manual',
  AUTOMATIC = 'automatic',
  CVT = 'cvt'
}

export enum BodyType {
  SEDAN = 'sedan',
  HATCHBACK = 'hatchback',
  SUV = 'suv',
  WAGON = 'wagon',
  COUPE = 'coupe',
  CONVERTIBLE = 'convertible',
  PICKUP = 'pickup',
  VAN = 'van'
}

export interface VehicleFilter {
  make?: string;
  model?: string;
  yearFrom?: number;
  yearTo?: number;
  fuelType?: FuelType;
  transmission?: TransmissionType;
  bodyType?: BodyType;
  priceFrom?: number;
  priceTo?: number;
  isAvailable?: boolean;
}

export interface VehicleApiResponse {
  vehicles: Vehicle[];
  total: number;
  page: number;
  limit: number;
  hasNext: boolean;
  hasPrevious: boolean;
}