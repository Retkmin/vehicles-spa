import { TestBed } from '@angular/core/testing';
import { App } from './app';
import { getTestConfig } from '@shared/utils/test-helpers';

describe('App', () => {
  beforeEach(async () => {
    const testConfig = getTestConfig([App]);

    await TestBed.configureTestingModule(testConfig).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
