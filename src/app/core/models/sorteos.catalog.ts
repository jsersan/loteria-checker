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
    usaFechaExacta: true,
  },
];

// ================================================
// GORDO DE NAVIDAD — Datos reales SELAE 2000–2025
// Fuente: decimosdeloterias.es / loteriasyapuestas.es
// Premio desde 2011: 1.º=400.000€, 2.º=125.000€, 3.º=50.000€/décimo
// Antes de 2011 los importes eran distintos (en pesetas/euros menores)
// ================================================

export const PREMIOS_GORDO: Record<number, Premio[]> = {
  2025: [
    { numero: 79432, nombre: '1.º Premio — El Gordo', categoria: 'primer_premio', importeDecimo: 400_000, importeBillete: 4_000_000, numeroPremios: 1 },
    { numero: 79431, nombre: 'Aproximación anterior al Gordo', categoria: 'aproximacion', importeDecimo: 2_000, importeBillete: 20_000 },
    { numero: 79433, nombre: 'Aproximación posterior al Gordo', categoria: 'aproximacion', importeDecimo: 2_000, importeBillete: 20_000 },
    { numero: 70048, nombre: '2.º Premio', categoria: 'segundo_premio', importeDecimo: 125_000, importeBillete: 1_250_000, numeroPremios: 1 },
    { numero: 70047, nombre: 'Aproximación anterior al 2.º', categoria: 'aproximacion', importeDecimo: 1_250, importeBillete: 12_500 },
    { numero: 70049, nombre: 'Aproximación posterior al 2.º', categoria: 'aproximacion', importeDecimo: 1_250, importeBillete: 12_500 },
    { numero: 90693, nombre: '3.º Premio', categoria: 'tercer_premio', importeDecimo: 50_000, importeBillete: 500_000, numeroPremios: 1 },
    { numero: 90692, nombre: 'Aproximación anterior al 3.º', categoria: 'aproximacion', importeDecimo: 960, importeBillete: 9_600 },
    { numero: 90694, nombre: 'Aproximación posterior al 3.º', categoria: 'aproximacion', importeDecimo: 960, importeBillete: 9_600 },
    { numero: 78477, nombre: '4.º Premio', categoria: 'cuarto_premio', importeDecimo: 20_000, importeBillete: 200_000 },
    { numero: 25508, nombre: '4.º Premio', categoria: 'cuarto_premio', importeDecimo: 20_000, importeBillete: 200_000 },
  ],
  2024: [
    { numero: 72480, nombre: '1.º Premio — El Gordo', categoria: 'primer_premio', importeDecimo: 400_000, importeBillete: 4_000_000, numeroPremios: 1 },
    { numero: 72479, nombre: 'Aproximación anterior al Gordo', categoria: 'aproximacion', importeDecimo: 2_000, importeBillete: 20_000 },
    { numero: 72481, nombre: 'Aproximación posterior al Gordo', categoria: 'aproximacion', importeDecimo: 2_000, importeBillete: 20_000 },
    { numero: 40014, nombre: '2.º Premio', categoria: 'segundo_premio', importeDecimo: 125_000, importeBillete: 1_250_000, numeroPremios: 1 },
    { numero: 40013, nombre: 'Aproximación anterior al 2.º', categoria: 'aproximacion', importeDecimo: 1_250, importeBillete: 12_500 },
    { numero: 40015, nombre: 'Aproximación posterior al 2.º', categoria: 'aproximacion', importeDecimo: 1_250, importeBillete: 12_500 },
    { numero: 11840, nombre: '3.º Premio', categoria: 'tercer_premio', importeDecimo: 50_000, importeBillete: 500_000, numeroPremios: 1 },
    { numero: 11839, nombre: 'Aproximación anterior al 3.º', categoria: 'aproximacion', importeDecimo: 960, importeBillete: 9_600 },
    { numero: 11841, nombre: 'Aproximación posterior al 3.º', categoria: 'aproximacion', importeDecimo: 960, importeBillete: 9_600 },
    { numero: 77768, nombre: '4.º Premio', categoria: 'cuarto_premio', importeDecimo: 20_000, importeBillete: 200_000 },
    { numero: 48020, nombre: '4.º Premio', categoria: 'cuarto_premio', importeDecimo: 20_000, importeBillete: 200_000 },
  ],
  2023: [
    { numero: 88008, nombre: '1.º Premio — El Gordo', categoria: 'primer_premio', importeDecimo: 400_000, importeBillete: 4_000_000, numeroPremios: 1 },
    { numero: 88007, nombre: 'Aproximación anterior al Gordo', categoria: 'aproximacion', importeDecimo: 2_000, importeBillete: 20_000 },
    { numero: 88009, nombre: 'Aproximación posterior al Gordo', categoria: 'aproximacion', importeDecimo: 2_000, importeBillete: 20_000 },
    { numero: 58303, nombre: '2.º Premio', categoria: 'segundo_premio', importeDecimo: 125_000, importeBillete: 1_250_000, numeroPremios: 1 },
    { numero: 58302, nombre: 'Aproximación anterior al 2.º', categoria: 'aproximacion', importeDecimo: 1_250, importeBillete: 12_500 },
    { numero: 58304, nombre: 'Aproximación posterior al 2.º', categoria: 'aproximacion', importeDecimo: 1_250, importeBillete: 12_500 },
    { numero: 31938, nombre: '3.º Premio', categoria: 'tercer_premio', importeDecimo: 50_000, importeBillete: 500_000, numeroPremios: 1 },
    { numero: 31937, nombre: 'Aproximación anterior al 3.º', categoria: 'aproximacion', importeDecimo: 960, importeBillete: 9_600 },
    { numero: 31939, nombre: 'Aproximación posterior al 3.º', categoria: 'aproximacion', importeDecimo: 960, importeBillete: 9_600 },
    { numero: 93361, nombre: '4.º Premio', categoria: 'cuarto_premio', importeDecimo: 20_000, importeBillete: 200_000 },
    { numero: 41147, nombre: '4.º Premio', categoria: 'cuarto_premio', importeDecimo: 20_000, importeBillete: 200_000 },
  ],
  2022: [
    { numero:  5490, nombre: '1.º Premio — El Gordo', categoria: 'primer_premio', importeDecimo: 400_000, importeBillete: 4_000_000, numeroPremios: 1 },
    { numero:  5489, nombre: 'Aproximación anterior al Gordo', categoria: 'aproximacion', importeDecimo: 2_000, importeBillete: 20_000 },
    { numero:  5491, nombre: 'Aproximación posterior al Gordo', categoria: 'aproximacion', importeDecimo: 2_000, importeBillete: 20_000 },
    { numero:  4074, nombre: '2.º Premio', categoria: 'segundo_premio', importeDecimo: 125_000, importeBillete: 1_250_000, numeroPremios: 1 },
    { numero:  4073, nombre: 'Aproximación anterior al 2.º', categoria: 'aproximacion', importeDecimo: 1_250, importeBillete: 12_500 },
    { numero:  4075, nombre: 'Aproximación posterior al 2.º', categoria: 'aproximacion', importeDecimo: 1_250, importeBillete: 12_500 },
    { numero: 45250, nombre: '3.º Premio', categoria: 'tercer_premio', importeDecimo: 50_000, importeBillete: 500_000, numeroPremios: 1 },
    { numero: 45249, nombre: 'Aproximación anterior al 3.º', categoria: 'aproximacion', importeDecimo: 960, importeBillete: 9_600 },
    { numero: 45251, nombre: 'Aproximación posterior al 3.º', categoria: 'aproximacion', importeDecimo: 960, importeBillete: 9_600 },
    { numero: 54289, nombre: '4.º Premio', categoria: 'cuarto_premio', importeDecimo: 20_000, importeBillete: 200_000 },
    { numero: 25296, nombre: '4.º Premio', categoria: 'cuarto_premio', importeDecimo: 20_000, importeBillete: 200_000 },
  ],
  2021: [
    { numero: 86148, nombre: '1.º Premio — El Gordo', categoria: 'primer_premio', importeDecimo: 400_000, importeBillete: 4_000_000, numeroPremios: 1 },
    { numero: 86147, nombre: 'Aproximación anterior al Gordo', categoria: 'aproximacion', importeDecimo: 2_000, importeBillete: 20_000 },
    { numero: 86149, nombre: 'Aproximación posterior al Gordo', categoria: 'aproximacion', importeDecimo: 2_000, importeBillete: 20_000 },
    { numero: 72119, nombre: '2.º Premio', categoria: 'segundo_premio', importeDecimo: 125_000, importeBillete: 1_250_000, numeroPremios: 1 },
    { numero: 72118, nombre: 'Aproximación anterior al 2.º', categoria: 'aproximacion', importeDecimo: 1_250, importeBillete: 12_500 },
    { numero: 72120, nombre: 'Aproximación posterior al 2.º', categoria: 'aproximacion', importeDecimo: 1_250, importeBillete: 12_500 },
    { numero: 19517, nombre: '3.º Premio', categoria: 'tercer_premio', importeDecimo: 50_000, importeBillete: 500_000, numeroPremios: 1 },
    { numero: 19516, nombre: 'Aproximación anterior al 3.º', categoria: 'aproximacion', importeDecimo: 960, importeBillete: 9_600 },
    { numero: 19518, nombre: 'Aproximación posterior al 3.º', categoria: 'aproximacion', importeDecimo: 960, importeBillete: 9_600 },
    { numero: 42833, nombre: '4.º Premio', categoria: 'cuarto_premio', importeDecimo: 20_000, importeBillete: 200_000 },
    { numero: 91179, nombre: '4.º Premio', categoria: 'cuarto_premio', importeDecimo: 20_000, importeBillete: 200_000 },
  ],
  2020: [
    { numero: 72897, nombre: '1.º Premio — El Gordo', categoria: 'primer_premio', importeDecimo: 400_000, importeBillete: 4_000_000, numeroPremios: 1 },
    { numero: 72896, nombre: 'Aproximación anterior al Gordo', categoria: 'aproximacion', importeDecimo: 2_000, importeBillete: 20_000 },
    { numero: 72898, nombre: 'Aproximación posterior al Gordo', categoria: 'aproximacion', importeDecimo: 2_000, importeBillete: 20_000 },
    { numero:  6095, nombre: '2.º Premio', categoria: 'segundo_premio', importeDecimo: 125_000, importeBillete: 1_250_000, numeroPremios: 1 },
    { numero:  6094, nombre: 'Aproximación anterior al 2.º', categoria: 'aproximacion', importeDecimo: 1_250, importeBillete: 12_500 },
    { numero:  6096, nombre: 'Aproximación posterior al 2.º', categoria: 'aproximacion', importeDecimo: 1_250, importeBillete: 12_500 },
    { numero: 52472, nombre: '3.º Premio', categoria: 'tercer_premio', importeDecimo: 50_000, importeBillete: 500_000, numeroPremios: 1 },
    { numero: 52471, nombre: 'Aproximación anterior al 3.º', categoria: 'aproximacion', importeDecimo: 960, importeBillete: 9_600 },
    { numero: 52473, nombre: 'Aproximación posterior al 3.º', categoria: 'aproximacion', importeDecimo: 960, importeBillete: 9_600 },
    { numero: 75981, nombre: '4.º Premio', categoria: 'cuarto_premio', importeDecimo: 20_000, importeBillete: 200_000 },
    { numero: 38341, nombre: '4.º Premio', categoria: 'cuarto_premio', importeDecimo: 20_000, importeBillete: 200_000 },
  ],
  2019: [
    { numero: 26590, nombre: '1.º Premio — El Gordo', categoria: 'primer_premio', importeDecimo: 400_000, importeBillete: 4_000_000, numeroPremios: 1 },
    { numero: 26589, nombre: 'Aproximación anterior al Gordo', categoria: 'aproximacion', importeDecimo: 2_000, importeBillete: 20_000 },
    { numero: 26591, nombre: 'Aproximación posterior al Gordo', categoria: 'aproximacion', importeDecimo: 2_000, importeBillete: 20_000 },
    { numero: 10989, nombre: '2.º Premio', categoria: 'segundo_premio', importeDecimo: 125_000, importeBillete: 1_250_000, numeroPremios: 1 },
    { numero: 10988, nombre: 'Aproximación anterior al 2.º', categoria: 'aproximacion', importeDecimo: 1_250, importeBillete: 12_500 },
    { numero: 10990, nombre: 'Aproximación posterior al 2.º', categoria: 'aproximacion', importeDecimo: 1_250, importeBillete: 12_500 },
    { numero:   750, nombre: '3.º Premio', categoria: 'tercer_premio', importeDecimo: 50_000, importeBillete: 500_000, numeroPremios: 1 },
    { numero:   749, nombre: 'Aproximación anterior al 3.º', categoria: 'aproximacion', importeDecimo: 960, importeBillete: 9_600 },
    { numero:   751, nombre: 'Aproximación posterior al 3.º', categoria: 'aproximacion', importeDecimo: 960, importeBillete: 9_600 },
    { numero: 41710, nombre: '4.º Premio', categoria: 'cuarto_premio', importeDecimo: 20_000, importeBillete: 200_000 },
    { numero: 49797, nombre: '4.º Premio', categoria: 'cuarto_premio', importeDecimo: 20_000, importeBillete: 200_000 },
  ],
  2018: [
    { numero:  3347, nombre: '1.º Premio — El Gordo', categoria: 'primer_premio', importeDecimo: 400_000, importeBillete: 4_000_000, numeroPremios: 1 },
    { numero:  3346, nombre: 'Aproximación anterior al Gordo', categoria: 'aproximacion', importeDecimo: 2_000, importeBillete: 20_000 },
    { numero:  3348, nombre: 'Aproximación posterior al Gordo', categoria: 'aproximacion', importeDecimo: 2_000, importeBillete: 20_000 },
    { numero: 21015, nombre: '2.º Premio', categoria: 'segundo_premio', importeDecimo: 125_000, importeBillete: 1_250_000, numeroPremios: 1 },
    { numero: 21014, nombre: 'Aproximación anterior al 2.º', categoria: 'aproximacion', importeDecimo: 1_250, importeBillete: 12_500 },
    { numero: 21016, nombre: 'Aproximación posterior al 2.º', categoria: 'aproximacion', importeDecimo: 1_250, importeBillete: 12_500 },
    { numero:  4211, nombre: '3.º Premio', categoria: 'tercer_premio', importeDecimo: 50_000, importeBillete: 500_000, numeroPremios: 1 },
    { numero:  4210, nombre: 'Aproximación anterior al 3.º', categoria: 'aproximacion', importeDecimo: 960, importeBillete: 9_600 },
    { numero:  4212, nombre: 'Aproximación posterior al 3.º', categoria: 'aproximacion', importeDecimo: 960, importeBillete: 9_600 },
    { numero: 42206, nombre: '4.º Premio', categoria: 'cuarto_premio', importeDecimo: 20_000, importeBillete: 200_000 },
    { numero: 67774, nombre: '4.º Premio', categoria: 'cuarto_premio', importeDecimo: 20_000, importeBillete: 200_000 },
  ],
  2017: [
    { numero: 71198, nombre: '1.º Premio — El Gordo', categoria: 'primer_premio', importeDecimo: 400_000, importeBillete: 4_000_000, numeroPremios: 1 },
    { numero: 71197, nombre: 'Aproximación anterior al Gordo', categoria: 'aproximacion', importeDecimo: 2_000, importeBillete: 20_000 },
    { numero: 71199, nombre: 'Aproximación posterior al Gordo', categoria: 'aproximacion', importeDecimo: 2_000, importeBillete: 20_000 },
    { numero: 51244, nombre: '2.º Premio', categoria: 'segundo_premio', importeDecimo: 125_000, importeBillete: 1_250_000, numeroPremios: 1 },
    { numero: 51243, nombre: 'Aproximación anterior al 2.º', categoria: 'aproximacion', importeDecimo: 1_250, importeBillete: 12_500 },
    { numero: 51245, nombre: 'Aproximación posterior al 2.º', categoria: 'aproximacion', importeDecimo: 1_250, importeBillete: 12_500 },
    { numero:  6914, nombre: '3.º Premio', categoria: 'tercer_premio', importeDecimo: 50_000, importeBillete: 500_000, numeroPremios: 1 },
    { numero:  6913, nombre: 'Aproximación anterior al 3.º', categoria: 'aproximacion', importeDecimo: 960, importeBillete: 9_600 },
    { numero:  6915, nombre: 'Aproximación posterior al 3.º', categoria: 'aproximacion', importeDecimo: 960, importeBillete: 9_600 },
    { numero: 13378, nombre: '4.º Premio', categoria: 'cuarto_premio', importeDecimo: 20_000, importeBillete: 200_000 },
    { numero: 61207, nombre: '4.º Premio', categoria: 'cuarto_premio', importeDecimo: 20_000, importeBillete: 200_000 },
  ],
  2016: [
    { numero: 66513, nombre: '1.º Premio — El Gordo', categoria: 'primer_premio', importeDecimo: 400_000, importeBillete: 4_000_000, numeroPremios: 1 },
    { numero: 66512, nombre: 'Aproximación anterior al Gordo', categoria: 'aproximacion', importeDecimo: 2_000, importeBillete: 20_000 },
    { numero: 66514, nombre: 'Aproximación posterior al Gordo', categoria: 'aproximacion', importeDecimo: 2_000, importeBillete: 20_000 },
    { numero:  4536, nombre: '2.º Premio', categoria: 'segundo_premio', importeDecimo: 125_000, importeBillete: 1_250_000, numeroPremios: 1 },
    { numero:  4535, nombre: 'Aproximación anterior al 2.º', categoria: 'aproximacion', importeDecimo: 1_250, importeBillete: 12_500 },
    { numero:  4537, nombre: 'Aproximación posterior al 2.º', categoria: 'aproximacion', importeDecimo: 1_250, importeBillete: 12_500 },
    { numero: 78748, nombre: '3.º Premio', categoria: 'tercer_premio', importeDecimo: 50_000, importeBillete: 500_000, numeroPremios: 1 },
    { numero: 78747, nombre: 'Aproximación anterior al 3.º', categoria: 'aproximacion', importeDecimo: 960, importeBillete: 9_600 },
    { numero: 78749, nombre: 'Aproximación posterior al 3.º', categoria: 'aproximacion', importeDecimo: 960, importeBillete: 9_600 },
    { numero: 59444, nombre: '4.º Premio', categoria: 'cuarto_premio', importeDecimo: 20_000, importeBillete: 200_000 },
    { numero:  7211, nombre: '4.º Premio', categoria: 'cuarto_premio', importeDecimo: 20_000, importeBillete: 200_000 },
  ],
  2015: [
    { numero: 79140, nombre: '1.º Premio — El Gordo', categoria: 'primer_premio', importeDecimo: 400_000, importeBillete: 4_000_000, numeroPremios: 1 },
    { numero: 79139, nombre: 'Aproximación anterior al Gordo', categoria: 'aproximacion', importeDecimo: 2_000, importeBillete: 20_000 },
    { numero: 79141, nombre: 'Aproximación posterior al Gordo', categoria: 'aproximacion', importeDecimo: 2_000, importeBillete: 20_000 },
    { numero: 12775, nombre: '2.º Premio', categoria: 'segundo_premio', importeDecimo: 125_000, importeBillete: 1_250_000, numeroPremios: 1 },
    { numero: 12774, nombre: 'Aproximación anterior al 2.º', categoria: 'aproximacion', importeDecimo: 1_250, importeBillete: 12_500 },
    { numero: 12776, nombre: 'Aproximación posterior al 2.º', categoria: 'aproximacion', importeDecimo: 1_250, importeBillete: 12_500 },
    { numero:  5163, nombre: '3.º Premio', categoria: 'tercer_premio', importeDecimo: 50_000, importeBillete: 500_000, numeroPremios: 1 },
    { numero:  5162, nombre: 'Aproximación anterior al 3.º', categoria: 'aproximacion', importeDecimo: 960, importeBillete: 9_600 },
    { numero:  5164, nombre: 'Aproximación posterior al 3.º', categoria: 'aproximacion', importeDecimo: 960, importeBillete: 9_600 },
    { numero: 52215, nombre: '4.º Premio', categoria: 'cuarto_premio', importeDecimo: 20_000, importeBillete: 200_000 },
    { numero: 71119, nombre: '4.º Premio', categoria: 'cuarto_premio', importeDecimo: 20_000, importeBillete: 200_000 },
  ],
  2014: [
    { numero: 13437, nombre: '1.º Premio — El Gordo', categoria: 'primer_premio', importeDecimo: 400_000, importeBillete: 4_000_000, numeroPremios: 1 },
    { numero: 13436, nombre: 'Aproximación anterior al Gordo', categoria: 'aproximacion', importeDecimo: 2_000, importeBillete: 20_000 },
    { numero: 13438, nombre: 'Aproximación posterior al Gordo', categoria: 'aproximacion', importeDecimo: 2_000, importeBillete: 20_000 },
    { numero: 92845, nombre: '2.º Premio', categoria: 'segundo_premio', importeDecimo: 125_000, importeBillete: 1_250_000, numeroPremios: 1 },
    { numero: 92844, nombre: 'Aproximación anterior al 2.º', categoria: 'aproximacion', importeDecimo: 1_250, importeBillete: 12_500 },
    { numero: 92846, nombre: 'Aproximación posterior al 2.º', categoria: 'aproximacion', importeDecimo: 1_250, importeBillete: 12_500 },
    { numero:  7637, nombre: '3.º Premio', categoria: 'tercer_premio', importeDecimo: 50_000, importeBillete: 500_000, numeroPremios: 1 },
    { numero:  7636, nombre: 'Aproximación anterior al 3.º', categoria: 'aproximacion', importeDecimo: 960, importeBillete: 9_600 },
    { numero:  7638, nombre: 'Aproximación posterior al 3.º', categoria: 'aproximacion', importeDecimo: 960, importeBillete: 9_600 },
    { numero:  7617, nombre: '4.º Premio', categoria: 'cuarto_premio', importeDecimo: 20_000, importeBillete: 200_000 },
    { numero: 67009, nombre: '4.º Premio', categoria: 'cuarto_premio', importeDecimo: 20_000, importeBillete: 200_000 },
  ],
  2013: [
    { numero: 62246, nombre: '1.º Premio — El Gordo', categoria: 'primer_premio', importeDecimo: 400_000, importeBillete: 4_000_000, numeroPremios: 1 },
    { numero: 62245, nombre: 'Aproximación anterior al Gordo', categoria: 'aproximacion', importeDecimo: 2_000, importeBillete: 20_000 },
    { numero: 62247, nombre: 'Aproximación posterior al Gordo', categoria: 'aproximacion', importeDecimo: 2_000, importeBillete: 20_000 },
    { numero: 79712, nombre: '2.º Premio', categoria: 'segundo_premio', importeDecimo: 125_000, importeBillete: 1_250_000, numeroPremios: 1 },
    { numero: 79711, nombre: 'Aproximación anterior al 2.º', categoria: 'aproximacion', importeDecimo: 1_250, importeBillete: 12_500 },
    { numero: 79713, nombre: 'Aproximación posterior al 2.º', categoria: 'aproximacion', importeDecimo: 1_250, importeBillete: 12_500 },
    { numero: 51689, nombre: '3.º Premio', categoria: 'tercer_premio', importeDecimo: 50_000, importeBillete: 500_000, numeroPremios: 1 },
    { numero: 51688, nombre: 'Aproximación anterior al 3.º', categoria: 'aproximacion', importeDecimo: 960, importeBillete: 9_600 },
    { numero: 51690, nombre: 'Aproximación posterior al 3.º', categoria: 'aproximacion', importeDecimo: 960, importeBillete: 9_600 },
    { numero: 67065, nombre: '4.º Premio', categoria: 'cuarto_premio', importeDecimo: 20_000, importeBillete: 200_000 },
    { numero: 79800, nombre: '4.º Premio', categoria: 'cuarto_premio', importeDecimo: 20_000, importeBillete: 200_000 },
  ],
  2012: [
    { numero: 76058, nombre: '1.º Premio — El Gordo', categoria: 'primer_premio', importeDecimo: 400_000, importeBillete: 4_000_000, numeroPremios: 1 },
    { numero: 76057, nombre: 'Aproximación anterior al Gordo', categoria: 'aproximacion', importeDecimo: 2_000, importeBillete: 20_000 },
    { numero: 76059, nombre: 'Aproximación posterior al Gordo', categoria: 'aproximacion', importeDecimo: 2_000, importeBillete: 20_000 },
    { numero: 42260, nombre: '2.º Premio', categoria: 'segundo_premio', importeDecimo: 125_000, importeBillete: 1_250_000, numeroPremios: 1 },
    { numero: 42259, nombre: 'Aproximación anterior al 2.º', categoria: 'aproximacion', importeDecimo: 1_250, importeBillete: 12_500 },
    { numero: 42261, nombre: 'Aproximación posterior al 2.º', categoria: 'aproximacion', importeDecimo: 1_250, importeBillete: 12_500 },
    { numero: 64084, nombre: '3.º Premio', categoria: 'tercer_premio', importeDecimo: 50_000, importeBillete: 500_000, numeroPremios: 1 },
    { numero: 64083, nombre: 'Aproximación anterior al 3.º', categoria: 'aproximacion', importeDecimo: 960, importeBillete: 9_600 },
    { numero: 64085, nombre: 'Aproximación posterior al 3.º', categoria: 'aproximacion', importeDecimo: 960, importeBillete: 9_600 },
    { numero: 85045, nombre: '4.º Premio', categoria: 'cuarto_premio', importeDecimo: 20_000, importeBillete: 200_000 },
    { numero: 23475, nombre: '4.º Premio', categoria: 'cuarto_premio', importeDecimo: 20_000, importeBillete: 200_000 },
  ],
  2011: [
    { numero: 58268, nombre: '1.º Premio — El Gordo', categoria: 'primer_premio', importeDecimo: 400_000, importeBillete: 4_000_000, numeroPremios: 1 },
    { numero: 58267, nombre: 'Aproximación anterior al Gordo', categoria: 'aproximacion', importeDecimo: 2_000, importeBillete: 20_000 },
    { numero: 58269, nombre: 'Aproximación posterior al Gordo', categoria: 'aproximacion', importeDecimo: 2_000, importeBillete: 20_000 },
    { numero: 53404, nombre: '2.º Premio', categoria: 'segundo_premio', importeDecimo: 125_000, importeBillete: 1_250_000, numeroPremios: 1 },
    { numero: 53403, nombre: 'Aproximación anterior al 2.º', categoria: 'aproximacion', importeDecimo: 1_250, importeBillete: 12_500 },
    { numero: 53405, nombre: 'Aproximación posterior al 2.º', categoria: 'aproximacion', importeDecimo: 1_250, importeBillete: 12_500 },
    { numero:  2184, nombre: '3.º Premio', categoria: 'tercer_premio', importeDecimo: 50_000, importeBillete: 500_000, numeroPremios: 1 },
    { numero:  2183, nombre: 'Aproximación anterior al 3.º', categoria: 'aproximacion', importeDecimo: 960, importeBillete: 9_600 },
    { numero:  2185, nombre: 'Aproximación posterior al 3.º', categoria: 'aproximacion', importeDecimo: 960, importeBillete: 9_600 },
    { numero: 66832, nombre: '4.º Premio', categoria: 'cuarto_premio', importeDecimo: 20_000, importeBillete: 200_000 },
    { numero: 12249, nombre: '4.º Premio', categoria: 'cuarto_premio', importeDecimo: 20_000, importeBillete: 200_000 },
  ],
  // Antes de 2011 los premios eran distintos (200.000€/décimo el 1.º, 60.000€ el 2.º, 20.000€ el 3.º)
  2010: [
    { numero: 79250, nombre: '1.º Premio — El Gordo', categoria: 'primer_premio', importeDecimo: 300_000, importeBillete: 3_000_000, numeroPremios: 1 },
    { numero: 79249, nombre: 'Aproximación anterior al Gordo', categoria: 'aproximacion', importeDecimo: 1_200, importeBillete: 12_000 },
    { numero: 79251, nombre: 'Aproximación posterior al Gordo', categoria: 'aproximacion', importeDecimo: 1_200, importeBillete: 12_000 },
    { numero:   147, nombre: '2.º Premio', categoria: 'segundo_premio', importeDecimo: 60_000, importeBillete: 600_000, numeroPremios: 1 },
    { numero: 75913, nombre: '3.º Premio', categoria: 'tercer_premio', importeDecimo: 20_000, importeBillete: 200_000, numeroPremios: 1 },
  ],
  2009: [
    { numero: 78294, nombre: '1.º Premio — El Gordo', categoria: 'primer_premio', importeDecimo: 300_000, importeBillete: 3_000_000, numeroPremios: 1 },
    { numero: 78293, nombre: 'Aproximación anterior al Gordo', categoria: 'aproximacion', importeDecimo: 1_200, importeBillete: 12_000 },
    { numero: 78295, nombre: 'Aproximación posterior al Gordo', categoria: 'aproximacion', importeDecimo: 1_200, importeBillete: 12_000 },
    { numero: 53152, nombre: '2.º Premio', categoria: 'segundo_premio', importeDecimo: 60_000, importeBillete: 600_000, numeroPremios: 1 },
    { numero: 10104, nombre: '3.º Premio', categoria: 'tercer_premio', importeDecimo: 20_000, importeBillete: 200_000, numeroPremios: 1 },
  ],
  2008: [
    { numero: 32365, nombre: '1.º Premio — El Gordo', categoria: 'primer_premio', importeDecimo: 300_000, importeBillete: 3_000_000, numeroPremios: 1 },
    { numero: 32364, nombre: 'Aproximación anterior al Gordo', categoria: 'aproximacion', importeDecimo: 1_200, importeBillete: 12_000 },
    { numero: 32366, nombre: 'Aproximación posterior al Gordo', categoria: 'aproximacion', importeDecimo: 1_200, importeBillete: 12_000 },
    { numero: 78400, nombre: '2.º Premio', categoria: 'segundo_premio', importeDecimo: 60_000, importeBillete: 600_000, numeroPremios: 1 },
    { numero: 80076, nombre: '3.º Premio', categoria: 'tercer_premio', importeDecimo: 20_000, importeBillete: 200_000, numeroPremios: 1 },
  ],
  2007: [
    { numero:  6381, nombre: '1.º Premio — El Gordo', categoria: 'primer_premio', importeDecimo: 300_000, importeBillete: 3_000_000, numeroPremios: 1 },
    { numero:  6380, nombre: 'Aproximación anterior al Gordo', categoria: 'aproximacion', importeDecimo: 1_200, importeBillete: 12_000 },
    { numero:  6382, nombre: 'Aproximación posterior al Gordo', categoria: 'aproximacion', importeDecimo: 1_200, importeBillete: 12_000 },
    { numero: 55469, nombre: '2.º Premio', categoria: 'segundo_premio', importeDecimo: 60_000, importeBillete: 600_000, numeroPremios: 1 },
    { numero: 29914, nombre: '3.º Premio', categoria: 'tercer_premio', importeDecimo: 20_000, importeBillete: 200_000, numeroPremios: 1 },
  ],
  2006: [
    { numero: 20297, nombre: '1.º Premio — El Gordo', categoria: 'primer_premio', importeDecimo: 300_000, importeBillete: 3_000_000, numeroPremios: 1 },
    { numero: 20296, nombre: 'Aproximación anterior al Gordo', categoria: 'aproximacion', importeDecimo: 1_200, importeBillete: 12_000 },
    { numero: 20298, nombre: 'Aproximación posterior al Gordo', categoria: 'aproximacion', importeDecimo: 1_200, importeBillete: 12_000 },
  ],
  2005: [
    { numero: 20085, nombre: '1.º Premio — El Gordo', categoria: 'primer_premio', importeDecimo: 300_000, importeBillete: 3_000_000, numeroPremios: 1 },
    { numero: 20084, nombre: 'Aproximación anterior al Gordo', categoria: 'aproximacion', importeDecimo: 1_200, importeBillete: 12_000 },
    { numero: 20086, nombre: 'Aproximación posterior al Gordo', categoria: 'aproximacion', importeDecimo: 1_200, importeBillete: 12_000 },
  ],
  2004: [
    { numero: 54600, nombre: '1.º Premio — El Gordo', categoria: 'primer_premio', importeDecimo: 300_000, importeBillete: 3_000_000, numeroPremios: 1 },
    { numero: 54599, nombre: 'Aproximación anterior al Gordo', categoria: 'aproximacion', importeDecimo: 1_200, importeBillete: 12_000 },
    { numero: 54601, nombre: 'Aproximación posterior al Gordo', categoria: 'aproximacion', importeDecimo: 1_200, importeBillete: 12_000 },
  ],
  2003: [
    { numero: 42473, nombre: '1.º Premio — El Gordo', categoria: 'primer_premio', importeDecimo: 300_000, importeBillete: 3_000_000, numeroPremios: 1 },
    { numero: 42472, nombre: 'Aproximación anterior al Gordo', categoria: 'aproximacion', importeDecimo: 1_200, importeBillete: 12_000 },
    { numero: 42474, nombre: 'Aproximación posterior al Gordo', categoria: 'aproximacion', importeDecimo: 1_200, importeBillete: 12_000 },
  ],
  2002: [
    { numero:  8103, nombre: '1.º Premio — El Gordo', categoria: 'primer_premio', importeDecimo: 300_000, importeBillete: 3_000_000, numeroPremios: 1 },
    { numero:  8102, nombre: 'Aproximación anterior al Gordo', categoria: 'aproximacion', importeDecimo: 1_200, importeBillete: 12_000 },
    { numero:  8104, nombre: 'Aproximación posterior al Gordo', categoria: 'aproximacion', importeDecimo: 1_200, importeBillete: 12_000 },
  ],
  2001: [
    { numero: 18795, nombre: '1.º Premio — El Gordo', categoria: 'primer_premio', importeDecimo: 300_000, importeBillete: 3_000_000, numeroPremios: 1 },
    { numero: 18794, nombre: 'Aproximación anterior al Gordo', categoria: 'aproximacion', importeDecimo: 1_200, importeBillete: 12_000 },
    { numero: 18796, nombre: 'Aproximación posterior al Gordo', categoria: 'aproximacion', importeDecimo: 1_200, importeBillete: 12_000 },
  ],
  2000: [
    { numero: 49740, nombre: '1.º Premio — El Gordo', categoria: 'primer_premio', importeDecimo: 300_000, importeBillete: 3_000_000, numeroPremios: 1 },
    { numero: 49739, nombre: 'Aproximación anterior al Gordo', categoria: 'aproximacion', importeDecimo: 1_200, importeBillete: 12_000 },
    { numero: 49741, nombre: 'Aproximación posterior al Gordo', categoria: 'aproximacion', importeDecimo: 1_200, importeBillete: 12_000 },
  ],
};

// ================================================
// EL NIÑO — Datos reales SELAE 2000–2026
// Fuente: decimosdeloterias.es
// Premio: 1.º=200.000€, 2.º=75.000€, 3.º=25.000€/décimo
// ================================================

export const PREMIOS_NINO: Record<number, Premio[]> = {
  2026: [
    { numero:  6703, nombre: '1.º Premio — El Niño', categoria: 'primer_premio', importeDecimo: 200_000, importeBillete: 2_000_000, numeroPremios: 1 },
    { numero:  6702, nombre: 'Aproximación anterior al 1.º', categoria: 'aproximacion', importeDecimo: 1_000, importeBillete: 10_000 },
    { numero:  6704, nombre: 'Aproximación posterior al 1.º', categoria: 'aproximacion', importeDecimo: 1_000, importeBillete: 10_000 },
    { numero: 45875, nombre: '2.º Premio', categoria: 'segundo_premio', importeDecimo: 75_000, importeBillete: 750_000, numeroPremios: 1 },
    { numero: 32615, nombre: '3.º Premio', categoria: 'tercer_premio', importeDecimo: 25_000, importeBillete: 250_000, numeroPremios: 1 },
  ],
  2025: [
    { numero: 78908, nombre: '1.º Premio — El Niño', categoria: 'primer_premio', importeDecimo: 200_000, importeBillete: 2_000_000, numeroPremios: 1 },
    { numero: 78907, nombre: 'Aproximación anterior al 1.º', categoria: 'aproximacion', importeDecimo: 1_000, importeBillete: 10_000 },
    { numero: 78909, nombre: 'Aproximación posterior al 1.º', categoria: 'aproximacion', importeDecimo: 1_000, importeBillete: 10_000 },
    { numero:  6766, nombre: '2.º Premio', categoria: 'segundo_premio', importeDecimo: 75_000, importeBillete: 750_000, numeroPremios: 1 },
    { numero: 66777, nombre: '3.º Premio', categoria: 'tercer_premio', importeDecimo: 25_000, importeBillete: 250_000, numeroPremios: 1 },
  ],
  2024: [
    { numero: 94974, nombre: '1.º Premio — El Niño', categoria: 'primer_premio', importeDecimo: 200_000, importeBillete: 2_000_000, numeroPremios: 1 },
    { numero: 94973, nombre: 'Aproximación anterior al 1.º', categoria: 'aproximacion', importeDecimo: 1_000, importeBillete: 10_000 },
    { numero: 94975, nombre: 'Aproximación posterior al 1.º', categoria: 'aproximacion', importeDecimo: 1_000, importeBillete: 10_000 },
    { numero: 89634, nombre: '2.º Premio', categoria: 'segundo_premio', importeDecimo: 75_000, importeBillete: 750_000, numeroPremios: 1 },
    { numero: 57033, nombre: '3.º Premio', categoria: 'tercer_premio', importeDecimo: 25_000, importeBillete: 250_000, numeroPremios: 1 },
  ],
  2023: [
    { numero: 89603, nombre: '1.º Premio — El Niño', categoria: 'primer_premio', importeDecimo: 200_000, importeBillete: 2_000_000, numeroPremios: 1 },
    { numero: 89602, nombre: 'Aproximación anterior al 1.º', categoria: 'aproximacion', importeDecimo: 1_000, importeBillete: 10_000 },
    { numero: 89604, nombre: 'Aproximación posterior al 1.º', categoria: 'aproximacion', importeDecimo: 1_000, importeBillete: 10_000 },
    { numero: 72289, nombre: '2.º Premio', categoria: 'segundo_premio', importeDecimo: 75_000, importeBillete: 750_000, numeroPremios: 1 },
    { numero: 18918, nombre: '3.º Premio', categoria: 'tercer_premio', importeDecimo: 25_000, importeBillete: 250_000, numeroPremios: 1 },
  ],
  2022: [
    { numero: 41665, nombre: '1.º Premio — El Niño', categoria: 'primer_premio', importeDecimo: 200_000, importeBillete: 2_000_000, numeroPremios: 1 },
    { numero: 41664, nombre: 'Aproximación anterior al 1.º', categoria: 'aproximacion', importeDecimo: 1_000, importeBillete: 10_000 },
    { numero: 41666, nombre: 'Aproximación posterior al 1.º', categoria: 'aproximacion', importeDecimo: 1_000, importeBillete: 10_000 },
    { numero: 44469, nombre: '2.º Premio', categoria: 'segundo_premio', importeDecimo: 75_000, importeBillete: 750_000, numeroPremios: 1 },
    { numero: 19467, nombre: '3.º Premio', categoria: 'tercer_premio', importeDecimo: 25_000, importeBillete: 250_000, numeroPremios: 1 },
  ],
  2021: [
    { numero: 19570, nombre: '1.º Premio — El Niño', categoria: 'primer_premio', importeDecimo: 200_000, importeBillete: 2_000_000, numeroPremios: 1 },
    { numero: 19569, nombre: 'Aproximación anterior al 1.º', categoria: 'aproximacion', importeDecimo: 1_000, importeBillete: 10_000 },
    { numero: 19571, nombre: 'Aproximación posterior al 1.º', categoria: 'aproximacion', importeDecimo: 1_000, importeBillete: 10_000 },
    { numero:  3436, nombre: '2.º Premio', categoria: 'segundo_premio', importeDecimo: 75_000, importeBillete: 750_000, numeroPremios: 1 },
    { numero:  5587, nombre: '3.º Premio', categoria: 'tercer_premio', importeDecimo: 25_000, importeBillete: 250_000, numeroPremios: 1 },
  ],
  2020: [
    { numero: 57342, nombre: '1.º Premio — El Niño', categoria: 'primer_premio', importeDecimo: 200_000, importeBillete: 2_000_000, numeroPremios: 1 },
    { numero: 57341, nombre: 'Aproximación anterior al 1.º', categoria: 'aproximacion', importeDecimo: 1_000, importeBillete: 10_000 },
    { numero: 57343, nombre: 'Aproximación posterior al 1.º', categoria: 'aproximacion', importeDecimo: 1_000, importeBillete: 10_000 },
    { numero: 21816, nombre: '2.º Premio', categoria: 'segundo_premio', importeDecimo: 75_000, importeBillete: 750_000, numeroPremios: 1 },
    { numero: 26706, nombre: '3.º Premio', categoria: 'tercer_premio', importeDecimo: 25_000, importeBillete: 250_000, numeroPremios: 1 },
  ],
  2019: [
    { numero: 37142, nombre: '1.º Premio — El Niño', categoria: 'primer_premio', importeDecimo: 200_000, importeBillete: 2_000_000, numeroPremios: 1 },
    { numero: 37141, nombre: 'Aproximación anterior al 1.º', categoria: 'aproximacion', importeDecimo: 1_000, importeBillete: 10_000 },
    { numero: 37143, nombre: 'Aproximación posterior al 1.º', categoria: 'aproximacion', importeDecimo: 1_000, importeBillete: 10_000 },
    { numero: 61776, nombre: '2.º Premio', categoria: 'segundo_premio', importeDecimo: 75_000, importeBillete: 750_000, numeroPremios: 1 },
    { numero: 20148, nombre: '3.º Premio', categoria: 'tercer_premio', importeDecimo: 25_000, importeBillete: 250_000, numeroPremios: 1 },
  ],
  2018: [
    { numero:  5685, nombre: '1.º Premio — El Niño', categoria: 'primer_premio', importeDecimo: 200_000, importeBillete: 2_000_000, numeroPremios: 1 },
    { numero:  5684, nombre: 'Aproximación anterior al 1.º', categoria: 'aproximacion', importeDecimo: 1_000, importeBillete: 10_000 },
    { numero:  5686, nombre: 'Aproximación posterior al 1.º', categoria: 'aproximacion', importeDecimo: 1_000, importeBillete: 10_000 },
    { numero: 18442, nombre: '2.º Premio', categoria: 'segundo_premio', importeDecimo: 75_000, importeBillete: 750_000, numeroPremios: 1 },
    { numero: 23282, nombre: '3.º Premio', categoria: 'tercer_premio', importeDecimo: 25_000, importeBillete: 250_000, numeroPremios: 1 },
  ],
  2017: [
    { numero:  8354, nombre: '1.º Premio — El Niño', categoria: 'primer_premio', importeDecimo: 200_000, importeBillete: 2_000_000, numeroPremios: 1 },
    { numero:  8353, nombre: 'Aproximación anterior al 1.º', categoria: 'aproximacion', importeDecimo: 1_000, importeBillete: 10_000 },
    { numero:  8355, nombre: 'Aproximación posterior al 1.º', categoria: 'aproximacion', importeDecimo: 1_000, importeBillete: 10_000 },
    { numero: 95379, nombre: '2.º Premio', categoria: 'segundo_premio', importeDecimo: 75_000, importeBillete: 750_000, numeroPremios: 1 },
    { numero: 85073, nombre: '3.º Premio', categoria: 'tercer_premio', importeDecimo: 25_000, importeBillete: 250_000, numeroPremios: 1 },
  ],
  2016: [
    { numero: 22654, nombre: '1.º Premio — El Niño', categoria: 'primer_premio', importeDecimo: 200_000, importeBillete: 2_000_000, numeroPremios: 1 },
    { numero: 22653, nombre: 'Aproximación anterior al 1.º', categoria: 'aproximacion', importeDecimo: 1_000, importeBillete: 10_000 },
    { numero: 22655, nombre: 'Aproximación posterior al 1.º', categoria: 'aproximacion', importeDecimo: 1_000, importeBillete: 10_000 },
    { numero: 60755, nombre: '2.º Premio', categoria: 'segundo_premio', importeDecimo: 75_000, importeBillete: 750_000, numeroPremios: 1 },
    { numero: 95395, nombre: '3.º Premio', categoria: 'tercer_premio', importeDecimo: 25_000, importeBillete: 250_000, numeroPremios: 1 },
  ],
  2015: [
    { numero: 55487, nombre: '1.º Premio — El Niño', categoria: 'primer_premio', importeDecimo: 200_000, importeBillete: 2_000_000, numeroPremios: 1 },
    { numero: 55486, nombre: 'Aproximación anterior al 1.º', categoria: 'aproximacion', importeDecimo: 1_000, importeBillete: 10_000 },
    { numero: 55488, nombre: 'Aproximación posterior al 1.º', categoria: 'aproximacion', importeDecimo: 1_000, importeBillete: 10_000 },
    { numero: 43743, nombre: '2.º Premio', categoria: 'segundo_premio', importeDecimo: 75_000, importeBillete: 750_000, numeroPremios: 1 },
    { numero: 84222, nombre: '3.º Premio', categoria: 'tercer_premio', importeDecimo: 25_000, importeBillete: 250_000, numeroPremios: 1 },
  ],
  2014: [
    { numero: 76254, nombre: '1.º Premio — El Niño', categoria: 'primer_premio', importeDecimo: 200_000, importeBillete: 2_000_000, numeroPremios: 1 },
    { numero: 76253, nombre: 'Aproximación anterior al 1.º', categoria: 'aproximacion', importeDecimo: 1_000, importeBillete: 10_000 },
    { numero: 76255, nombre: 'Aproximación posterior al 1.º', categoria: 'aproximacion', importeDecimo: 1_000, importeBillete: 10_000 },
    { numero: 69362, nombre: '2.º Premio', categoria: 'segundo_premio', importeDecimo: 75_000, importeBillete: 750_000, numeroPremios: 1 },
  ],
  2013: [
    { numero: 30875, nombre: '1.º Premio — El Niño', categoria: 'primer_premio', importeDecimo: 200_000, importeBillete: 2_000_000, numeroPremios: 1 },
    { numero: 30874, nombre: 'Aproximación anterior al 1.º', categoria: 'aproximacion', importeDecimo: 1_000, importeBillete: 10_000 },
    { numero: 30876, nombre: 'Aproximación posterior al 1.º', categoria: 'aproximacion', importeDecimo: 1_000, importeBillete: 10_000 },
    { numero: 46674, nombre: '2.º Premio', categoria: 'segundo_premio', importeDecimo: 75_000, importeBillete: 750_000, numeroPremios: 1 },
  ],
  2012: [
    { numero: 71208, nombre: '1.º Premio — El Niño', categoria: 'primer_premio', importeDecimo: 200_000, importeBillete: 2_000_000, numeroPremios: 1 },
    { numero: 71207, nombre: 'Aproximación anterior al 1.º', categoria: 'aproximacion', importeDecimo: 1_000, importeBillete: 10_000 },
    { numero: 71209, nombre: 'Aproximación posterior al 1.º', categoria: 'aproximacion', importeDecimo: 1_000, importeBillete: 10_000 },
    { numero: 92225, nombre: '2.º Premio', categoria: 'segundo_premio', importeDecimo: 75_000, importeBillete: 750_000, numeroPremios: 1 },
  ],
};

// ================================================
// LOTERÍA NACIONAL — indexada por fecha exacta ISO
// ================================================

export const PREMIOS_LOTERIA_NACIONAL: Record<string, Premio[]> = {
  // Sorteo extraordinario "Día del Padre" — sábado 21/03/2026
  '2026-03-21': [
    { numero: 34302, nombre: '1.º Premio', categoria: 'primer_premio',  importeDecimo: 1_300_000, importeBillete: 13_000_000, numeroPremios: 1 },
    { numero: 34301, nombre: 'Aproximación anterior al 1.º', categoria: 'aproximacion', importeDecimo: 1_200, importeBillete: 12_000 },
    { numero: 34303, nombre: 'Aproximación posterior al 1.º', categoria: 'aproximacion', importeDecimo: 1_200, importeBillete: 12_000 },
    { numero: 73943, nombre: '2.º Premio', categoria: 'segundo_premio', importeDecimo: 60_000, importeBillete: 600_000, numeroPremios: 1 },
    { numero: 73942, nombre: 'Aproximación anterior al 2.º', categoria: 'aproximacion', importeDecimo: 1_200, importeBillete: 12_000 },
    { numero: 73944, nombre: 'Aproximación posterior al 2.º', categoria: 'aproximacion', importeDecimo: 1_200, importeBillete: 12_000 },
  ],
  '2026-03-19': [
    { numero: 21716, nombre: '1.º Premio', categoria: 'primer_premio',  importeDecimo: 300_000, importeBillete: 3_000_000, numeroPremios: 1 },
    { numero: 21715, nombre: 'Aproximación anterior al 1.º', categoria: 'aproximacion', importeDecimo: 1_200, importeBillete: 12_000 },
    { numero: 21717, nombre: 'Aproximación posterior al 1.º', categoria: 'aproximacion', importeDecimo: 1_200, importeBillete: 12_000 },
    { numero: 47760, nombre: '2.º Premio', categoria: 'segundo_premio', importeDecimo:  60_000, importeBillete:   600_000, numeroPremios: 1 },
    { numero: 47759, nombre: 'Aproximación anterior al 2.º', categoria: 'aproximacion', importeDecimo: 1_200, importeBillete: 12_000 },
    { numero: 47761, nombre: 'Aproximación posterior al 2.º', categoria: 'aproximacion', importeDecimo: 1_200, importeBillete: 12_000 },
  ],
  '2026-03-14': [
    { numero: 52847, nombre: '1.º Premio', categoria: 'primer_premio',  importeDecimo: 200_000, importeBillete: 2_000_000, numeroPremios: 1 },
    { numero: 52846, nombre: 'Aproximación anterior al 1.º', categoria: 'aproximacion', importeDecimo: 1_200, importeBillete: 12_000 },
    { numero: 52848, nombre: 'Aproximación posterior al 1.º', categoria: 'aproximacion', importeDecimo: 1_200, importeBillete: 12_000 },
  ],
  '2026-03-12': [
    { numero: 62581, nombre: '1.º Premio', categoria: 'primer_premio',  importeDecimo: 300_000, importeBillete: 3_000_000, numeroPremios: 1 },
    { numero: 62580, nombre: 'Aproximación anterior al 1.º', categoria: 'aproximacion', importeDecimo: 1_200, importeBillete: 12_000 },
    { numero: 62582, nombre: 'Aproximación posterior al 1.º', categoria: 'aproximacion', importeDecimo: 1_200, importeBillete: 12_000 },
    { numero: 18934, nombre: '2.º Premio', categoria: 'segundo_premio', importeDecimo:  60_000, importeBillete:   600_000, numeroPremios: 1 },
  ],
  '2025-12-22': [
    { numero: 79432, nombre: '1.º Premio — El Gordo de Navidad', categoria: 'primer_premio',  importeDecimo: 400_000, importeBillete: 4_000_000, numeroPremios: 1 },
    { numero: 79431, nombre: 'Aproximación anterior al Gordo', categoria: 'aproximacion', importeDecimo: 2_000, importeBillete: 20_000 },
    { numero: 79433, nombre: 'Aproximación posterior al Gordo', categoria: 'aproximacion', importeDecimo: 2_000, importeBillete: 20_000 },
    { numero: 70048, nombre: '2.º Premio', categoria: 'segundo_premio', importeDecimo: 125_000, importeBillete: 1_250_000, numeroPremios: 1 },
    { numero: 70047, nombre: 'Aproximación anterior al 2.º', categoria: 'aproximacion', importeDecimo: 1_250, importeBillete: 12_500 },
    { numero: 70049, nombre: 'Aproximación posterior al 2.º', categoria: 'aproximacion', importeDecimo: 1_250, importeBillete: 12_500 },
    { numero: 90693, nombre: '3.º Premio', categoria: 'tercer_premio',  importeDecimo:  50_000, importeBillete:   500_000, numeroPremios: 1 },
    { numero: 90692, nombre: 'Aproximación anterior al 3.º', categoria: 'aproximacion', importeDecimo: 960, importeBillete: 9_600 },
    { numero: 90694, nombre: 'Aproximación posterior al 3.º', categoria: 'aproximacion', importeDecimo: 960, importeBillete: 9_600 },
    { numero: 78477, nombre: '4.º Premio', categoria: 'cuarto_premio', importeDecimo: 20_000, importeBillete: 200_000 },
    { numero: 25508, nombre: '4.º Premio', categoria: 'cuarto_premio', importeDecimo: 20_000, importeBillete: 200_000 },
  ],
};

// ================================================
// HELPERS
// ================================================

export function getPremiosGordo(anio: number): Premio[] {
  return PREMIOS_GORDO[anio] ?? [];
}

export function getPremiosNino(anio: number): Premio[] {
  return PREMIOS_NINO[anio] ?? [];
}

export function getPremiosLoteriaFecha(fecha: string): Premio[] {
  return PREMIOS_LOTERIA_NACIONAL[fecha] ?? [];
}

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