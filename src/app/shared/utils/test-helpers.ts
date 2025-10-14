import { provideZonelessChangeDetection, Provider, EnvironmentProviders } from '@angular/core';
import { provideMockStore } from '@ngrx/store/testing';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

/**
 * Common providers for testing in a zoneless Angular app
 */
export function getCommonTestProviders(
  initialState?: Record<string, unknown>,
): (Provider | EnvironmentProviders)[] {
  return [provideZonelessChangeDetection(), provideMockStore({ initialState })];
}

/**
 * Common imports for testing Angular components
 */
export const commonTestImports = [CommonModule, FormsModule, TranslateModule.forRoot()];

/**
 * Get providers array with common testing setup and additional providers
 */
export function getTestProviders(
  initialState?: Record<string, unknown>,
  ...additionalProviders: (Provider | EnvironmentProviders)[]
): (Provider | EnvironmentProviders)[] {
  return [...getCommonTestProviders(initialState), ...additionalProviders];
}

/**
 * Get complete testing configuration with common imports and providers
 */
export function getTestConfig(
  additionalImports: unknown[] = [],
  additionalProviders: (Provider | EnvironmentProviders)[] = [],
  initialState?: Record<string, unknown>,
) {
  return {
    imports: [...commonTestImports, ...additionalImports],
    providers: getTestProviders(initialState, ...additionalProviders),
  };
}
