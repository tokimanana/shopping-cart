import { ApplicationConfig, provideZoneChangeDetection, isDevMode } from '@angular/core';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideStore(), provideEffects(), provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() })]
};
