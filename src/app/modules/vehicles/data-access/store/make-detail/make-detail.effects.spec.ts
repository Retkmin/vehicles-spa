import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of, throwError } from 'rxjs';
import { MakeDetailEffects } from './make-detail.effects';
import * as MakeDetailActions from './make-detail.actions';
import { VehiclesApiService } from '@vehicles/data-access/services/vehicles-api.service';
import { Store, Action } from '@ngrx/store';
import { marbles } from 'rxjs-marbles/jest';
import { provideZonelessChangeDetection } from '@angular/core';

const mockMakesState = {
  makes: [
    { makeId: 1, makeName: 'Toyota' },
    { makeId: 2, makeName: 'Honda' },
  ],
};

describe('MakeDetailEffects', () => {
  let consoleWarnSpy: jest.SpyInstance;
  let actions$: Observable<Action>;
  let effects: MakeDetailEffects;
  let vehiclesApiService: jest.Mocked<VehiclesApiService>;
  let store: Partial<Store<unknown>>;

  beforeEach(() => {
    consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {
      /* intentionally silenced for test */
    });
    vehiclesApiService = {
      getModelsForMake: jest.fn(),
      getVehicleTypesForMake: jest.fn(),
    } as unknown as jest.Mocked<VehiclesApiService>;
    store = {
      select: jest.fn().mockReturnValue(of(mockMakesState)),
    };
    TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        MakeDetailEffects,
        provideMockActions(() => actions$),
        { provide: VehiclesApiService, useValue: vehiclesApiService },
        { provide: Store, useValue: store },
      ],
    });
    effects = TestBed.inject(MakeDetailEffects);
  });

  afterEach(() => {
    consoleWarnSpy.mockRestore();
  });

  describe('loadMakeDetail$', () => {
    it('should dispatch loadModelsSuccess on success', () => {
      const models = [{ modelId: 1, modelName: 'Corolla' }];
      vehiclesApiService.getModelsForMake.mockReturnValue(of(models));
      marbles((m) => {
        actions$ = m.hot('-a-', { a: MakeDetailActions.loadMakeDetail({ makeId: 1 }) });
        const expected = m.cold('-b', { b: MakeDetailActions.loadModelsSuccess({ models }) });
        m.expect(effects.loadMakeDetail$).toBeObservable(expected);
      })();
    });

    it('should dispatch loadModelsFailure on error', () => {
      vehiclesApiService.getModelsForMake.mockReturnValue(throwError(() => new Error('fail')));
      marbles((m) => {
        actions$ = m.hot('-a-', { a: MakeDetailActions.loadMakeDetail({ makeId: 1 }) });
        const expected = m.cold('-b', {
          b: MakeDetailActions.loadModelsFailure({ error: 'fail' }),
        });
        m.expect(effects.loadMakeDetail$).toBeObservable(expected);
      })();
    });

    it('should dispatch loadModelsFailure with default message if error has no message', () => {
      vehiclesApiService.getModelsForMake.mockReturnValue(throwError(() => ({ some: 'error' })));
      marbles((m) => {
        actions$ = m.hot('-a-', { a: MakeDetailActions.loadMakeDetail({ makeId: 1 }) });
        const expected = m.cold('-b', {
          b: MakeDetailActions.loadModelsFailure({ error: 'Error loading models' }),
        });
        m.expect(effects.loadMakeDetail$).toBeObservable(expected);
      })();
    });
  });

  describe('loadVehicleTypes$', () => {
    it('should dispatch loadTypesSuccess on success', () => {
      const types = [{ typeId: 1, typeName: 'SUV' }];
      vehiclesApiService.getVehicleTypesForMake.mockReturnValue(of(types));
      marbles((m) => {
        actions$ = m.hot('-a-', { a: MakeDetailActions.loadMakeDetail({ makeId: 2 }) });
        const expected = m.cold('-b', { b: MakeDetailActions.loadTypesSuccess({ types }) });
        m.expect(effects.loadVehicleTypes$).toBeObservable(expected);
      })();
    });

    it('should dispatch loadTypesFailure on error', () => {
      vehiclesApiService.getVehicleTypesForMake.mockReturnValue(
        throwError(() => new Error('fail')),
      );
      marbles((m) => {
        actions$ = m.hot('-a-', { a: MakeDetailActions.loadMakeDetail({ makeId: 2 }) });
        const expected = m.cold('-b', { b: MakeDetailActions.loadTypesFailure({ error: 'fail' }) });
        m.expect(effects.loadVehicleTypes$).toBeObservable(expected);
      })();
    });

    it('should dispatch loadTypesFailure with default message if error has no message', () => {
      vehiclesApiService.getVehicleTypesForMake.mockReturnValue(
        throwError(() => ({ some: 'error' })),
      );
      marbles((m) => {
        actions$ = m.hot('-a-', { a: MakeDetailActions.loadMakeDetail({ makeId: 2 }) });
        const expected = m.cold('-b', {
          b: MakeDetailActions.loadTypesFailure({ error: 'Error loading types' }),
        });
        m.expect(effects.loadVehicleTypes$).toBeObservable(expected);
      })();
    });
  });
});
