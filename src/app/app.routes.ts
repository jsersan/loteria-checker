import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'comprobar',
    pathMatch: 'full',
  },
  {
    path: 'comprobar',
    loadComponent: () =>
      import('./features/comprobar/comprobar.component').then(
        (m) => m.ComprobarComponent
      ),
    title: 'Comprobar número — Lotería Nacional',
  },
  {
    path: 'historial',
    loadComponent: () =>
      import('./features/historial/historial.component').then(
        (m) => m.HistorialComponent
      ),
    title: 'Historial — Lotería Nacional',
  },
  {
    path: '**',
    loadComponent: () =>
      import('./features/not-found/not-found.component').then(
        (m) => m.NotFoundComponent
      ),
    title: 'Página no encontrada',
  },
];
