import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { MakesFacade } from '@vehicles/data-access/facades/makes.facade';
import { VehicleMake } from '@vehicles/domain/models/vehicle-make.model';
import { VehiclesUiCardComponent } from '@shared/components/vehicles-ui-card/vehicles-ui-card.component';

@Component({
  selector: 'app-makes-page',
  standalone: true,
  imports: [
    CommonModule,
    ScrollingModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    TranslateModule,
    VehiclesUiCardComponent,
  ],
  templateUrl: './makes-page.component.html',
  styleUrl: './makes-page.component.scss',
})
export class MakesPageComponent implements OnInit {
  private static readonly VIRTUAL_SCROLL_ITEM_HEIGHT = 120;
  readonly itemHeight = MakesPageComponent.VIRTUAL_SCROLL_ITEM_HEIGHT;

  private makesFacade = inject(MakesFacade);
  private router = inject(Router);

  readonly makes$ = this.makesFacade.makes$;
  readonly filteredMakes$ = this.makesFacade.filteredMakes$;
  readonly loading$ = this.makesFacade.loading$;
  readonly searchTerm$ = this.makesFacade.searchTerm$;

  ngOnInit(): void {
    this.makesFacade.loadMakes();
  }

  public onSearchChange(searchTerm: string): void {
    this.makesFacade.searchMakes(searchTerm);
  }

  public viewMakeDetails(make: VehicleMake): void {
    this.makesFacade.clearMakesSearch();
    this.makesFacade.setSelectedMake(make);
    this.router.navigate(['/vehicles/makes', make.makeId]);
  }

  public goBack(): void {
    this.router.navigate(['/vehicles']);
  }

  public trackByMakeId(index: number, make: VehicleMake): number {
    return make.makeId;
  }
}
