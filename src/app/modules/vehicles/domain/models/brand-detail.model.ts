import { Brand } from './brand.model';

export interface BrandDetail extends Brand {
  description?: string;
  country?: string;
}
