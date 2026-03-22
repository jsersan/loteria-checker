import { Component, input, output } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe, TitleCasePipe } from '@angular/common';
import { ResultadoComprobacion } from '../../../core/models/loteria.models';
import { DigitBallComponent } from '../digit-ball/digit-ball.component';
import { NombreSorteoPipe } from '../../pipes/nombre-sorteo.pipe';
import { CategoriaPipe } from '../../pipes/categoria.pipe';

@Component({
  selector: 'app-premio-card',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, DatePipe, TitleCasePipe, DigitBallComponent, NombreSorteoPipe, CategoriaPipe],
  template: `
    <div
      class="card fade-in-up"
      [class.card--premiado]="resultado().premiado"
      [class.card--sin-premio]="!resultado().premiado"
      role="region"
      [attr.aria-label]="resultado().premiado ? 'Número premiado' : 'Número sin premio'"
    >
      <!-- Cabecera de estado -->
      <div class="card__header" [class.card__header--premiado]="resultado().premiado">
        <span class="card__icon" aria-hidden="true">
          {{ resultado().premiado ? (esGordo() ? '🎉' : '🏅') : '🎱' }}
        </span>
        <h2 class="card__titulo">
          {{ resultado().premiado ? '¡Número premiado!' : 'Sin premio' }}
        </h2>
      </div>

      <!-- Cuerpo -->
      <div class="card__body">
        <!-- Bolas -->
        <app-digit-ball
          [numero]="resultado().numeroPadded"
          [premiado]="resultado().premiado"
        />

        <!-- Info sorteo -->
        <p class="card__sorteo">
          {{ resultado().sorteo | nombreSorteo }}
          @if (resultado().fechaSorteo) {
            · {{ resultado().fechaSorteo | date:'d MMM yyyy' | titlecase }}
          } @else {
            · {{ resultado().anio }}
          }
          · Serie {{ resultado().serie }}
        </p>

        <!-- Detalle del premio -->
        @if (resultado().premiado && resultado().premio; as premio) {
          <div class="card__premio-detalle">
            <p class="card__premio-nombre">{{ premio.nombre }}</p>
            <span class="card__premio-badge">{{ premio.categoria | categoria }}</span>
            <div class="card__importes">
              <div class="card__importe-item">
                <span class="card__importe-label">Por décimo</span>
                <span class="card__importe-valor">
                  {{ premio.importeDecimo | currency:'EUR':'symbol':'1.0-0':'es' }}
                </span>
              </div>
              <div class="card__importe-sep" aria-hidden="true">|</div>
              <div class="card__importe-item">
                <span class="card__importe-label">Por billete completo</span>
                <span class="card__importe-valor card__importe-valor--grande">
                  {{ premio.importeBillete | currency:'EUR':'symbol':'1.0-0':'es' }}
                </span>
              </div>
            </div>
          </div>
        }

        <!-- Sin premio -->
        @if (!resultado().premiado) {
          <p class="card__mensaje">{{ resultado().mensaje }}</p>
        }
      </div>

      <!-- Pie -->
      <div class="card__footer">
        <time class="card__fecha" [dateTime]="resultado().fechaConsulta.toISOString()">
          Consultado el {{ resultado().fechaConsulta | date:'d MMM yyyy, HH:mm' }}
        </time>
        <div class="card__acciones">
          @if (mostrarGuardar()) {
            <button class="card__btn card__btn--guardar" (click)="guardar.emit(resultado())">
              Guardar
            </button>
          }
          @if (mostrarEliminar()) {
            <button class="card__btn card__btn--eliminar" (click)="eliminar.emit()" aria-label="Eliminar del historial">
              Eliminar
            </button>
          }
        </div>
      </div>
    </div>
  `,
  styles: [`
    .card {
      border-radius: 0;
      border: none;
      overflow: hidden;
      width: 100%;
      background: var(--color-fondo-panel);
      display: flex;
      flex-direction: column;
      height: 100%;
    }

    /* ── Cabecera ── */
    .card__header {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.75rem;
      padding: 1.5rem 2rem;
      background: var(--color-error-bg);
      border-bottom: 4px solid var(--color-error-borde);
    }

    .card__header--premiado {
      background: #e8f5e9;
      border-bottom: 4px solid #4caf50;
    }

    .card__icon { font-size: 36px; line-height: 1; }

    .card__titulo {
      font-family: var(--font-display);
      font-size: 26px;
      font-weight: 900;
      color: var(--color-error);
      letter-spacing: 0.5px;
    }

    .card__header--premiado .card__titulo { color: #2e7d32; }

    /* ── Cuerpo ── */
    .card__body {
      padding: 2rem 2.5rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 1.5rem;
      flex: 1;
      justify-content: center;
    }

    .card__sorteo {
      font-size: 15px;
      color: var(--color-texto-suave);
      text-align: center;
      letter-spacing: 0.3px;
    }

    /* ── Premio detalle ── */
    .card__premio-detalle {
      width: 100%;
      background: var(--color-azul-suave);
      border: 1px solid #c3d6f0;
      border-radius: var(--radio);
      padding: 1.75rem 2rem;
      text-align: center;
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.875rem;
    }

    .card__premio-nombre {
      font-family: var(--font-display);
      font-size: 26px;
      color: var(--color-azul);
      font-weight: 700;
    }

    .card__premio-badge {
      font-size: 12px;
      font-weight: 700;
      letter-spacing: 1.5px;
      text-transform: uppercase;
      background: var(--color-azul);
      color: #fff;
      padding: 5px 16px;
      border-radius: 20px;
    }

    .card__importes {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 2.5rem;
      margin-top: 0.75rem;
      flex-wrap: wrap;
      width: 100%;
    }

    .card__importe-sep {
      width: 1px;
      height: 48px;
      background: var(--color-borde);
    }

    .card__importe-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 6px;
    }

    .card__importe-label {
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      color: var(--color-texto-tenue);
      font-weight: 600;
    }

    .card__importe-valor {
      font-family: var(--font-display);
      font-size: 32px;
      font-weight: 700;
      color: var(--color-azul);
      line-height: 1;
    }

    .card__importe-valor--grande {
      font-size: 38px;
      color: var(--color-naranja-hover);
      font-weight: 900;
    }

    .card__mensaje {
      font-size: 16px;
      color: var(--color-texto-suave);
      text-align: center;
      line-height: 1.5;
    }

    /* ── Pie ── */
    .card__footer {
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 8px;
      padding: 0.75rem 1.25rem;
      border-top: 1px solid var(--color-borde);
      background: var(--color-fondo);
      margin-top: auto;
    }

    .card__fecha {
      font-size: 11px;
      color: var(--color-texto-tenue);
    }

    .card__acciones { display: flex; gap: 8px; }

    .card__btn {
      padding: 5px 14px;
      border-radius: var(--radio);
      font-family: var(--font-body);
      font-size: 12px;
      font-weight: 600;
      cursor: pointer;
      transition: all var(--transition);
      border: 1px solid;
    }

    .card__btn--guardar {
      background: var(--color-azul);
      border-color: var(--color-azul);
      color: #fff;

      &:hover { background: var(--color-azul-medio); }
    }

    .card__btn--eliminar {
      background: transparent;
      border-color: var(--color-error-borde);
      color: var(--color-error);

      &:hover { background: var(--color-error-bg); }
    }
  `],
})
export class PremioCardComponent {
  readonly resultado     = input.required<ResultadoComprobacion>();
  readonly mostrarGuardar  = input(true);
  readonly mostrarEliminar = input(false);

  readonly guardar  = output<ResultadoComprobacion>();
  readonly eliminar = output<void>();

  readonly esGordo = () => this.resultado().premio?.categoria === 'primer_premio';
}
