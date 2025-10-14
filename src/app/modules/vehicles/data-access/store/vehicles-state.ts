import { MakesState } from './makes';
import { MakeDetailState } from './make-detail';

export interface VehiclesState {
  makes: MakesState;
  makeDetail: MakeDetailState;
}
