/**
 * Generic NHTSA API response structure
 * Used as base interface for all NHTSA API responses
 */
export interface NHTSAResponse<T> {
  Count: number;
  Message: string;
  SearchCriteria: string | null;
  Results: T[];
}
