import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of, from, delay, map, catchError, switchMap, concatMap, first, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  ResultadoComprobacion,
  TipoSorteo,
  Premio,
  CategoriaPremio,
  RespuestaApiSelae,
  PremioEspecialSelae,
} from '../models/loteria.models';
import {
  getPremiosGordo,
  getPremiosNino,
  getPremiosLoteriaFecha,
} from '../models/sorteos.catalog';

// ================================================
// LOTERÍA NACIONAL — Servicio Principal (Angular 20)
//
// Para LOTERIA_NACIONAL, SELAE requiere idsorteo.
// Si el idsorteo del mock es incorrecto (error E021),
// el servicio lo descubre automáticamente probando
// IDs vecinos hasta encontrar el correcto.
// ================================================

/** Códigos de error de la API SELAE */
const SELAE_ERROR_IDSORTEO = 'E021'; // idsorteo incorrecto
const SELAE_ERROR_DECIMO   = 'E019'; // décimo inválido

/** Caché de idsorteo reales descubiertos en runtime { fecha → idsorteo } */
const idsorteoCache = new Map<string, string>();

@Injectable({ providedIn: 'root' })
export class LoteriaNacionalService {
  private readonly http = inject(HttpClient);

  comprobarNumero(
    numero: number,
    serie: number,
    sorteo: TipoSorteo,
    anio: number,
    fechaSorteo?: string,
    idsorteo?: string
  ): Observable<ResultadoComprobacion> {
    return environment.useMockData
      ? this.comprobarConMock(numero, serie, sorteo, anio, fechaSorteo)
      : this.comprobarConApi(numero, serie, sorteo, anio, fechaSorteo, idsorteo);
  }

  // ── API real SELAE ────────────────────────────────────────────────

  private comprobarConApi(
    numero: number,
    serie: number,
    sorteo: TipoSorteo,
    anio: number,
    fechaSorteo?: string,
    idsorteo?: string
  ): Observable<ResultadoComprobacion> {

    if (sorteo !== 'LOTERIA_NACIONAL') {
      return this.llamarApi(numero, serie, sorteo, anio, fechaSorteo);
    }

    // Para LOTERIA_NACIONAL: primero resolver el idsorteo correcto
    return this.resolverIdsorteo(fechaSorteo, idsorteo).pipe(
      switchMap(idResuelto => {
        console.log(`[SELAE API] idsorteo resuelto: ${idResuelto} para fecha ${fechaSorteo}`);
        return this.llamarApi(numero, serie, sorteo, anio, fechaSorteo, idResuelto);
      }),
      catchError(err => {
        console.warn('[SELAE API] No se pudo resolver idsorteo, usando mock:', err.message);
        return this.comprobarConMock(numero, serie, sorteo, anio, fechaSorteo);
      })
    );
  }

  /**
   * Resuelve el idsorteo correcto para una fecha.
   * Estrategia:
   * 1. Usa caché si ya lo descubrimos antes
   * 2. Prueba el idsorteo del mock
   * 3. Si da E021, prueba IDs vecinos (±1, ±2 ... ±20)
   */
  private resolverIdsorteo(fechaSorteo?: string, idsorteoInicial?: string): Observable<string> {
    if (!fechaSorteo) return throwError(() => new Error('fechaSorteo requerida'));

    // 1. Caché
    const cached = idsorteoCache.get(fechaSorteo);
    if (cached) {
      console.log(`[SELAE API] idsorteo desde caché: ${cached}`);
      return of(cached);
    }

    // 2. Probe: probar idsorteoInicial y luego vecinos
    const base = parseInt(idsorteoInicial ?? '1271', 10);
    // Orden de prueba: base, base+1, base-1, base+2, base-2, ...
    const candidatos = [base];
    for (let delta = 1; delta <= 30; delta++) {
      candidatos.push(base + delta, base - delta);
    }

    console.log(`[SELAE API] Probando idsorteo para ${fechaSorteo}, empezando en ${base}`);

    return from(candidatos).pipe(
      concatMap(id =>
        this.probarIdsorteo(String(id), fechaSorteo).pipe(
          catchError(() => of(null))
        )
      ),
      first(id => id !== null),
      map(id => {
        idsorteoCache.set(fechaSorteo, id!);
        console.log(`[SELAE API] ✅ idsorteo descubierto: ${id} para ${fechaSorteo}`);
        return id!;
      }),
      catchError(() => throwError(() => new Error(`No se encontró idsorteo válido para ${fechaSorteo}`)))
    );
  }

  /**
   * Prueba un idsorteo concreto con el décimo 00000.
   * Devuelve el idsorteo si es válido, lanza error si es E021.
   */
  private probarIdsorteo(idsorteo: string, fechaSorteo: string): Observable<string> {
    const params = new HttpParams()
      .set('decimo', '00000')
      .set('tipoBoleto', 'LOTERIA_NACIONAL')
      .set('idsorteo', idsorteo);

    return this.http.get<RespuestaApiSelae>('/api/premioDecimoWeb', { params }).pipe(
      map(resp => {
        // Si la respuesta es string (error), comprobar si es E021
        const raw = typeof resp === 'string' ? (resp as string) : (resp?.premio ?? '');

        if (raw === SELAE_ERROR_IDSORTEO || raw.includes(SELAE_ERROR_IDSORTEO)) {
          throw new Error(`E021 para idsorteo=${idsorteo}`);
        }

        // Si la respuesta es un objeto con premioEspecial → idsorteo CORRECTO
        const hasData = (resp as RespuestaApiSelae)?.premioEspecial !== undefined
          || (resp as RespuestaApiSelae)?.drawIdSorteo !== undefined;

        if (hasData) {
          console.log(`[SELAE API] idsorteo=${idsorteo} → válido (objeto con premioEspecial)`);
          return idsorteo;
        }

        // E019 = décimo inválido PERO idsorteo CORRECTO
        if (raw === SELAE_ERROR_DECIMO || raw === '' || !raw.startsWith('E0')) {
          console.log(`[SELAE API] idsorteo=${idsorteo} → válido (resp: "${raw.slice(0,30)}")`);
          return idsorteo;
        }

        // Otro error E0XX = idsorteo no descartado pero sospechoso, lo aceptamos
        console.log(`[SELAE API] idsorteo=${idsorteo} → aceptado con resp: "${raw}"`);
        return idsorteo;
      })
    );
  }

  /** Llama a premioDecimoWeb con los parámetros correctos */
  private llamarApi(
    numero: number,
    serie: number,
    sorteo: TipoSorteo,
    anio: number,
    fechaSorteo?: string,
    idsorteo?: string
  ): Observable<ResultadoComprobacion> {
    const decimo = String(numero).padStart(5, '0');

    let params = new HttpParams()
      .set('decimo', decimo)
      .set('tipoBoleto', sorteo);

    if (idsorteo) params = params.set('idsorteo', idsorteo);

    console.log(`[SELAE API] GET premioDecimoWeb decimo=${decimo} idsorteo=${idsorteo ?? 'N/A'}`);

    return this.http.get<RespuestaApiSelae>('/api/premioDecimoWeb', { params }).pipe(
      map(resp => {
        console.log('[SELAE API] Respuesta:', JSON.stringify(resp));
        return this.mapApiResponse(resp, numero, serie, sorteo, anio, fechaSorteo);
      }),
      catchError(err => {
        console.warn('[SELAE API] HTTP error, usando mock:', err?.message);
        return this.comprobarConMock(numero, serie, sorteo, anio, fechaSorteo);
      })
    );
  }

  // ── Mock data ─────────────────────────────────────────────────────

  private comprobarConMock(
    numero: number,
    serie: number,
    sorteo: TipoSorteo,
    anio: number,
    fechaSorteo?: string
  ): Observable<ResultadoComprobacion> {
    const numeroPadded = String(numero).padStart(5, '0');
    const latencia = 400 + Math.random() * 200;
    const premios = this.getPremiosMock(sorteo, anio, fechaSorteo);
    const premioEncontrado = premios.find(p => p.numero === numero);

    const referencia = sorteo === 'LOTERIA_NACIONAL'
      ? `fecha ${fechaSorteo ?? 'no especificada'}`
      : `año ${anio}`;

    const resultado: ResultadoComprobacion = premioEncontrado
      ? {
          numero, numeroPadded, serie, sorteo, anio, fechaSorteo,
          fechaConsulta: new Date(), premiado: true, premio: premioEncontrado,
          mensaje: `¡El número ${numeroPadded} está premiado!`,
        }
      : {
          numero, numeroPadded, serie, sorteo, anio, fechaSorteo,
          fechaConsulta: new Date(), premiado: false,
          mensaje: premios.length === 0
            ? `Sin datos locales para ${referencia}. Verificar en loteriasyapuestas.es`
            : `El número ${numeroPadded} no está premiado.`,
        };

    return of(resultado).pipe(delay(latencia));
  }

  private getPremiosMock(sorteo: TipoSorteo, anio: number, fechaSorteo?: string): Premio[] {
    switch (sorteo) {
      case 'GORDO_NAVIDAD':    return getPremiosGordo(anio);
      case 'EL_NINO':         return getPremiosNino(anio);
      case 'LOTERIA_NACIONAL': return fechaSorteo ? getPremiosLoteriaFecha(fechaSorteo) : [];
      default: return [];
    }
  }

  // ── Mapper respuesta API SELAE ─────────────────────────────────────
  //
  // La API devuelve un objeto con el listado completo de premios del sorteo:
  // { premioEspecial: [{decimo:"021716", prize:3000000, prizeType:"G"}, ...] }
  // prize = importe del BILLETE (10 décimos) en euros
  // Debemos buscar nuestro número en el array premioEspecial.

  private mapApiResponse(
    resp: RespuestaApiSelae,
    numero: number,
    serie: number,
    sorteo: TipoSorteo,
    anio: number,
    fechaSorteo?: string
  ): ResultadoComprobacion {
    const numeroPadded = String(numero).padStart(5, '0');

    // ── Caso 1: respuesta es string (error E0XX o formato antiguo) ──
    const respStr = typeof resp === 'string' ? (resp as string) : '';
    if (respStr) {
      if (respStr.startsWith('E0')) {
        console.warn(`[SELAE API] Error: ${respStr}`);
        return {
          numero, numeroPadded, serie, sorteo, anio, fechaSorteo,
          fechaConsulta: new Date(), premiado: false,
          mensaje: `Error SELAE ${respStr}. Verifica en loteriasyapuestas.es`,
        };
      }
      // Formato antiguo: string con importe "300.000,00 Euros"
      return this.mapImporteString(respStr, numero, numeroPadded, serie, sorteo, anio, fechaSorteo);
    }

    // ── Caso 2: respuesta es objeto antiguo con campo "premio" ──
    if (resp?.premio !== undefined && !resp?.premioEspecial) {
      const premioRaw = resp.premio ?? '';
      if (premioRaw.startsWith('E0')) {
        console.warn(`[SELAE API] Error: ${premioRaw}`);
        return {
          numero, numeroPadded, serie, sorteo, anio, fechaSorteo,
          fechaConsulta: new Date(), premiado: false,
          mensaje: `Error SELAE ${premioRaw}. Verifica en loteriasyapuestas.es`,
        };
      }
      return this.mapImporteString(premioRaw, numero, numeroPadded, serie, sorteo, anio, fechaSorteo);
    }

    // ── Caso 3: respuesta NUEVA de SELAE (objeto completo del sorteo) ──
    // Intentamos extraer el array de premios de cualquier campo de la respuesta.
    // SELAE devuelve el sorteo completo con los premios en compruebe[], premioEspecial[] u otros.
    const premiosArr = this.extraerArrayPremios(resp);

    if (premiosArr.length > 0) {
      console.log(`[SELAE] Array de premios encontrado: ${premiosArr.length} entradas`);
      const conDecimo = premiosArr.filter(p => p?.decimo);
      console.log(`[SELAE] Con décimo válido: ${conDecimo.length} | Muestra:`,
        conDecimo.slice(0, 3).map(p => `${p.decimo}(${p.prizeType}:${p.prize})`).join(', '));
      return this.mapPremioEspecial(premiosArr, numero, numeroPadded, serie, sorteo, anio, fechaSorteo);
    }

    // Último intento: tratar la respuesta entera como posible array
    if (resp && typeof resp === 'object') {
      console.log('[SELAE API] Último intento con resp completo. Campos:', Object.keys(resp as object).join(', '));
      const premiosFinal = this.extraerArrayPremios(resp);
      if (premiosFinal.length > 0) {
        return this.mapPremioEspecial(premiosFinal, numero, numeroPadded, serie, sorteo, anio, fechaSorteo);
      }
    }

    console.warn('[SELAE API] Sin datos reconocibles:', JSON.stringify(resp).slice(0, 150));
    return {
      numero, numeroPadded, serie, sorteo, anio, fechaSorteo,
      fechaConsulta: new Date(), premiado: false,
      mensaje: `El número ${numeroPadded} no está premiado.`,
    };
  }

  /**
   * Extrae el array de premios de la respuesta de SELAE, buscando en todos los campos posibles.
   * SELAE ha cambiado su formato varias veces. El array puede estar en:
   *   - resp.compruebe[]       (formato actual)
   *   - resp.premioEspecial[]  (formato anterior)
   *   - resp directamente []   (si la respuesta ES el array)
   *   - cualquier campo con array de objetos que tengan "decimo" o "prize"
   */
  private extraerArrayPremios(resp: RespuestaApiSelae): PremioEspecialSelae[] {
    // Si la respuesta es directamente un array
    if (Array.isArray(resp)) {
      return (resp as PremioEspecialSelae[]).filter(p => p != null);
    }

    // Candidatos ordenados por prioridad
    const candidatos: unknown[] = [
      resp.compruebe,
      resp.premioEspecial,
    ];

    // Buscar en TODOS los campos del objeto
    for (const key of Object.keys(resp as object)) {
      const val = (resp as Record<string, unknown>)[key];
      if (Array.isArray(val) && val.length > 1) {  // > 1 para evitar arrays vacíos o header-only
        candidatos.push(val);
      }
    }

    // Elegir el array con más entradas que tengan "decimo" o "prize"
    let mejor: PremioEspecialSelae[] = [];

    for (const candidato of candidatos) {
      if (!Array.isArray(candidato)) continue;
      const arr = (candidato as PremioEspecialSelae[]).filter(p => p != null);
      const conPremio = arr.filter(p => p?.decimo != null || p?.prize != null);
      if (conPremio.length > mejor.filter(p => p?.decimo != null || p?.prize != null).length) {
        mejor = arr;
      }
    }

    console.log(`[SELAE] extraerArrayPremios: ${mejor.length} entradas encontradas`);
    return mejor;
  }

  /**
   * Busca el número en el array de premios de la respuesta nueva de SELAE.
   * prize = importe del billete (10 décimos) en euros.
   * importeDecimo = prize / 10.
   */
  private mapPremioEspecial(
    premiosInput: PremioEspecialSelae[] | unknown,
    numero: number,
    numeroPadded: string,
    serie: number,
    sorteo: TipoSorteo,
    anio: number,
    fechaSorteo?: string
  ): ResultadoComprobacion {
    // Garantizar que premios sea siempre un array (doble protección)
    const premios: PremioEspecialSelae[] = Array.isArray(premiosInput)
      ? (premiosInput as PremioEspecialSelae[]).filter(p => p != null)
      : Object.values(premiosInput as Record<string, unknown>).filter(p => p != null) as PremioEspecialSelae[];

    const decimo5 = numeroPadded;              // "15657"
    const decimo6 = String(numero).padStart(6, '0'); // "015657"

    console.log(`[SELAE] Buscando ${decimo5} o ${decimo6} en ${premios.length} entradas`);
    if (premios.length > 0) {
      const conDecimo = premios.filter(p => p?.decimo);
      console.log(`[SELAE] Con décimo: ${conDecimo.length}/${premios.length}`);
      console.log(`[SELAE] Muestra:`, conDecimo.slice(0, 5).map(p => `${p.decimo}(${p.prizeType}:${p.prize})`).join(', '));
    }

    // Búsqueda exacta: el décimo en la lista puede tener 5 o 6 dígitos
    const entrada = premios.find(p => {
      const d = (p?.decimo ?? '').replace(/^0+/, ''); // quitar ceros iniciales para comparar
      const num = String(numero);
      return p?.decimo === decimo5   // match exacto 5 dígitos: "15657"
        || p?.decimo === decimo6     // match exacto 6 dígitos: "015657"
        || d === num;                // sin ceros iniciales: "15657" === "15657"
    });

    if (!entrada) {
      // Check termination prizes: does our number end with any winning suffix?
      const suffix4 = decimo5.slice(-4);  // últimas 4 cifras: "5657"
      const suffix3 = decimo5.slice(-3);  // últimas 3 cifras: "657"
      const suffix2 = decimo5.slice(-2);  // últimas 2 cifras: "57"
      const suffix1 = decimo5.slice(-1);  // última cifra (reintegro): "7"

      console.log(`[SELAE] Verificando terminaciones: 4d=${suffix4} 3d=${suffix3} 2d=${suffix2} R=${suffix1}`);

      // Buscar terminaciones en orden de mayor a menor: 4, 3, 2 cifras y reintegro.
      // SELAE incluye en premioEspecial TODAS las series de cada terminación ganadora.
      // Ej: si "5657" gana, hay entradas "005657","015657",..."095657" (10 entradas).
      // Buscamos cualquier entrada cuyo decimo termine en nuestro suffix.

      // Las terminaciones de 4 cifras tienen prize mayor (75€ billete = 750)
      // Las de 3 cifras tienen prize menor (15€ billete = 150)
      // Las de 2 cifras tienen prize aún menor (6€ billete = 60)
      // Los reintegros tienen prize muy pequeño (3€ billete = 30)

      const candidatos4 = premios.filter(p => p?.decimo != null && p.decimo.endsWith(suffix4));
      const candidatos3 = premios.filter(p => p?.decimo != null && p.decimo.endsWith(suffix3));
      const candidatos2 = premios.filter(p => p?.decimo != null && p.decimo.endsWith(suffix2));

      // Elegir la terminación de mayor importe (más específica)
      const terminacion4 = candidatos4.length > 0 ? candidatos4[0] : undefined;

      // Para 3 cifras: candidatos que NO están también en 4 cifras (por prize)
      // Si suffix4 = "2408" y suffix3 = "408", los candidatos3 incluyen los de 4 cifras
      // Distinguimos por prize: 4 cifras tienen prize mayor que 3 cifras
      const mejorPrize4 = terminacion4?.prize ?? 0;
      const terminacion3 = !terminacion4 && candidatos3.length > 0
        ? candidatos3[0]
        : candidatos3.length > 0 && candidatos3.some(p => (p.prize ?? 0) < mejorPrize4)
          ? candidatos3.find(p => (p.prize ?? 0) < mejorPrize4)
          : undefined;

      const mejorPrize3 = terminacion3?.prize ?? mejorPrize4;
      const terminacion2 = !terminacion4 && !terminacion3 && candidatos2.length > 0
        ? candidatos2[0]
        : candidatos2.some(p => (p.prize ?? 0) < mejorPrize3)
          ? candidatos2.find(p => (p.prize ?? 0) < mejorPrize3)
          : undefined;

      // Reintegro: última cifra, prize muy pequeño
      const reintegro = !terminacion4 && !terminacion3 && !terminacion2
        ? premios.find(p =>
            p?.decimo != null
            && p.decimo.endsWith(suffix1)
            && ((p.prizeType ?? '').toUpperCase().startsWith('R')
                || (p.prize ?? 999) <= 50)
          )
        : undefined;
      
      if (terminacion4) console.log(`[SELAE] ✅ Terminación 4 cifras: ${suffix4} → ${terminacion4.decimo} prize=${terminacion4.prize}`);
      if (terminacion3) console.log(`[SELAE] ✅ Terminación 3 cifras: ${suffix3} → ${terminacion3.decimo} prize=${terminacion3.prize}`);
      if (terminacion2) console.log(`[SELAE] ✅ Terminación 2 cifras: ${suffix2} → ${terminacion2.decimo} prize=${terminacion2.prize}`);
      if (reintegro)    console.log(`[SELAE] ✅ Reintegro: ${suffix1} → ${reintegro.decimo} prize=${reintegro.prize}`);

      const entradaTerminacion = terminacion4 ?? terminacion3 ?? terminacion2 ?? reintegro ?? null;

      if (!entradaTerminacion) {
        console.log(`[SELAE API] ${numeroPadded} sin premio`);
        return {
          numero, numeroPadded, serie, sorteo, anio, fechaSorteo,
          fechaConsulta: new Date(), premiado: false,
          mensaje: `El número ${numeroPadded} no está premiado.`,
        };
      }

      // Premio por terminación — mismo importe que el número representante
      const importeBilleteT = entradaTerminacion.prize ?? 0;
      const importeDecimoT  = Math.round(importeBilleteT / 10);
      const tipoMatch: '4'|'3'|'2'|'R' =
        entradaTerminacion === (terminacion4 as unknown) ? '4' :
        entradaTerminacion === (terminacion3 as unknown) ? '3' :
        entradaTerminacion === (terminacion2 as unknown) ? '2' : 'R';
      const nombreT  = this.nombreTerminacion(
        entradaTerminacion.prizeType, importeDecimoT, suffix4, suffix3, suffix2, tipoMatch
      );
      const categoriaT = this.categoriaDesdeTipo(entradaTerminacion.prizeType, importeDecimoT);

      console.log(`[SELAE API] ✅ ${numeroPadded} PREMIADO por terminación: ${importeDecimoT}€/décimo`);

      return {
        numero, numeroPadded, serie, sorteo, anio, fechaSorteo,
        fechaConsulta: new Date(), premiado: true,
        premio: { numero, nombre: nombreT, categoria: categoriaT,
                  importeDecimo: importeDecimoT, importeBillete: importeBilleteT },
        mensaje: `¡El número ${numeroPadded} está premiado con ${importeDecimoT.toLocaleString('es-ES')} €/décimo!`,
      };
    }

    // prize = importe billete (10 décimos)
    const importeBillete = entrada.prize ?? 0;
    const importeDecimo  = Math.round(importeBillete / 10);

    console.log(`[SELAE API] ✅ ${numeroPadded} PREMIADO: prize=${importeBillete} → ${importeDecimo}€/décimo (${entrada.prizeType})`);

    const nombre   = this.nombreDesdeTipo(entrada.prizeType, importeDecimo);
    const categoria = this.categoriaDesdeTipo(entrada.prizeType, importeDecimo);

    return {
      numero, numeroPadded, serie, sorteo, anio, fechaSorteo,
      fechaConsulta: new Date(),
      premiado: true,
      premio: { numero, nombre, categoria, importeDecimo, importeBillete },
      mensaje: `¡El número ${numeroPadded} está premiado con ${importeDecimo.toLocaleString('es-ES')} €/décimo!`,
    };
  }

  private nombreTerminacion(
    prizeType: string,
    importe: number,
    suffix4: string,
    suffix3: string,
    suffix2: string,
    tipoMatch: '4' | '3' | '2' | 'R' = '4'
  ): string {
    const t = (prizeType ?? '').trim().toUpperCase();
    if (tipoMatch === 'R' || (t.startsWith('R') && !t.startsWith('RT'))) {
      return 'Reintegro';
    }
    if (tipoMatch === '4') return `Últimas 4 cifras (...${suffix4})`;
    if (tipoMatch === '3') return `Últimas 3 cifras (...${suffix3})`;
    if (tipoMatch === '2') return `Últimas 2 cifras (...${suffix2})`;
    // Fallback por importe
    if (importe >= 60)  return `Últimas 4 cifras (...${suffix4})`;
    if (importe >= 10)  return `Últimas 3 cifras (...${suffix3})`;
    if (importe >= 4)   return `Últimas 2 cifras (...${suffix2})`;
    return 'Reintegro';
  }

  private nombreDesdeTipo(prizeType: string, importe: number): string {
    const t = (prizeType ?? '').trim().toUpperCase();
    if (t === 'G')           return '1.º Premio';
    if (t === 'Z')           return '2.º Premio';
    if (t.startsWith('CA'))  return 'Aproximación';
    if (t.startsWith('R '))  return 'Aproximación';
    if (t.startsWith('RT'))  return 'Reintegro (centenas)';
    if (t.startsWith('PR'))  return 'Pedrea';
    return `Premio ${importe.toLocaleString('es-ES')} €`;
  }

  private categoriaDesdeTipo(prizeType: string, importe: number): CategoriaPremio {
    const t = (prizeType ?? '').trim().toUpperCase();
    if (t === 'G') return 'primer_premio';
    if (t === 'Z') return 'segundo_premio';
    if (t.startsWith('CA') || t.startsWith('R ')) return 'aproximacion';
    if (t.startsWith('RT')) return 'reintegro';
    if (t.startsWith('PR')) return 'pedrea';
    // Fallback por importe
    if (importe >= 200_000) return 'primer_premio';
    if (importe >= 60_000)  return 'segundo_premio';
    if (importe >= 20_000)  return 'tercer_premio';
    if (importe >= 1_000)   return 'aproximacion';
    return 'pedrea';
  }

  /** Parsea el formato antiguo "300.000,00 Euros" */
  private mapImporteString(
    premioRaw: string,
    numero: number,
    numeroPadded: string,
    serie: number,
    sorteo: TipoSorteo,
    anio: number,
    fechaSorteo?: string
  ): ResultadoComprobacion {
    const norm = premioRaw.replace(/\./g, '').replace(',', '.').replace(/[^0-9.]/g, '');
    const importe = parseFloat(norm) || 0;
    const premiado = importe > 0;
    console.log(`[SELAE API] ${numeroPadded} formato string: "${premioRaw}" → ${importe}€`);
    return {
      numero, numeroPadded, serie, sorteo, anio, fechaSorteo,
      fechaConsulta: new Date(),
      premiado,
      premio: premiado ? {
        numero,
        nombre: `Premio ${importe.toLocaleString('es-ES')} €`,
        categoria: importe >= 200_000 ? 'primer_premio' :
                   importe >= 60_000  ? 'segundo_premio' :
                   importe >= 20_000  ? 'tercer_premio'  :
                   importe >= 1_000   ? 'aproximacion'   : 'pedrea',
        importeDecimo: importe,
        importeBillete: importe * 10,
      } : undefined,
      mensaje: premiado
        ? `¡El número ${numeroPadded} está premiado con ${importe.toLocaleString('es-ES')} €!`
        : `El número ${numeroPadded} no está premiado.`,
    };
  }
}
