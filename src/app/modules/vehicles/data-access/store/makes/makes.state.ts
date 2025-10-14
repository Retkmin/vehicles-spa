import { VehicleMake } from '@vehicles/domain/models/vehicle-make.model';

export interface MakesState {
  makes: VehicleMake[];
  selectedMake: VehicleMake | null;
  loading: boolean;
  loadingMore: boolean;
  error: string | null;
  searchTerm: string;
  currentPage: number;
  hasMorePages: boolean;
  totalCount: number;
}

export const initialMakesState: MakesState = {
  makes: [],
  selectedMake: null,
  loading: false,
  loadingMore: false,
  error: null,
  searchTerm: '',
  currentPage: 1,
  hasMorePages: true,
  totalCount: 0,
};
