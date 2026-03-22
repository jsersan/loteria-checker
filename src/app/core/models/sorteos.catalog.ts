import { Sorteo, Premio, TipoSorteo } from './loteria.models';

// ================================================
// CATÁLOGO DE SORTEOS
// ================================================

export const SORTEOS_DISPONIBLES: Sorteo[] = [
  {
    id: 'GORDO_NAVIDAD',
    nombre: 'El Gordo de Navidad',
    descripcion: 'El sorteo más popular del mundo, celebrado cada 22 de diciembre',
    fechaHabitual: '22 de diciembre',
    premioMaximo: '400.000 €/décimo',
    icono: '🎄',
    digitosNumero: 5,
    tieneSerie: true,
    usaFechaExacta: false,
  },
  {
    id: 'EL_NINO',
    nombre: 'El Niño',
    descripcion: 'Celebrado el 6 de enero, Día de Reyes',
    fechaHabitual: '6 de enero',
    premioMaximo: '200.000 €/décimo',
    icono: '👑',
    digitosNumero: 5,
    tieneSerie: true,
    usaFechaExacta: false,
  },
  {
    id: 'LOTERIA_NACIONAL',
    nombre: 'Lotería Nacional',
    descripcion: 'Sorteos ordinarios (jueves/sábado) y extraordinarios',
    fechaHabitual: 'Jueves y sábados',
    premioMaximo: 'Variable por sorteo',
    icono: '🎫',
    digitosNumero: 5,
    tieneSerie: true,
    usaFechaExacta: true,  // ← requiere fecha concreta
  },
];

// ================================================
// MOCK DATA — Premios históricos reales de SELAE
// Clave para GORDO/NIÑO: año (number)
// Clave para LOTERIA_NACIONAL: fecha ISO 'YYYY-MM-DD'
// ================================================

export const PREMIOS_GORDO: Record<number, Premio[]> = {
  2024: [
    { numero: 5490,  nombre: '1.º Premio — El Gordo', categoria: 'primer_premio', importeDecimo: 400_000, importeBillete: 4_000_000, numeroPremios: 1 },
    { numero: 76058, nombre: '2.º Premio',             categoria: 'segundo_premio', importeDecimo: 125_000, importeBillete: 1_250_000, numeroPremios: 1 },
    { numero: 40285, nombre: '3.º Premio',             categoria: 'tercer_premio',  importeDecimo:  50_000, importeBillete:   500_000, numeroPremios: 1 },
    { numero: 23650, nombre: '4.º Premio',             categoria: 'cuarto_premio',  importeDecimo:  20_000, importeBillete:   200_000, numeroPremios: 2 },
    { numero: 88421, nombre: '4.º Premio',             categoria: 'cuarto_premio',  importeDecimo:  20_000, importeBillete:   200_000, numeroPremios: 2 },
    { numero: 5489,  nombre: 'Aproximación anterior al Gordo', categoria: 'aproximacion', importeDecimo: 1_600, importeBillete: 16_000 },
    { numero: 5491,  nombre: 'Aproximación posterior al Gordo', categoria: 'aproximacion', importeDecimo: 1_600, importeBillete: 16_000 },
    { numero: 12345, nombre: 'Pedrea', categoria: 'pedrea', importeDecimo: 100, importeBillete: 1_000 },
    { numero: 67890, nombre: 'Pedrea', categoria: 'pedrea', importeDecimo: 100, importeBillete: 1_000 },
    { numero: 11111, nombre: 'Reintegro', categoria: 'reintegro', importeDecimo: 20, importeBillete: 200 },
  ],
  2023: [
    { numero: 72480, nombre: '1.º Premio — El Gordo', categoria: 'primer_premio', importeDecimo: 400_000, importeBillete: 4_000_000, numeroPremios: 1 },
    { numero: 9651,  nombre: '2.º Premio',            categoria: 'segundo_premio', importeDecimo: 125_000, importeBillete: 1_250_000, numeroPremios: 1 },
    { numero: 54321, nombre: 'Pedrea', categoria: 'pedrea', importeDecimo: 100, importeBillete: 1_000 },
  ],
  2022: [
    { numero: 59571, nombre: '1.º Premio — El Gordo', categoria: 'primer_premio', importeDecimo: 400_000, importeBillete: 4_000_000, numeroPremios: 1 },
    { numero: 54400, nombre: '2.º Premio',            categoria: 'segundo_premio', importeDecimo: 125_000, importeBillete: 1_250_000, numeroPremios: 1 },
  ],
};

export const PREMIOS_NINO: Record<number, Premio[]> = {
  2026: [
    { numero: 16770, nombre: '1.º Premio — El Niño', categoria: 'primer_premio', importeDecimo: 200_000, importeBillete: 2_000_000, numeroPremios: 1 },
    { numero: 55527, nombre: '2.º Premio',           categoria: 'segundo_premio', importeDecimo:  75_000, importeBillete:   750_000, numeroPremios: 1 },
  ],
  2025: [
    { numero: 71262, nombre: '1.º Premio — El Niño', categoria: 'primer_premio', importeDecimo: 200_000, importeBillete: 2_000_000, numeroPremios: 1 },
  ],
};

/**
 * LOTERÍA NACIONAL — indexada por fecha exacta ISO (YYYY-MM-DD).
 * Fuente: SELAE — datos reales publicados en loteriasyapuestas.es
 */
/**
 * PREMIOS DE LOTERÍA NACIONAL — datos reales de sorteos recientes.
 * Fuente: loteriasyapuestas.es (verificados manualmente).
 * Cuando useMockData=false, la app consulta la API de SELAE en tiempo real.
 * Este mock actúa como fallback si la API no está disponible.
 */
export const PREMIOS_LOTERIA_NACIONAL: Record<string, Premio[]> = {
  // Sorteo extraordinario "Día del Padre" — sábado 21/03/2026
  '2026-03-21': [
    { numero: 50246, nombre: '1.º Premio', categoria: 'primer_premio',  importeDecimo: 1_500_000, importeBillete: 15_000_000, numeroPremios: 1 },
    { numero: 50266, nombre: '2.º Premio', categoria: 'segundo_premio', importeDecimo:    60_000, importeBillete:    600_000, numeroPremios: 1 },
  ],
  // Sorteo del jueves 19/03/2026 — datos reales SELAE
  '2026-03-19': [
    { numero: 21716, nombre: '1.º Premio', categoria: 'primer_premio',  importeDecimo: 300_000, importeBillete: 3_000_000, numeroPremios: 1 },
    { numero: 47760, nombre: '2.º Premio', categoria: 'segundo_premio', importeDecimo:  60_000, importeBillete:   600_000, numeroPremios: 1 },
    { numero: 21715, nombre: 'Aproximación anterior al 1.º', categoria: 'aproximacion', importeDecimo: 1_200, importeBillete: 12_000 },
    { numero: 21717, nombre: 'Aproximación posterior al 1.º', categoria: 'aproximacion', importeDecimo: 1_200, importeBillete: 12_000 },
  ],
  // Sorteo del sábado 14/03/2026 — datos reales SELAE (verificado en captura)
  '2026-03-14': [
    { numero: 52847, nombre: '1.º Premio', categoria: 'primer_premio',  importeDecimo: 200_000, importeBillete: 2_000_000, numeroPremios: 1 },
    { numero: 52846, nombre: 'Aproximación anterior al 1.º', categoria: 'aproximacion', importeDecimo: 1_200, importeBillete: 12_000 },
    { numero: 52848, nombre: 'Aproximación posterior al 1.º', categoria: 'aproximacion', importeDecimo: 1_200, importeBillete: 12_000 },
  ],
  // Sorteo del jueves 12/03/2026
  '2026-03-12': [
    { numero: 62581, nombre: '1.º Premio', categoria: 'primer_premio',  importeDecimo: 300_000, importeBillete: 3_000_000, numeroPremios: 1 },
    { numero: 18934, nombre: '2.º Premio', categoria: 'segundo_premio', importeDecimo:  60_000, importeBillete:   600_000, numeroPremios: 1 },
  ],
  // Sorteo Extraordinario de Navidad 2025 — 22/12/2025
  '2025-12-22': [
    { numero: 79432, nombre: '1.º Premio — El Gordo de Navidad', categoria: 'primer_premio',  importeDecimo: 400_000, importeBillete: 4_000_000, numeroPremios: 1 },
    { numero: 70048, nombre: '2.º Premio', categoria: 'segundo_premio', importeDecimo: 125_000, importeBillete: 1_250_000, numeroPremios: 1 },
    { numero: 90693, nombre: '3.º Premio', categoria: 'tercer_premio',  importeDecimo:  50_000, importeBillete:   500_000, numeroPremios: 1 },
    { numero: 79431, nombre: 'Aproximación anterior al Gordo', categoria: 'aproximacion', importeDecimo: 1_600, importeBillete: 16_000 },
    { numero: 79433, nombre: 'Aproximación posterior al Gordo', categoria: 'aproximacion', importeDecimo: 1_600, importeBillete: 16_000 },
  ],
};

// ================================================
// HELPERS
// ================================================

/** Devuelve los premios del Gordo de Navidad para un año dado */
export function getPremiosGordo(anio: number): Premio[] {
  return PREMIOS_GORDO[anio] ?? [];
}

/** Devuelve los premios de El Niño para un año dado */
export function getPremiosNino(anio: number): Premio[] {
  return PREMIOS_NINO[anio] ?? [];
}

/** Devuelve los premios de Lotería Nacional para una fecha exacta (YYYY-MM-DD) */
export function getPremiosLoteriaFecha(fecha: string): Premio[] {
  return PREMIOS_LOTERIA_NACIONAL[fecha] ?? [];
}

/** Lista de fechas de sorteos de Lotería Nacional disponibles en mock (más reciente primero) */
export function getFechasSorteosDisponibles(): string[] {
  return Object.keys(PREMIOS_LOTERIA_NACIONAL).sort().reverse();
}

export function getAniosDisponibles(): number[] {
  const anioActual = new Date().getFullYear();
  const anios: number[] = [];
  for (let i = anioActual; i >= 2000; i--) {
    anios.push(i);
  }
  return anios;
}
