// Angular 20 — Entorno de desarrollo
// El proxy de Angular (proxy.conf.json) redirige /api/* → https://www.loteriasyapuestas.es/servicios/*
// Esto resuelve el problema CORS sin necesidad de backend propio.
export const environment = {
  production: false,
  angularVersion: 20,
  apiBaseUrl: '/api',
  // false = usa la API real de SELAE a través del proxy
  // true  = usa datos mock locales (sin conexión a internet)
  useMockData: false,
};
