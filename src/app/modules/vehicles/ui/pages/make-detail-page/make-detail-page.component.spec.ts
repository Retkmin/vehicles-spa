import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MakeDetailPageComponent } from './make-detail-page.component';
import { getTestConfig } from '@shared/utils/test-helpers';
import { Router } from '@angular/router';
import { provideRouter } from '@angular/router';
import { VehiclesUiCardComponent } from '@shared/components/vehicles-ui-card/vehicles-ui-card.component';
import { initialMakeDetailState } from '@vehicles/data-access/store/make-detail/make-detail.state';
import { initialMakesState } from '@vehicles/data-access/store/makes/makes.state';

describe('MakeDetailPageComponent', () => {
  let component: MakeDetailPageComponent;
  let fixture: ComponentFixture<MakeDetailPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule(
      getTestConfig(
        [VehiclesUiCardComponent],
        [
          provideRouter([
            { path: 'vehicles/makes', component: MakeDetailPageComponent },
            { path: 'vehicles/makes/:makeId', component: MakeDetailPageComponent },
          ]),
        ],
        {
          makeDetail: initialMakeDetailState,
          makes: initialMakesState,
        },
      ),
    ).compileComponents();

    fixture = TestBed.createComponent(MakeDetailPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to /vehicles/makes when goBack is called', () => {
    const router = (component as MakeDetailPageComponent)['router'] as Router;
    const navigateSpy = jest.spyOn(router, 'navigate');
    component.goBack();
    expect(navigateSpy).toHaveBeenCalledWith(['/vehicles/makes']);
  });

  it('trackByModelId should return modelId', () => {
    const model = { modelId: 456, modelName: 'Test' };
    expect(component.trackByModelId(0, model)).toBe(456);
  });

  it('trackByTypeId should return typeId', () => {
    const type = { typeId: 789, typeName: 'Test' };
    expect(component.trackByTypeId(0, type)).toBe(789);
  });
});
