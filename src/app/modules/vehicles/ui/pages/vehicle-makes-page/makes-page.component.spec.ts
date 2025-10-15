import { ComponentFixture, TestBed } from '@angular/core/testing';
import { getTestConfig } from '@shared/utils/test-helpers';
import { provideRouter } from '@angular/router';
import { VehiclesUiCardComponent } from '@shared/components/vehicles-ui-card/vehicles-ui-card.component';
import { MakesPageComponent } from './makes-page.component';
import { initialMakesState } from '@vehicles/data-access/store/makes/makes.state';

describe('MakesPageComponent', () => {
  let component: MakesPageComponent;
  let fixture: ComponentFixture<MakesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule(
      getTestConfig(
        [VehiclesUiCardComponent, MakesPageComponent],
        [
          provideRouter([
            { path: 'vehicles', component: MakesPageComponent },
            { path: 'vehicles/makes', component: MakesPageComponent },
            { path: 'vehicles/makes/:makeId', component: MakesPageComponent },
          ]),
        ],
        {
          makes: initialMakesState,
        },
      ),
    ).compileComponents();

    fixture = TestBed.createComponent(MakesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call makesFacade.searchMakes with the search term', () => {
    const facade = (component as MakesPageComponent)['makesFacade'];
    const spy = jest.spyOn(facade, 'searchMakes');
    const term = 'toyota';

    component.onSearchChange(term);

    expect(spy).toHaveBeenCalledWith(term);
  });

  it('should call facade and router on viewMakeDetails', () => {
    const facade = (component as MakesPageComponent)['makesFacade'];
    const router = (component as MakesPageComponent)['router'];
    const make = { makeId: 123, makeName: 'Test' };
    const spyClear = jest.spyOn(facade, 'clearMakesSearch');
    const spySet = jest.spyOn(facade, 'setSelectedMake');
    const spyNav = jest.spyOn(router, 'navigate');

    component.viewMakeDetails(make);

    expect(spyClear).toHaveBeenCalled();
    expect(spySet).toHaveBeenCalledWith(make);
    expect(spyNav).toHaveBeenCalledWith(['/vehicles/makes', make.makeId]);
  });

  it('should call router.navigate to /vehicles on goBack', () => {
    const router = (component as MakesPageComponent)['router'];
    const spyNav = jest.spyOn(router, 'navigate');

    component.goBack();

    expect(spyNav).toHaveBeenCalledWith(['/vehicles']);
  });

  it('should return makeId in trackByMakeId', () => {
    const make = { makeId: 42, makeName: 'Test' };
    expect(component.trackByMakeId(0, make)).toBe(42);
  });
});
