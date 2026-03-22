import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { describe, it, expect, beforeEach } from 'vitest';
import { firstValueFrom } from 'rxjs';

import { LoteriaNacionalService } from './loteria.service';

describe('LoteriaNacionalService', () => {
  let service: LoteriaNacionalService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        provideHttpClient(),
        provideHttpClientTesting(),
        LoteriaNacionalService,
      ],
    });
    service = TestBed.inject(LoteriaNacionalService);
  });

  it('debe crearse correctamente', () => {
    expect(service).toBeTruthy();
  });

  it('Gordo de Navidad 2024 — primer premio (05490)', async () => {
    const res = await firstValueFrom(service.comprobarNumero(5490, 1, 'GORDO_NAVIDAD', 2024));
    expect(res.premiado).toBe(true);
    expect(res.numeroPadded).toBe('05490');
    expect(res.premio?.categoria).toBe('primer_premio');
    expect(res.premio?.importeDecimo).toBe(400_000);
  });

  it('Gordo de Navidad 2024 — número sin premio', async () => {
    const res = await firstValueFrom(service.comprobarNumero(99999, 1, 'GORDO_NAVIDAD', 2024));
    expect(res.premiado).toBe(false);
    expect(res.premio).toBeUndefined();
  });

  it('Gordo — rellena con ceros a la izquierda', async () => {
    const res = await firstValueFrom(service.comprobarNumero(42, 1, 'GORDO_NAVIDAD', 2024));
    expect(res.numeroPadded).toBe('00042');
  });

  it('El Niño 2026 — primer premio (16770)', async () => {
    const res = await firstValueFrom(service.comprobarNumero(16770, 1, 'EL_NINO', 2026));
    expect(res.premiado).toBe(true);
    expect(res.premio?.categoria).toBe('primer_premio');
    expect(res.premio?.importeDecimo).toBe(200_000);
  });

  it('Lotería Nacional 19/03/2026 — primer premio (21716)', async () => {
    const res = await firstValueFrom(
      service.comprobarNumero(21716, 1, 'LOTERIA_NACIONAL', 2026, '2026-03-19')
    );
    expect(res.premiado).toBe(true);
    expect(res.premio?.categoria).toBe('primer_premio');
    expect(res.fechaSorteo).toBe('2026-03-19');
  });

  it('Lotería Nacional 19/03/2026 — segundo premio (47760)', async () => {
    const res = await firstValueFrom(
      service.comprobarNumero(47760, 2, 'LOTERIA_NACIONAL', 2026, '2026-03-19')
    );
    expect(res.premiado).toBe(true);
    expect(res.premio?.categoria).toBe('segundo_premio');
  });

  it('Lotería Nacional — sin fecha devuelve mensaje informativo', async () => {
    const res = await firstValueFrom(
      service.comprobarNumero(21716, 1, 'LOTERIA_NACIONAL', 2026, undefined)
    );
    expect(res.premiado).toBe(false);
    expect(res.mensaje).toContain('no especificada');
  });

  it('Lotería Nacional — fecha sin datos devuelve sin premio', async () => {
    const res = await firstValueFrom(
      service.comprobarNumero(12345, 1, 'LOTERIA_NACIONAL', 2020, '2020-01-01')
    );
    expect(res.premiado).toBe(false);
    expect(res.mensaje).toContain('2020-01-01');
  });
});
