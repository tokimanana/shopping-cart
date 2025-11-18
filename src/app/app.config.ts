import {
  ApplicationConfig,
  provideZoneChangeDetection,
  isDevMode,
} from '@angular/core';
import { ActionReducer, provideState, provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { provideHttpClient } from '@angular/common/http';
import { localStorageSync } from 'ngrx-store-localstorage';

import * as fromCart from './cart/cart.reducer';
import * as fromProducts from './products/product.reducer';

import { ProductEffects } from './products/product.effects';

const keysToSync = [fromCart.cartFeatureKey];

function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
  return localStorageSync({
    keys: keysToSync,
    rehydrate: true,
    storage: window.localStorage,
    removeOnUndefined: true,
  })(reducer);
}

const metaReducers = [localStorageSyncReducer];

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideStore({}, { metaReducers: metaReducers }),
    provideState(fromProducts.productsFeatureKey, fromProducts.productsReducer),
    provideState(fromCart.cartFeatureKey, fromCart.cartReducer),
    provideEffects([ProductEffects]),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    provideHttpClient()
  ],
};
