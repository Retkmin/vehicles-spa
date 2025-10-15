import { ComponentFixture, TestBed } from '@angular/core/testing';
import { VehiclesDashboardPageComponent } from './vehicles-dashboard-page.component';
import { getTestConfig } from '@shared/utils/test-helpers';
import { provideRouter } from '@angular/router';

describe('VehiclesDashboardPageComponent', () => {
  let component: VehiclesDashboardPageComponent;
  let fixture: ComponentFixture<VehiclesDashboardPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule(
      getTestConfig(
        [],
        [provideRouter([{ path: 'vehicles/makes', component: VehiclesDashboardPageComponent }])],
      ),
    ).compileComponents();

    fixture = TestBed.createComponent(VehiclesDashboardPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to /vehicles/makes when navigateToMakes is called', () => {
    const router = (component as VehiclesDashboardPageComponent)['router'];
    const navigateSpy = jest.spyOn(router, 'navigate');
    component.navigateToMakes();
    expect(navigateSpy).toHaveBeenCalledWith(['/vehicles/makes']);
  });
});
