import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MakesPageComponent } from './makes-page.component';
import { getTestConfig } from '../../../../../core/utils/test-helpers';

describe('MakesPageComponent', () => {
  let component: MakesPageComponent;
  let fixture: ComponentFixture<MakesPageComponent>;

  beforeEach(async () => {
    const testConfig = getTestConfig([MakesPageComponent]);

    await TestBed.configureTestingModule(testConfig).compileComponents();

    fixture = TestBed.createComponent(MakesPageComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
