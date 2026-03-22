import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { EntradaHistorial, ResultadoComprobacion } from '../models/loteria.models';

// ================================================
// HISTORIAL SERVICE — Persistencia en localStorage
// ================================================

const STORAGE_KEY = 'loteria_historial';
const MAX_ENTRADAS = 50;

@Injectable({ providedIn: 'root' })
export class HistorialService {
  private readonly _historial$ = new BehaviorSubject<EntradaHistorial[]>(
    this.cargarDeStorage()
  );

  readonly historial$: Observable<EntradaHistorial[]> =
    this._historial$.asObservable();

  get historial(): EntradaHistorial[] {
    return this._historial$.value;
  }

  /**
   * Añade un resultado al historial y persiste en localStorage
   */
  agregar(resultado: ResultadoComprobacion): EntradaHistorial {
    const entrada: EntradaHistorial = {
      id: this.generarId(),
      resultado,
      fechaGuardado: new Date().toISOString(),
    };

    const actual = this._historial$.value;
    const nuevo = [entrada, ...actual].slice(0, MAX_ENTRADAS);

    this._historial$.next(nuevo);
    this.guardarEnStorage(nuevo);

    return entrada;
  }

  /**
   * Elimina una entrada concreta del historial
   */
  eliminar(id: string): void {
    const filtrado = this._historial$.value.filter((e) => e.id !== id);
    this._historial$.next(filtrado);
    this.guardarEnStorage(filtrado);
  }

  /**
   * Limpia todo el historial
   */
  limpiar(): void {
    this._historial$.next([]);
    localStorage.removeItem(STORAGE_KEY);
  }

  /**
   * Comprueba si ya existe una consulta idéntica en el historial
   */
  existeConsulta(
    numero: number,
    serie: number,
    sorteo: string,
    anio: number
  ): boolean {
    return this._historial$.value.some(
      (e) =>
        e.resultado.numero === numero &&
        e.resultado.serie === serie &&
        e.resultado.sorteo === sorteo &&
        e.resultado.anio === anio
    );
  }

  // ── Privados ────────────────────────────────────

  private cargarDeStorage(): EntradaHistorial[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw) as EntradaHistorial[];
      // Reconstruir fechas que JSON serializa como strings
      return parsed.map((e) => ({
        ...e,
        resultado: {
          ...e.resultado,
          fechaConsulta: new Date(e.resultado.fechaConsulta),
        },
      }));
    } catch {
      return [];
    }
  }

  private guardarEnStorage(entradas: EntradaHistorial[]): void {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(entradas));
    } catch {
      console.warn('No se pudo guardar el historial en localStorage');
    }
  }

  private generarId(): string {
    return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
  }
}
