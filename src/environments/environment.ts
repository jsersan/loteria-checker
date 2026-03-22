// Angular 20 — Entorno de producción
// En producción necesitas configurar tu propio servidor proxy o backend
// que reenvíe las peticiones a la API de SELAE.
export const environment = {
  production: true,
  angularVersion: 20,
  apiBaseUrl: '/api',
  useMockData: true,
};
