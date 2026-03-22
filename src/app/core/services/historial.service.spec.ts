import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { describe, it, expect, beforeEach } from 'vitest';

import { HistorialService } from './historial.service';
import { ResultadoComprobacion } from '../models/loteria.models';

// ================================================
// TESTS — HistorialService (Vitest + Angular 20)
// ================================================

const mockResultado: ResultadoComprobacion = {
  numero: 5490,
  numeroPadded: '05490',
  serie: 1,
  sorteo: 'GORDO_NAVIDAD',
  anio: 2024,
  fechaConsulta: new Date('2024-12-22T10:00:00'),
  premiado: true,
  premio: {
    numero: 5490,
    nombre: '1.º Premio — El Gordo',
    categoria: 'primer_premio',
    importeDecimo: 400_000,
    importeBillete: 4_000_000,
  },
  mensaje: '¡El número 05490 está premiado!',
};

describe('HistorialService', () => {
  let service: HistorialService;

  beforeEach(() => {
    localStorage.clear();

    TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        HistorialService,
      ],
    });

    service = TestBed.inject(HistorialService);
  });

  it('debe crearse correctamente', () => {
    expect(service).toBeTruthy();
  });

  it('historial empieza vacío', () => {
    expect(service.historial).toHaveLength(0);
  });

  it('agregar() añade una entrada al historial', () => {
    service.agregar(mockResultado);
    expect(service.historial).toHaveLength(1);
    expect(service.historial[0].resultado.numero).toBe(5490);
  });

  it('agregar() devuelve la entrada con id generado', () => {
    const entrada = service.agregar(mockResultado);
    expect(entrada.id).toBeTruthy();
    expect(typeof entrada.id).toBe('string');
  });

  it('agregar() añade al principio (más reciente primero)', () => {
    const segundo = { ...mockResultado, numero: 76058, numeroPadded: '76058' };
    service.agregar(mockResultado);
    service.agregar(segundo);

    expect(service.historial[0].resultado.numero).toBe(76058);
    expect(service.historial[1].resultado.numero).toBe(5490);
  });

  it('eliminar() borra una entrada por id', () => {
    const entrada = service.agregar(mockResultado);
    service.eliminar(entrada.id);

    expect(service.historial).toHaveLength(0);
  });

  it('limpiar() vacía el historial completo', () => {
    service.agregar(mockResultado);
    service.agregar({ ...mockResultado, numero: 99999 });
    service.limpiar();

    expect(service.historial).toHaveLength(0);
  });

  it('existeConsulta() detecta consulta duplicada', () => {
    service.agregar(mockResultado);

    expect(
      service.existeConsulta(5490, 1, 'GORDO_NAVIDAD', 2024)
    ).toBe(true);

    expect(
      service.existeConsulta(99999, 1, 'GORDO_NAVIDAD', 2024)
    ).toBe(false);
  });
});
