import { provideZonelessChangeDetection, Provider, EnvironmentProviders } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideMockStore } from '@ngrx/store/testing';
import { TranslateModule } from '@ngx-translate/core';

/**
 * Common providers for testing in a zoneless Angular app
 */
export const commonTestProviders: (Provider | EnvironmentProviders)[] = [
  provideZonelessChangeDetection(),
  provideRouter([]),
  provideMockStore()
];

/**
 * Common imports for testing Angular components
 */
export const commonTestImports = [
  TranslateModule.forRoot()
];

/**
 * Get providers array with common testing setup and additional providers
 */
export function getTestProviders(...additionalProviders: (Provider | EnvironmentProviders)[]): (Provider | EnvironmentProviders)[] {
  return [
    ...commonTestProviders,
    ...additionalProviders
  ];
}

/**
 * Get complete testing configuration with common imports and providers
 */
export function getTestConfig(additionalImports: unknown[] = [], additionalProviders: (Provider | EnvironmentProviders)[] = []) {
  return {
    imports: [
      ...commonTestImports,
      ...additionalImports
    ],
    providers: getTestProviders(...additionalProviders)
  };
}
