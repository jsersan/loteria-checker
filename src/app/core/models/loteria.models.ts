// ================================================
// MODELOS DE DOMINIO — Lotería Nacional Española
// ================================================

export type TipoSorteo =
  | 'GORDO_NAVIDAD'
  | 'EL_NINO'
  | 'LOTERIA_NACIONAL';

export type CategoriaPremio =
  | 'primer_premio'
  | 'segundo_premio'
  | 'tercer_premio'
  | 'cuarto_premio'
  | 'quinto_premio'
  | 'aproximacion'
  | 'centena'
  | 'pedrea'
  | 'reintegro';

/**
 * Información de un sorteo disponible
 */
export interface Sorteo {
  id: TipoSorteo;
  nombre: string;
  descripcion: string;
  fechaHabitual: string;
  premioMaximo: string;
  icono: string;
  digitosNumero: number;
  tieneSerie: boolean;
  /** Si true, el usuario debe seleccionar fecha exacta en vez de solo año */
  usaFechaExacta: boolean;
}

/**
 * Premio individual de un sorteo
 */
export interface Premio {
  numero: number;
  serie?: number;
  nombre: string;
  categoria: CategoriaPremio;
  importeDecimo: number;
  importeBillete: number;
  numeroPremios?: number;
}

/**
 * Resultado de la comprobación de un número
 */
export interface ResultadoComprobacion {
  numero: number;
  numeroPadded: string;
  serie: number;
  sorteo: TipoSorteo;
  anio: number;
  /** Fecha exacta del sorteo (ISO date string YYYY-MM-DD), relevante para LOTERIA_NACIONAL */
  fechaSorteo?: string;
  fechaConsulta: Date;
  premiado: boolean;
  premio?: Premio;
  mensaje: string;
}

/**
 * Respuesta de la API de SELAE
 */
/** Entrada del array premioEspecial en la respuesta de SELAE */
export interface PremioEspecialSelae {
  decimo: string;         // Ej: "021716" (5 dígitos con cero)
  prize: number;          // Importe del billete (10 décimos) en euros
  prizeType: string;      // "G"=1º, "Z"=2º, "CA"=aprox, "RT"=reintegro tabla, "PR"=pedrea
  literalPremio: string | null;
  tabla: string | null;
  alambre: string | null;
  orden: string | null;
  fila: string | null;
  ordenFila: string | null;
  showFolded: boolean;
}

/** Respuesta completa de /servicios/premioDecimoWeb de SELAE */
export interface RespuestaApiSelae {
  // Campos del sorteo
  drawIdSorteo?: string;
  tipoSorteo?: string;
  fechaSorteo?: string;
  importePorDefecto?: number;
  // premioEspecial: puede ser un objeto cabecera (con decimo:null) o array
  premioEspecial?: PremioEspecialSelae | PremioEspecialSelae[];
  // compruebe: el array REAL de premios en la respuesta actual de SELAE
  compruebe?: PremioEspecialSelae[];
  // Formato antiguo
  decimo?: string;
  premio?: string;
  nombrePremio?: string;
  tipoBoleto?: string;
  error?: string;
  // Permitir acceso a cualquier campo desconocido
  [key: string]: unknown;
}

/**
 * Entrada del historial de consultas (persistida en localStorage)
 */
export interface EntradaHistorial {
  id: string;
  resultado: ResultadoComprobacion;
  fechaGuardado: string;
}

/**
 * Estado del formulario de búsqueda
 */
export interface FormularioBusqueda {
  numero: string;
  serie: number;
  sorteo: TipoSorteo;
  anio: number;
  fechaSorteo: string;
}

export type EstadoCarga = 'idle' | 'cargando' | 'exito' | 'error';

/**
 * Sorteo del listado de SELAE (para el selector de fechas de Lotería Nacional)
 */
export interface SorteoFecha {
  fecha: string;       // YYYY-MM-DD
  nombre: string;      // Ej: "Sorteo del Jueves", "Navidad 2025"
  tipo: string;        // ORDINARIO | EXTRAORDINARIO | ESPECIAL
  idsorteo: string;    // ID numérico interno de SELAE — requerido por la API
}
