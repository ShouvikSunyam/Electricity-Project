import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection, LOCALE_ID } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';

import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';
import { provideHttpClient, withInterceptors } from '@angular/common/http';

 import { authInterceptor } from './interceptors/auth.interceptor';
import { ENVIRONMENT } from './environment.token';
import { environment } from './environments/environment';

registerLocaleData(localeDe);

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    { provide: LOCALE_ID, useValue: 'de-DE'},
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes), provideClientHydration(withEventReplay()),

    provideHttpClient(
      withInterceptors([
        authInterceptor
      ])
    ),
    { provide: ENVIRONMENT, useValue: environment }
  ]
};
