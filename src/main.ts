// Angular 20 — Bootstrap sin zone.js
import { bootstrapApplication } from '@angular/platform-browser';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

// Registrar datos de localización en español para los pipes date y currency
registerLocaleData(localeEs, 'es');

bootstrapApplication(AppComponent, appConfig).catch(console.error);
