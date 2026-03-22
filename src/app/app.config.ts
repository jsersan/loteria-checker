import { ApplicationConfig, provideZonelessChangeDetection, LOCALE_ID } from '@angular/core';
import { provideRouter, withComponentInputBinding, withViewTransitions } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    // Zoneless change detection (estable en Angular 20)
    provideZonelessChangeDetection(),

    // Locale español para pipes date y currency
    { provide: LOCALE_ID, useValue: 'es' },

    // Router con View Transitions API
    provideRouter(routes, withComponentInputBinding(), withViewTransitions()),

    // HttpClient con fetch nativo
    provideHttpClient(withFetch()),

    // Animaciones asíncronas
    provideAnimationsAsync(),
  ],
};
