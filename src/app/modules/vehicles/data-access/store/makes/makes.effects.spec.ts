import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of, throwError } from 'rxjs';
import { MakesEffects } from './makes.effects';
import * as MakesActions from './makes.actions';
import { VehiclesApiService } from '@vehicles/data-access/services/vehicles-api.service';
import { marbles } from 'rxjs-marbles/jest';
import { provideZonelessChangeDetection } from '@angular/core';
import { Action } from '@ngrx/store';

describe('MakesEffects', () => {
  let actions$: Observable<Action>;
  let effects: MakesEffects;
  let vehiclesApiService: jest.Mocked<VehiclesApiService>;
  let consoleWarnSpy: jest.SpyInstance;

  beforeEach(() => {
    vehiclesApiService = {
      getAllMakes: jest.fn(),
    } as unknown as jest.Mocked<VehiclesApiService>;
    TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        MakesEffects,
        provideMockActions(() => actions$),
        { provide: VehiclesApiService, useValue: vehiclesApiService },
      ],
    });
    effects = TestBed.inject(MakesEffects);
    consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation(() => {
      /* intentionally silenced for test */
    });
  });

  afterEach(() => {
    consoleWarnSpy.mockRestore();
  });

  describe('loadMakes$', () => {
    it('should dispatch loadMakesSuccess on success', () => {
      const makes = [{ makeId: 1, makeName: 'Toyota' }];
      vehiclesApiService.getAllMakes.mockReturnValue(of(makes));
      marbles((m) => {
        actions$ = m.hot('-a-', { a: MakesActions.loadMakes() });
        const expected = m.cold('-b', { b: MakesActions.loadMakesSuccess({ makes }) });
        m.expect(effects.loadMakes$).toBeObservable(expected);
      })();
    });

    it('should dispatch loadMakesFailure on error', () => {
      vehiclesApiService.getAllMakes.mockReturnValue(throwError(() => new Error('fail')));
      marbles((m) => {
        actions$ = m.hot('-a-', { a: MakesActions.loadMakes() });
        const expected = m.cold('-b', { b: MakesActions.loadMakesFailure({ error: 'fail' }) });
        m.expect(effects.loadMakes$).toBeObservable(expected);
      })();
    });

    it('should dispatch loadMakesFailure with default message if error has no message', () => {
      vehiclesApiService.getAllMakes.mockReturnValue(throwError(() => ({ some: 'error' })));
      marbles((m) => {
        actions$ = m.hot('-a-', { a: MakesActions.loadMakes() });
        const expected = m.cold('-b', {
          b: MakesActions.loadMakesFailure({ error: 'Failed to load makes' }),
        });
        m.expect(effects.loadMakes$).toBeObservable(expected);
      })();
    });
  });

  describe('loadMoreMakes$', () => {
    it('should dispatch loadMakesSuccess on success', () => {
      const makes = [{ makeId: 2, makeName: 'Honda' }];
      vehiclesApiService.getAllMakes.mockReturnValue(of(makes));
      marbles((m) => {
        actions$ = m.hot('-a-', { a: MakesActions.loadMoreMakes({ page: 2 }) });
        const expected = m.cold('-b', { b: MakesActions.loadMakesSuccess({ makes }) });
        m.expect(effects.loadMoreMakes$).toBeObservable(expected);
      })();
    });

    it('should dispatch loadMakesFailure on error', () => {
      vehiclesApiService.getAllMakes.mockReturnValue(throwError(() => new Error('fail')));
      marbles((m) => {
        actions$ = m.hot('-a-', { a: MakesActions.loadMoreMakes({ page: 2 }) });
        const expected = m.cold('-b', { b: MakesActions.loadMakesFailure({ error: 'fail' }) });
        m.expect(effects.loadMoreMakes$).toBeObservable(expected);
      })();
    });

    it('should dispatch loadMakesFailure with default message if error has no message', () => {
      vehiclesApiService.getAllMakes.mockReturnValue(throwError(() => ({ some: 'error' })));
      marbles((m) => {
        actions$ = m.hot('-a-', { a: MakesActions.loadMoreMakes({ page: 2 }) });
        const expected = m.cold('-b', {
          b: MakesActions.loadMakesFailure({ error: 'Failed to load more makes' }),
        });
        m.expect(effects.loadMoreMakes$).toBeObservable(expected);
      })();
    });
  });
});
