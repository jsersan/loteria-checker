# 🎄 Lotería Nacional — Comprobador de Premios

App **Angular 20** para comprobar si un número ha sido premiado en la Lotería Nacional Española (SELAE).

---

## Características

- **Comprobación de números** con número de 5 dígitos + serie + sorteo + año
- **Integración con API de SELAE** (`/servicios/premioDecimoWeb`) para datos reales
- **Mock data** en desarrollo con premios históricos reales (Navidad 2022–2024, El Niño 2024–2025)
- **Historial persistente** en localStorage con filtros por estado y sorteo
- **Formulario reactivo** con validación completa
- **Zoneless** — sin `zone.js`, detección de cambios 100% basada en Signals
- **`input()`/`output()` signals** estables (Angular 20) en lugar de `@Input`/`@Output`
- **Vitest** como test runner en lugar de Karma/Jasmine
- **View Transitions API** para navegación animada entre rutas
- **Componentes standalone** con lazy loading por ruta

---

## Novedades de Angular 20 aplicadas

| Característica | Detalle |
|---|---|
| `provideZonelessChangeDetection()` | Elimina `zone.js`, detección de cambios por Signals |
| `input()` / `output()` signals | Reemplazan `@Input` / `@Output` en todos los componentes |
| `@angular/build` | Nuevo builder (reemplaza `@angular-devkit/build-angular`) |
| `provideAnimationsAsync()` | Carga de animaciones asíncrona, bundle inicial más pequeño |
| `withViewTransitions()` | View Transitions API nativa del navegador en el router |
| Vitest | Test runner moderno en lugar de Karma/Jasmine |
| TypeScript 5.8 | Soporte de la última versión de TypeScript |
| Sin `zone.js` | `polyfills: []` vacío en `angular.json` |

---

## Estructura del proyecto

```
src/
├── app/
│   ├── core/
│   │   ├── models/
│   │   │   ├── loteria.models.ts          # Interfaces y tipos TypeScript
│   │   │   └── sorteos.catalog.ts         # Catálogo de sorteos y mock data
│   │   └── services/
│   │       ├── loteria.service.ts         # Servicio HTTP ↔ API SELAE
│   │       ├── loteria.service.spec.ts    # Tests con Vitest
│   │       ├── historial.service.ts       # Persistencia en localStorage
│   │       └── historial.service.spec.ts  # Tests con Vitest
│   ├── features/
│   │   ├── comprobar/                     # Vista principal — formulario reactivo
│   │   ├── historial/                     # Vista historial con filtros y stats
│   │   └── not-found/                     # Página 404
│   ├── shared/
│   │   ├── components/
│   │   │   ├── header/                    # Cabecera + navegación
│   │   │   ├── digit-ball/                # Bolas con dígitos (input() signals)
│   │   │   ├── premio-card/               # Tarjeta de resultado
│   │   │   └── loading-spinner/           # Spinner animado
│   │   └── pipes/
│   │       ├── nombre-sorteo.pipe.ts      # TipoSorteo → nombre legible
│   │       └── categoria.pipe.ts          # CategoriaPremio → etiqueta
│   ├── app.component.ts                   # Root component
│   ├── app.config.ts                      # Providers zoneless + View Transitions
│   └── app.routes.ts                      # Rutas lazy-loaded
├── environments/
│   ├── environment.ts                     # Producción (API real)
│   └── environment.development.ts         # Desarrollo (mock data)
├── public/                                # Assets estáticos (nuevo en Angular 18+)
└── styles.scss                            # Estilos globales + CSS variables
```

---

## Instalación y arranque

### Prerrequisitos

- Node.js **20+**
- npm 10+
- Angular CLI **20+**

```bash
npm install -g @angular/cli@latest
```

### Pasos

```bash
# 1. Instalar dependencias
npm install

# 2. Arrancar en modo desarrollo (usa mock data)
ng serve

# 3. Abrir en el navegador
# http://localhost:4200
```

### Tests

```bash
# Lanza Vitest (reemplaza Karma en Angular 20)
ng test
```

### Build para producción

```bash
ng build --configuration production
# → dist/loteria-nacional/
```

---

## API de SELAE

La app se integra con el endpoint oficial:

```
GET https://www.loteriasyapuestas.es/servicios/premioDecimoWeb
  ?decimo=NNNNN
  &tipoBoleto=GORDO_NAVIDAD
```

| `tipoBoleto`       | Sorteo                      |
|--------------------|-----------------------------|
| `GORDO_NAVIDAD`    | El Gordo de Navidad (22 dic)|
| `EL_NINO`          | El Niño (6 ene)             |
| `LOTERIA_NACIONAL` | Sorteo ordinario            |

> ⚠️ **CORS**: Para producción real usa un proxy backend propio. En desarrollo, la app usa mock data automáticamente.

---

## Números de prueba (mock data)

| Número | Sorteo              | Año  | Premio                  |
|--------|---------------------|------|-------------------------|
| 05490  | El Gordo de Navidad | 2024 | 1.º Premio (400.000 €)  |
| 76058  | El Gordo de Navidad | 2024 | 2.º Premio (125.000 €)  |
| 40285  | El Gordo de Navidad | 2024 | 3.º Premio (50.000 €)   |
| 05489  | El Gordo de Navidad | 2024 | Aproximación (1.600 €)  |
| 12345  | El Gordo de Navidad | 2024 | Pedrea (100 €)          |
| 72480  | El Gordo de Navidad | 2023 | 1.º Premio (400.000 €)  |
| 16770  | El Niño             | 2025 | 1.º Premio (200.000 €)  |

---

## Tecnologías

| Tecnología              | Versión | Uso                              |
|-------------------------|---------|----------------------------------|
| Angular                 | **20**  | Framework principal              |
| TypeScript              | 5.8     | Tipado estático                  |
| Angular Signals         | estable | Estado reactivo sin zone.js      |
| `input()` / `output()`  | estable | Señales de entrada/salida        |
| View Transitions API    | estable | Animaciones de navegación        |
| Vitest                  | 3.x     | Test runner moderno              |
| `@angular/build`        | 20      | Builder (reemplaza devkit)       |
| RxJS                    | 7.8     | Observables en servicios HTTP    |
| SCSS                    | —       | Estilos con variables CSS        |
| localStorage            | —       | Persistencia del historial       |

---

## Migración desde Angular 17

Si tienes la versión anterior del proyecto:

```bash
# Actualiza el CLI
npm install -g @angular/cli@latest

# Dentro del proyecto, actualiza de forma progresiva
ng update @angular/core@18 @angular/cli@18
ng update @angular/core@19 @angular/cli@19
ng update @angular/core@20 @angular/cli@20
```

Los cambios manuales principales son:
1. `provideZoneChangeDetection()` → `provideZonelessChangeDetection()`
2. Eliminar `zone.js` de `polyfills` en `angular.json`
3. `@angular-devkit/build-angular` → `@angular/build`
4. `@Input`/`@Output` → `input()`/`output()` signals
5. Karma/Jasmine → Vitest

---

## Licencia

MIT — Proyecto de demostración. Para uso real consulta siempre [loteriasyapuestas.es](https://www.loteriasyapuestas.es).


---

## Características

- **Comprobación de números** con número de 5 dígitos + serie + sorteo + año
- **Integración con API de SELAE** (`/servicios/premioDecimoWeb`) para datos reales
- **Mock data** en desarrollo con premios históricos reales (Navidad 2022–2024, El Niño 2024–2025)
- **Historial persistente** en localStorage con filtros por estado y sorteo
- **Formulario reactivo** con validación completa
- **Componentes standalone** (Angular 17 + signals)
- **Diseño elegante** inspirado en los billetes de lotería española

---

## Estructura del proyecto

```
src/
├── app/
│   ├── core/
│   │   ├── models/
│   │   │   ├── loteria.models.ts        # Interfaces y tipos TypeScript
│   │   │   └── sorteos.catalog.ts       # Catálogo de sorteos y mock data
│   │   └── services/
│   │       ├── loteria.service.ts       # Servicio HTTP ↔ API SELAE
│   │       └── historial.service.ts     # Persistencia en localStorage
│   ├── features/
│   │   ├── comprobar/                   # Vista principal — formulario
│   │   ├── historial/                   # Vista historial con filtros
│   │   └── not-found/                   # Página 404
│   ├── shared/
│   │   ├── components/
│   │   │   ├── header/                  # Cabecera + navegación
│   │   │   ├── digit-ball/              # Bolas con dígitos del número
│   │   │   ├── premio-card/             # Tarjeta de resultado
│   │   │   └── loading-spinner/         # Spinner de carga animado
│   │   └── pipes/
│   │       ├── nombre-sorteo.pipe.ts    # TipoSorteo → nombre legible
│   │       └── categoria.pipe.ts        # CategoriaPremio → etiqueta
│   ├── app.component.ts                 # Root component
│   ├── app.config.ts                    # Providers (HTTP, Router, Animations)
│   └── app.routes.ts                    # Rutas lazy-loaded
├── environments/
│   ├── environment.ts                   # Producción (API real)
│   └── environment.development.ts       # Desarrollo (mock data)
└── styles.scss                          # Estilos globales + CSS variables
```

---

## Instalación y arranque

### Prerrequisitos

- Node.js 18+ 
- npm 9+
- Angular CLI 17+

```bash
npm install -g @angular/cli
```

### Pasos

```bash
# 1. Instalar dependencias
npm install

# 2. Arrancar en modo desarrollo (usa mock data)
ng serve

# 3. Abrir en el navegador
# http://localhost:4200
```

### Build para producción

```bash
# Genera la carpeta dist/loteria-nacional/
ng build --configuration production
```

---

## API de SELAE

La app se integra con el endpoint oficial de SELAE:

```
GET https://www.loteriasyapuestas.es/servicios/premioDecimoWeb
  ?decimo=NNNNN
  &tipoBoleto=GORDO_NAVIDAD
```

### Tipos de boleto disponibles

| `tipoBoleto`      | Sorteo                     |
|-------------------|----------------------------|
| `GORDO_NAVIDAD`   | El Gordo de Navidad (22 dic) |
| `EL_NINO`         | El Niño (6 ene)            |
| `LOTERIA_NACIONAL`| Sorteo ordinario/extraordinario |

### ⚠️ CORS en navegador

La API de SELAE puede bloquear peticiones directas desde el navegador por CORS.  
**Para producción real**, se recomienda crear un proxy backend propio (Node.js/Express, etc.) que actúe de intermediario:

```
Cliente Angular → Tu backend → API SELAE
```

En desarrollo, la app usa **mock data** automáticamente (`environment.development.ts` → `useMockData: true`).

---

## Números de prueba (mock data)

| Número | Sorteo              | Año  | Premio                   |
|--------|---------------------|------|--------------------------|
| 05490  | El Gordo de Navidad | 2024 | 1.º Premio (400.000 €)   |
| 76058  | El Gordo de Navidad | 2024 | 2.º Premio (125.000 €)   |
| 40285  | El Gordo de Navidad | 2024 | 3.º Premio (50.000 €)    |
| 05489  | El Gordo de Navidad | 2024 | Aproximación (1.600 €)   |
| 12345  | El Gordo de Navidad | 2024 | Pedrea (100 €)           |
| 72480  | El Gordo de Navidad | 2023 | 1.º Premio (400.000 €)   |
| 16770  | El Niño             | 2025 | 1.º Premio (200.000 €)   |

---

## Tecnologías

| Tecnología         | Versión | Uso                          |
|--------------------|---------|------------------------------|
| Angular            | 17      | Framework principal           |
| TypeScript         | 5.2     | Tipado estático               |
| Angular Signals    | 17      | Gestión de estado reactivo    |
| Angular Forms      | 17      | Formularios reactivos         |
| RxJS               | 7.8     | Observables y operadores      |
| SCSS               | —       | Estilos con variables CSS     |
| localStorage       | —       | Persistencia del historial    |

---

## Añadir más sorteos

Edita `src/app/core/models/sorteos.catalog.ts`:

```typescript
// 1. Añade al array SORTEOS_DISPONIBLES
{
  id: 'EUROMILLONES',
  nombre: 'Euromillones',
  // ...
}

// 2. Añade premios mock a PREMIOS_MOCK
EUROMILLONES: {
  2024: [
    { numero: 12345, nombre: '1.º Premio', categoria: 'primer_premio', ... }
  ]
}
```

---

## Licencia

MIT — Proyecto de demostración. Para uso real consulta siempre [loteriasyapuestas.es](https://www.loteriasyapuestas.es).
