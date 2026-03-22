import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { By } from '@angular/platform-browser';
import { describe, it, expect, beforeEach } from 'vitest';

import { DigitBallComponent } from './digit-ball.component';

// ================================================
// TESTS — DigitBallComponent (Vitest + Angular 20)
// Usa signal inputs: input() estable en Angular 20
// ================================================

describe('DigitBallComponent', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [DigitBallComponent],
      providers: [provideZonelessChangeDetection()],
    });
  });

  it('debe crearse correctamente', () => {
    const fixture = TestBed.createComponent(DigitBallComponent);
    fixture.componentRef.setInput('numero', '05490');
    fixture.detectChanges();
    expect(fixture.componentInstance).toBeTruthy();
  });

  it('muestra 5 bolas para un número de 5 dígitos', () => {
    const fixture = TestBed.createComponent(DigitBallComponent);
    fixture.componentRef.setInput('numero', '05490');
    fixture.detectChanges();

    const bolas = fixture.debugElement.queryAll(By.css('.digit-ball'));
    expect(bolas).toHaveLength(5);
  });

  it('rellena con ceros a la izquierda si el número tiene menos de 5 dígitos', () => {
    const fixture = TestBed.createComponent(DigitBallComponent);
    fixture.componentRef.setInput('numero', '42');
    fixture.detectChanges();

    const bolas = fixture.debugElement.queryAll(By.css('.digit-ball'));
    expect(bolas).toHaveLength(5);
    expect(bolas[0].nativeElement.textContent.trim()).toBe('0');
    expect(bolas[1].nativeElement.textContent.trim()).toBe('0');
    expect(bolas[2].nativeElement.textContent.trim()).toBe('0');
  });

  it('aplica clase --premiado cuando premiado=true', () => {
    const fixture = TestBed.createComponent(DigitBallComponent);
    fixture.componentRef.setInput('numero', '05490');
    fixture.componentRef.setInput('premiado', true);
    fixture.detectChanges();

    const bolas = fixture.debugElement.queryAll(By.css('.digit-ball--premiado'));
    expect(bolas).toHaveLength(5);
  });

  it('aplica clase --sin-premio cuando premiado=false (por defecto)', () => {
    const fixture = TestBed.createComponent(DigitBallComponent);
    fixture.componentRef.setInput('numero', '99999');
    fixture.detectChanges();

    const bolas = fixture.debugElement.queryAll(By.css('.digit-ball--sin-premio'));
    expect(bolas).toHaveLength(5);
  });

  it('muestra los dígitos correctos del número', () => {
    const fixture = TestBed.createComponent(DigitBallComponent);
    fixture.componentRef.setInput('numero', '76058');
    fixture.detectChanges();

    const bolas = fixture.debugElement.queryAll(By.css('.digit-ball'));
    const digitos = bolas.map((b) => b.nativeElement.textContent.trim());
    expect(digitos).toEqual(['7', '6', '0', '5', '8']);
  });
});
