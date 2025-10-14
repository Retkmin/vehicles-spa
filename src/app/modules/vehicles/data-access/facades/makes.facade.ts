import { Injectable, inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { VehiclesState } from '../store';
import * as MakesActions from '../store/makes/makes.actions';
import * as MakesSelectors from '../store/makes/makes.selectors';
import { VehicleMake } from '../../domain/models/vehicle-make.model';

@Injectable({ providedIn: 'root' })
export class MakesFacade {
  private store = inject(Store<VehiclesState>);

  makes$ = this.store.select(MakesSelectors.selectAllMakes);
  filteredMakes$ = this.store.select(MakesSelectors.selectFilteredMakes);
  loading$ = this.store.select(MakesSelectors.selectMakesLoading);
  searchTerm$ = this.store.select(MakesSelectors.selectMakesSearchTerm);

  loadMakes() {
    this.store.dispatch(MakesActions.loadMakes());
  }

  searchMakes(searchTerm: string) {
    this.store.dispatch(MakesActions.searchMakes({ searchTerm }));
  }

  setSelectedMake(make: VehicleMake) {
    this.store.dispatch(MakesActions.setSelectedMake({ make }));
  }

  clearSelectedMake() {
    this.store.dispatch(MakesActions.clearSelectedMake());
  }

  clearMakesSearch() {
    this.store.dispatch(MakesActions.clearMakesSearch());
  }
}
