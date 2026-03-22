import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {
  Observable, of, map, catchError, shareReplay, tap
} from 'rxjs';
import { SorteoFecha } from '../models/loteria.models';

// ================================================
// SORTEOS FECHA SERVICE
//
// La API JSON de SELAE para listar sorteos no está
// disponible públicamente. El único origen fiable de
// los idsorteo reales es la página HTML del comprobador:
// https://www.loteriasyapuestas.es/es/loteria-nacional
//
// Estrategia:
// 1. Fetch de /selae-html/es/loteria-nacional (HTML)
//    → extraer <option value="IDSORTEO">FECHA</option>
// 2. Si falla → mock con IDs aproximados + aviso al usuario
// ================================================

interface SorteoSelaeItem {
  idsorteo:      string;
  fecha_sorteo:  string;
  nombre_sorteo: string;
  tipo_sorteo:   string;
}

interface RespuestaSorteos {
  sorteos?: SorteoSelaeItem[];
  [key: string]: unknown;
}

const FECHAS_MOCK: SorteoFecha[] = [
  { idsorteo: '1272', fecha: '2026-03-21', nombre: 'Sorteo Extraordinario Día del Padre', tipo: 'EXTRAORDINARIO' },
  { idsorteo: '1271', fecha: '2026-03-19', nombre: 'Sorteo del Jueves',    tipo: 'ORDINARIO' },
  { idsorteo: '1270', fecha: '2026-03-14', nombre: 'Sorteo del Sábado',    tipo: 'ORDINARIO' },
  { idsorteo: '1269', fecha: '2026-03-12', nombre: 'Sorteo del Jueves',    tipo: 'ORDINARIO' },
  { idsorteo: '1268', fecha: '2026-03-07', nombre: 'Sorteo del Sábado',    tipo: 'ORDINARIO' },
  { idsorteo: '1267', fecha: '2026-03-05', nombre: 'Sorteo del Jueves',    tipo: 'ORDINARIO' },
  { idsorteo: '1266', fecha: '2026-02-28', nombre: 'Sorteo del Sábado',    tipo: 'ORDINARIO' },
  { idsorteo: '1265', fecha: '2026-02-26', nombre: 'Sorteo del Jueves',    tipo: 'ORDINARIO' },
  { idsorteo: '1264', fecha: '2026-02-21', nombre: 'Sorteo del Sábado',    tipo: 'ORDINARIO' },
  { idsorteo: '1263', fecha: '2026-02-19', nombre: 'Sorteo del Jueves',    tipo: 'ORDINARIO' },
  { idsorteo: '1262', fecha: '2026-02-14', nombre: 'Sorteo del Sábado',    tipo: 'ORDINARIO' },
  { idsorteo: '1261', fecha: '2026-02-12', nombre: 'Sorteo del Jueves',    tipo: 'ORDINARIO' },
  { idsorteo: '1260', fecha: '2026-02-07', nombre: 'Sorteo del Sábado',    tipo: 'ORDINARIO' },
  { idsorteo: '1259', fecha: '2026-02-05', nombre: 'Sorteo del Jueves',    tipo: 'ORDINARIO' },
  { idsorteo: '1258', fecha: '2026-01-31', nombre: 'Sorteo del Sábado',    tipo: 'ORDINARIO' },
  { idsorteo: '1257', fecha: '2026-01-29', nombre: 'Sorteo del Jueves',    tipo: 'ORDINARIO' },
  { idsorteo: '1256', fecha: '2026-01-24', nombre: 'Sorteo del Sábado',    tipo: 'ORDINARIO' },
  { idsorteo: '1255', fecha: '2026-01-22', nombre: 'Sorteo del Jueves',    tipo: 'ORDINARIO' },
  { idsorteo: '1254', fecha: '2026-01-17', nombre: 'Sorteo del Sábado',    tipo: 'ORDINARIO' },
  { idsorteo: '1253', fecha: '2026-01-15', nombre: 'Sorteo del Jueves',    tipo: 'ORDINARIO' },
  { idsorteo: '1252', fecha: '2026-01-10', nombre: 'Sorteo del Sábado',    tipo: 'ORDINARIO' },
  { idsorteo: '1251', fecha: '2026-01-08', nombre: 'Sorteo del Jueves',    tipo: 'ORDINARIO' },
  { idsorteo: '1250', fecha: '2026-01-06', nombre: 'El Niño 2026',         tipo: 'ESPECIAL'  },
  { idsorteo: '1249', fecha: '2026-01-01', nombre: 'Sorteo Especial Año Nuevo', tipo: 'EXTRAORDINARIO' },
  { idsorteo: '1248', fecha: '2025-12-22', nombre: 'Sorteo Extraordinario de Navidad 2025', tipo: 'ESPECIAL' },
  { idsorteo: '1247', fecha: '2025-12-18', nombre: 'Sorteo del Jueves',    tipo: 'ORDINARIO' },
  { idsorteo: '1246', fecha: '2025-12-13', nombre: 'Sorteo del Sábado',    tipo: 'ORDINARIO' },
  { idsorteo: '1245', fecha: '2025-12-11', nombre: 'Sorteo del Jueves',    tipo: 'ORDINARIO' },
];

@Injectable({ providedIn: 'root' })
export class SorteosFechaService {
  private readonly http = inject(HttpClient);

  usingMock = false;

  readonly fechasSorteos$: Observable<SorteoFecha[]> =
    // Estrategia 1: parsear el HTML de la página de SELAE
    this.http.get('/selae-html/es/loteria-nacional', { responseType: 'text' }).pipe(
      map(html => this.parseHtml(html)),
      catchError(() =>
        // Estrategia 2: intentar API JSON
        this.http.get<RespuestaSorteos>('/api/sorteoDecimoWeb', {
          params: { tipoBoleto: 'LOTERIA_NACIONAL' },
        }).pipe(
          map(resp => this.parseJson(resp)),
          catchError((err) => {
            console.warn('[SorteosFechaService] HTML y API fallaron, usando mock:', err?.message);
            this.usingMock = true;
            return of(FECHAS_MOCK);
          })
        )
      ),
      tap(sorteos => {
        const src = this.usingMock ? '⚠️ MOCK (idsorteo aproximados)' : '✅ SELAE real';
        console.log(`[SorteosFechaService] ${sorteos.length} sorteos | ${src}`);
        if (!this.usingMock && sorteos.length > 0) {
          console.log(`  Ejemplo: ${sorteos[0].fecha} → idsorteo=${sorteos[0].idsorteo}`);
        }
      }),
      shareReplay(1)
    );

  /**
   * Extrae los idsorteo del HTML de la página de SELAE.
   * El selector de fecha tiene: <option value="IDSORTEO">DD/MM/YYYY NOMBRE</option>
   */
  private parseHtml(html: string): SorteoFecha[] {
    // Buscar el select de fechas en el HTML de SELAE
    // Patrón: <option value="1271">19/03/2026</option>
    // o:      <option value="1271">19/03/2026 - Sorteo Ordinario</option>
    const optionRegex = /<option[^>]+value="(\d+)"[^>]*>\s*(\d{2})\/(\d{2})\/(\d{4})[^<]*<\/option>/gi;
    const sorteos: SorteoFecha[] = [];
    let match: RegExpExecArray | null;

    while ((match = optionRegex.exec(html)) !== null) {
      const [, idsorteo, dia, mes, anio] = match;
      if (!idsorteo || idsorteo === '0') continue;

      const fecha = `${anio}-${mes}-${dia}`;
      const textoCompleto = match[0];

      // Determinar tipo según el texto de la opción
      const esNavidad = /navidad|navid/i.test(textoCompleto);
      const esNino = /ni[ñn]o/i.test(textoCompleto);
      const esExtraordinario = /extraord/i.test(textoCompleto);
      const tipo = esNavidad || esNino
        ? 'ESPECIAL'
        : esExtraordinario ? 'EXTRAORDINARIO' : 'ORDINARIO';

      const nombre = esNavidad ? 'Sorteo Extraordinario de Navidad'
        : esNino ? 'El Niño'
        : this.nombrePorFecha(fecha);

      sorteos.push({ idsorteo, fecha, nombre, tipo });
    }

    if (sorteos.length === 0) {
      throw new Error('No se encontraron sorteos en el HTML de SELAE');
    }

    console.log(`[SorteosFechaService] HTML parseado: ${sorteos.length} sorteos encontrados`);
    return sorteos.sort((a, b) => b.fecha.localeCompare(a.fecha));
  }

  /** Infiere nombre del sorteo por día de la semana */
  private nombrePorFecha(fecha: string): string {
    const d = new Date(fecha + 'T12:00:00');
    const dia = d.getDay();
    if (dia === 4) return 'Sorteo del Jueves';
    if (dia === 6) return 'Sorteo del Sábado';
    if (dia === 1) return 'Sorteo Especial Año Nuevo';
    return 'Sorteo Extraordinario';
  }

  private parseJson(resp: RespuestaSorteos): SorteoFecha[] {
    let items: SorteoSelaeItem[] = [];
    if (Array.isArray(resp)) items = resp as unknown as SorteoSelaeItem[];
    else if (Array.isArray(resp?.sorteos)) items = resp.sorteos;
    else {
      for (const key of Object.keys(resp ?? {})) {
        const val = (resp as Record<string, unknown>)[key];
        if (Array.isArray(val) && val.length > 0) { items = val as SorteoSelaeItem[]; break; }
      }
    }
    const validos = items.filter(s => s.idsorteo && s.fecha_sorteo);
    if (validos.length === 0) throw new Error('API JSON sin datos válidos');
    return validos
      .map(s => ({
        idsorteo: String(s.idsorteo),
        fecha: this.yyyymmddToIso(s.fecha_sorteo),
        nombre: s.nombre_sorteo ?? this.nombrePorFecha(this.yyyymmddToIso(s.fecha_sorteo)),
        tipo: s.tipo_sorteo ?? 'ORDINARIO',
      }))
      .filter(s => s.fecha)
      .sort((a, b) => b.fecha.localeCompare(a.fecha));
  }

  private yyyymmddToIso(raw: string): string {
    const s = String(raw ?? '').replace(/\D/g, '');
    return s.length === 8 ? `${s.slice(0,4)}-${s.slice(4,6)}-${s.slice(6,8)}` : '';
  }
}
