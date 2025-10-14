import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VehiclesUiCardComponent } from './vehicles-ui-card.component';
import { getTestConfig } from '@core/utils/test-helpers';

describe('VehiclesUiCardComponent', () => {
  let component: VehiclesUiCardComponent;
  let fixture: ComponentFixture<VehiclesUiCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule(
      getTestConfig([VehiclesUiCardComponent]),
    ).compileComponents();

    fixture = TestBed.createComponent(VehiclesUiCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
