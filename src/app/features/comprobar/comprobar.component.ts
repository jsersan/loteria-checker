import { Component, inject, signal, computed, OnInit, DestroyRef } from '@angular/core';
import { toSignal, takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { CommonModule, DatePipe, TitleCasePipe } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { LoteriaNacionalService } from '../../core/services/loteria.service';
import { SorteosFechaService } from '../../core/services/sorteos-fecha.service';
import { HistorialService } from '../../core/services/historial.service';
import {
  ResultadoComprobacion,
  TipoSorteo,
  EstadoCarga,
  SorteoFecha,
} from '../../core/models/loteria.models';
import { SORTEOS_DISPONIBLES, getAniosDisponibles } from '../../core/models/sorteos.catalog';
import { LoadingSpinnerComponent } from '../../shared/components/loading-spinner/loading-spinner.component';
import { PremioCardComponent } from '../../shared/components/premio-card/premio-card.component';

function numeroBoletoValidator(control: AbstractControl): ValidationErrors | null {
  const val = control.value;
  if (val === null || val === '' || val === undefined) return null;
  const n = Number(val);
  return isNaN(n) || n < 0 || n > 99999 ? { rangoInvalido: true } : null;
}

@Component({
  selector: 'app-comprobar',
  standalone: true,
  imports: [
    CommonModule,
    DatePipe,
    TitleCasePipe,
    ReactiveFormsModule,
    LoadingSpinnerComponent,
    PremioCardComponent,
  ],
  template: `
    <div class="layout">

      <!-- Panel izquierdo: formulario -->
      <section class="panel-form" aria-labelledby="form-titulo">

        <div class="panel-form__header">
          <h2 id="form-titulo" class="panel-form__titulo">Comprueba tus números</h2>
          <p class="panel-form__desc">
            Introduce los datos de tu décimo para saber si has sido premiado.
          </p>
        </div>

        <form [formGroup]="form" (ngSubmit)="onSubmit()" novalidate class="form">

          <!-- Número -->
          <div class="form-field" [class.form-field--error]="mostrarError('numero')">
            <label for="numero" class="form-field__label">Número</label>
            <div class="form-field__input-wrap">
              <input
                id="numero"
                type="number"
                class="form-field__input form-field__input--numero"
                formControlName="numero"
                placeholder="00000"
                min="0"
                max="99999"
                [attr.aria-invalid]="mostrarError('numero')"
                aria-describedby="numero-hint numero-error"
              />
              <span id="numero-hint" class="form-field__badge">5 dígitos</span>
            </div>
            @if (mostrarError('numero')) {
              <span id="numero-error" class="form-field__error" role="alert">
                @if (form.get('numero')?.errors?.['required']) { Introduce el número de tu décimo }
                @else if (form.get('numero')?.errors?.['rangoInvalido']) { Debe estar entre 00000 y 99999 }
              </span>
            }
          </div>

          <!-- Fila: Serie + Sorteo -->
          <div class="form-row">
            <div class="form-field" [class.form-field--error]="mostrarError('serie')">
              <label for="serie" class="form-field__label">Serie</label>
              <input
                id="serie"
                type="number"
                class="form-field__input"
                formControlName="serie"
                placeholder="1"
                min="1"
                max="200"
              />
            </div>

            <div class="form-field">
              <label for="sorteo" class="form-field__label">Sorteo</label>
              <select id="sorteo" class="form-field__select" formControlName="sorteo">
                @for (s of sorteos; track s.id) {
                  <option [value]="s.id">{{ s.icono }} {{ s.nombre }}</option>
                }
              </select>
            </div>
          </div>

          <!-- Fecha (Lotería Nacional) o Año (Gordo/Niño) -->
          @if (usaFechaExacta()) {
            <div class="form-field" [class.form-field--error]="mostrarError('fechaSorteo')">
              <label for="fechaSorteo" class="form-field__label">
                Fecha del sorteo
              </label>

              @if (cargandoFechas()) {
                <div class="form-field__loading">Cargando sorteos...</div>
              } @else {
                <select
                  id="fechaSorteo"
                  class="form-field__select"
                  formControlName="fechaSorteo"
                  (change)="onFechaSorteoChange($event)"
                >
                  <option value="">— Selecciona una fecha —</option>
                  @for (f of fechasSorteos(); track f.fecha) {
                    <option [value]="f.fecha" [attr.data-idsorteo]="f.idsorteo">
                      {{ f.fecha | date:'dd/MM/yyyy' }}
                      — {{ f.nombre }}
                      @if (f.tipo !== 'ORDINARIO') { · {{ f.tipo | titlecase }} }
                    </option>
                  }
                </select>
              }

              @if (mostrarError('fechaSorteo')) {
                <span class="form-field__error" role="alert">Selecciona la fecha del sorteo</span>
              }
            </div>
          } @else {
            <div class="form-field">
              <label for="anio" class="form-field__label">Año</label>
              <select id="anio" class="form-field__select" formControlName="anio">
                @for (a of anios; track a) {
                  <option [value]="a">{{ a }}</option>
                }
              </select>
            </div>
          }

          <!-- Info sorteo seleccionado -->
          @if (sorteoSeleccionado(); as s) {
            <div class="sorteo-info">
              <span class="sorteo-info__icono">{{ s.icono }}</span>
              <div>
                <strong class="sorteo-info__nombre">{{ s.nombre }}</strong>
                <span class="sorteo-info__detalle">
                  {{ s.fechaHabitual }} · Premio máximo: {{ s.premioMaximo }}
                </span>
              </div>
            </div>
          }

          <!-- Botón -->
          <button
            type="submit"
            class="btn-comprobar"
            [disabled]="form.invalid || estado() === 'cargando'"
            [attr.aria-busy]="estado() === 'cargando'"
          >
            @if (estado() === 'cargando') { Consultando... }
            @else { COMPROBAR }
          </button>

        </form>

        <!-- Premios de referencia -->
        <div class="premios-ref">
          <button class="premios-ref__toggle" (click)="toggleTabla()" [attr.aria-expanded]="mostrarTabla()">
            <span>Premios de referencia (Gordo de Navidad)</span>
            <span class="premios-ref__arrow" [class.premios-ref__arrow--open]="mostrarTabla()">▾</span>
          </button>
          @if (mostrarTabla()) {
            <div class="premios-ref__tabla fade-in-up">
              @for (p of premiosReferencia; track p.nombre) {
                <div class="premios-ref__fila">
                  <span class="premios-ref__nombre">{{ p.nombre }}</span>
                  <span class="premios-ref__importe">{{ p.importe }}</span>
                </div>
              }
            </div>
          }
        </div>

      </section>

      <!-- Panel derecho: resultado -->
      <aside class="panel-resultado" aria-label="Resultado de la comprobación" aria-live="polite">

        @if (estado() === 'idle') {
          <div class="panel-resultado__placeholder" style="flex:1">
            <span class="panel-resultado__placeholder-icon" aria-hidden="true">🎫</span>
            <p class="panel-resultado__placeholder-texto">
              Introduce el número de tu décimo y pulsa <strong>Comprobar</strong>
            </p>
          </div>
        }

        @if (estado() === 'cargando') {
          <div style="flex:1;display:flex;align-items:center;justify-content:center">
            <app-loading-spinner />
          </div>
        }

        @if (estado() === 'exito' && resultado()) {
          <div class="panel-resultado__card-wrap">
            <app-premio-card
              [resultado]="resultado()!"
              [mostrarGuardar]="!yaGuardado()"
              (guardar)="guardarEnHistorial($event)"
            />
            @if (yaGuardado()) {
              <p class="panel-resultado__guardado" role="status">✓ Guardado en tu historial</p>
            }
          </div>
        }

        @if (estado() === 'error') {
          <div class="panel-resultado__error" role="alert">
            <p class="panel-resultado__error-titulo">Error al consultar</p>
            <p class="panel-resultado__error-desc">{{ mensajeError() }}</p>
            <button class="btn-reintentar" (click)="onSubmit()">Reintentar</button>
          </div>
        }

      </aside>
    </div>
  `,
  styles: [`
    /* ── Layout dos columnas ─────────────────────── */
    .layout {
      display: grid;
      grid-template-columns: minmax(380px, 480px) 1fr;
      gap: 1.5rem;
      align-items: stretch;
    }

    @media (max-width: 860px) {
      .layout { grid-template-columns: 1fr; }
    }

    /* ── Panel formulario ────────────────────────── */
    .panel-form {
      background: var(--color-fondo-panel);
      border-radius: var(--radio);
      border: 1px solid var(--color-borde);
      box-shadow: var(--sombra);
      overflow: hidden;
    }

    .panel-form__header {
      background: var(--color-azul);
      padding: 1.25rem 1.5rem;
    }

    .panel-form__titulo {
      font-family: var(--font-display);
      font-size: 18px;
      color: #ffffff;
      margin-bottom: 4px;
    }

    .panel-form__desc {
      font-size: 13px;
      color: rgba(255,255,255,0.7);
    }

    .form { padding: 1.25rem 1.5rem; display: flex; flex-direction: column; gap: 1rem; }

    /* ── Campos ──────────────────────────────────── */
    .form-row {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 0.75rem;
    }

    .form-field { display: flex; flex-direction: column; gap: 5px; }

    .form-field--error .form-field__input,
    .form-field--error .form-field__select { border-color: var(--color-error); }

    .form-field__label {
      font-size: 11px;
      font-weight: 600;
      letter-spacing: 1px;
      text-transform: uppercase;
      color: var(--color-azul);
    }

    .form-field__input-wrap { position: relative; display: flex; align-items: center; }

    .form-field__input,
    .form-field__select {
      background: #fff;
      border: 1px solid var(--color-borde);
      border-radius: var(--radio);
      color: var(--color-texto);
      font-family: var(--font-body);
      font-size: 16px;
      padding: 9px 12px;
      width: 100%;
      transition: border-color var(--transition), box-shadow var(--transition);
      -moz-appearance: textfield;

      &::-webkit-inner-spin-button,
      &::-webkit-outer-spin-button { -webkit-appearance: none; }

      &:focus {
        outline: none;
        border-color: var(--color-azul-claro);
        box-shadow: 0 0 0 3px rgba(45, 114, 200, 0.15);
      }

      &::placeholder { color: var(--color-texto-tenue); }
    }

    .form-field__input--numero {
      font-size: 22px;
      letter-spacing: 6px;
      font-weight: 600;
      color: var(--color-azul);
      padding-right: 80px;
    }

    .form-field__badge {
      position: absolute;
      right: 10px;
      font-size: 10px;
      font-weight: 600;
      letter-spacing: 0.5px;
      color: var(--color-texto-tenue);
      background: var(--color-fondo);
      padding: 2px 8px;
      border-radius: 20px;
      border: 1px solid var(--color-borde);
      white-space: nowrap;
    }

    .form-field__select { cursor: pointer; }

    .form-field__error {
      font-size: 12px;
      color: var(--color-error);
    }

    .form-field__loading {
      font-size: 13px;
      color: var(--color-texto-tenue);
      padding: 10px 12px;
      border: 1px solid var(--color-borde);
      border-radius: var(--radio);
      background: var(--color-fondo);
    }

    /* ── Info sorteo ─────────────────────────────── */
    .sorteo-info {
      display: flex;
      align-items: center;
      gap: 10px;
      background: var(--color-azul-suave);
      border: 1px solid #c3d6f0;
      border-radius: var(--radio);
      padding: 10px 14px;
    }

    .sorteo-info__icono { font-size: 20px; }

    .sorteo-info__nombre {
      display: block;
      font-size: 13px;
      color: var(--color-azul);
      font-weight: 600;
    }

    .sorteo-info__detalle {
      display: block;
      font-size: 12px;
      color: var(--color-texto-tenue);
    }

    /* ── Botón principal ─────────────────────────── */
    .btn-comprobar {
      width: 100%;
      padding: 14px;
      background: var(--color-naranja);
      border: none;
      border-radius: var(--radio);
      color: var(--color-naranja-texto);
      font-family: var(--font-body);
      font-size: 15px;
      font-weight: 700;
      letter-spacing: 2px;
      text-transform: uppercase;
      cursor: pointer;
      transition: all var(--transition);
      box-shadow: 0 2px 8px rgba(245, 166, 35, 0.35);

      &:hover:not(:disabled) {
        background: var(--color-naranja-hover);
        box-shadow: 0 4px 16px rgba(245, 166, 35, 0.5);
        transform: translateY(-1px);
      }

      &:active:not(:disabled) { transform: translateY(0); }

      &:disabled { opacity: 0.5; cursor: not-allowed; transform: none; box-shadow: none; }
    }

    /* ── Premios de referencia ───────────────────── */
    .premios-ref {
      border-top: 1px solid var(--color-borde);
    }

    .premios-ref__toggle {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px 1.5rem;
      background: transparent;
      border: none;
      color: var(--color-texto-suave);
      font-family: var(--font-body);
      font-size: 13px;
      cursor: pointer;
      transition: background var(--transition);

      &:hover { background: var(--color-azul-suave); }
    }

    .premios-ref__arrow {
      color: var(--color-azul-claro);
      font-size: 18px;
      transition: transform var(--transition);
    }

    .premios-ref__arrow--open { transform: rotate(180deg); }

    .premios-ref__tabla { padding: 0 1.5rem 1rem; }

    .premios-ref__fila {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 7px 0;
      border-bottom: 1px solid var(--color-borde);
      font-size: 13px;

      &:last-child { border-bottom: none; }
    }

    .premios-ref__nombre { color: var(--color-texto-suave); }

    .premios-ref__importe {
      color: var(--color-azul);
      font-weight: 600;
    }

    /* ── Panel resultado ─────────────────────────── */
    .panel-resultado {
      background: var(--color-fondo-panel);
      border-radius: var(--radio);
      border: 1px solid var(--color-borde);
      box-shadow: var(--sombra);
      padding: 0;
      min-height: 400px;
      display: flex;
      flex-direction: column;
      align-items: stretch;
      align-self: stretch;
      overflow: hidden;
    }

    .panel-resultado__card-wrap {
      flex: 1;
      display: flex;
      flex-direction: column;
    }

    /* Hace que el elemento host de app-premio-card también se estire */
    .panel-resultado__card-wrap app-premio-card {
      flex: 1;
      display: flex;
      flex-direction: column;
    }

    .panel-resultado__placeholder {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 0.75rem;
      text-align: center;
      padding: 1.5rem;
    }

    .panel-resultado__placeholder-icon { font-size: 64px; opacity: 0.15; }

    .panel-resultado__placeholder-texto {
      font-size: 15px;
      color: var(--color-texto-tenue);
      line-height: 1.6;
      max-width: 260px;
    }

    .panel-resultado__guardado {
      text-align: center;
      font-size: 13px;
      color: var(--color-exito);
      margin-top: 0.75rem;
    }

    .panel-resultado__error {
      background: var(--color-error-bg);
      border: 1px solid var(--color-error-borde);
      border-radius: var(--radio);
      padding: 1.25rem;
      text-align: center;
      width: 100%;
      margin: 1.5rem;
      box-sizing: border-box;
    }

    .panel-resultado__error-titulo {
      font-size: 16px;
      color: var(--color-error);
      font-weight: 600;
      margin-bottom: 6px;
    }

    .panel-resultado__error-desc {
      font-size: 13px;
      color: var(--color-texto-suave);
      margin-bottom: 1rem;
    }

    .btn-reintentar {
      background: transparent;
      border: 1px solid var(--color-error-borde);
      border-radius: var(--radio);
      color: var(--color-error);
      font-family: var(--font-body);
      font-size: 13px;
      padding: 7px 18px;
      cursor: pointer;
      transition: all var(--transition);

      &:hover { background: var(--color-error-bg); }
    }
  `],
})
export class ComprobarComponent implements OnInit {
  private readonly loteriaService = inject(LoteriaNacionalService);
  private readonly sorteosFechaService = inject(SorteosFechaService);
  private readonly historialService = inject(HistorialService);
  private readonly fb = inject(FormBuilder);

  readonly sorteos = SORTEOS_DISPONIBLES;
  readonly anios = getAniosDisponibles();

  // toSignal() integra el Observable con el sistema de signals de Angular (compatible con zoneless)
  readonly fechasSorteos = toSignal(this.sorteosFechaService.fechasSorteos$, { initialValue: [] as SorteoFecha[] });
  readonly cargandoFechas = signal(false);

  readonly form: FormGroup = this.fb.group({
    numero:      [null, [Validators.required, numeroBoletoValidator]],
    serie:       [1,    [Validators.required, Validators.min(1), Validators.max(200)]],
    sorteo:      ['GORDO_NAVIDAD' as TipoSorteo, Validators.required],
    anio:        [new Date().getFullYear(),       Validators.required],
    fechaSorteo: ['', []],
    idsorteo:    ['', []]  // idsorteo real de SELAE — cargado desde API al seleccionar fecha,
  });

  readonly estado        = signal<EstadoCarga>('idle');
  readonly resultado     = signal<ResultadoComprobacion | null>(null);
  readonly mensajeError  = signal('');
  readonly yaGuardado    = signal(false);
  readonly mostrarTabla  = signal(false);

  // toSignal en valueChanges — compatible con zoneless, detecta cambios del formulario
  private readonly destroyRef = inject(DestroyRef);

  readonly sorteoActualId = toSignal(
    this.form.get('sorteo')!.valueChanges,
    { initialValue: 'GORDO_NAVIDAD' as TipoSorteo }
  );

  readonly sorteoSeleccionado = computed(() => {
    const id = this.sorteoActualId() as TipoSorteo;
    return this.sorteos.find((s) => s.id === id) ?? null;
  });

  readonly usaFechaExacta = computed(() =>
    this.sorteoSeleccionado()?.usaFechaExacta === true
  );

  /** True cuando los sorteos provienen del mock (idsorteo no verificados con SELAE) */
  readonly idsorteoDesconocido = computed(() => {
    if (!this.usaFechaExacta()) return false;
    // Aviso si el servicio usó mock O si no hay idsorteo en la selección actual
    return this.sorteosFechaService.usingMock || !this.form.get('idsorteo')?.value;
  });

  readonly premiosReferencia = [
    { nombre: '🥇 1.º Premio — El Gordo', importe: '400.000 €/décimo' },
    { nombre: '🥈 2.º Premio',            importe: '125.000 €/décimo' },
    { nombre: '🥉 3.º Premio',            importe: '50.000 €/décimo'  },
    { nombre: '4.º Premio (×2)',           importe: '20.000 €/décimo'  },
    { nombre: '5.º Premio (×8)',           importe: '6.000 €/décimo'   },
    { nombre: 'Aproximaciones al 1.º',     importe: '1.600 €/décimo'   },
    { nombre: 'Pedrea',                    importe: '100 €/décimo'     },
    { nombre: 'Reintegro',                 importe: '20 €/décimo'      },
  ];

  ngOnInit(): void {
    // Cuando cambia el sorteo: limpiar fecha/año y resetear resultado
    this.form.get('sorteo')!.valueChanges
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(() => {
        this.form.patchValue({ fechaSorteo: '', idsorteo: '', anio: new Date().getFullYear() }, { emitEvent: false });
        this.resultado.set(null);
        this.estado.set('idle');
      });
  }

  /** Captura el idsorteo real del option seleccionado y lo guarda en el formulario */
  onFechaSorteoChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    const opt = select.options[select.selectedIndex];
    const idsorteo = opt?.getAttribute('data-idsorteo') ?? '';
    this.form.patchValue({ idsorteo }, { emitEvent: false });
    console.log(`[Comprobar] Sorteo: fecha=${select.value} idsorteo=${idsorteo}`);
  }

  mostrarError(campo: string): boolean {
    const ctrl = this.form.get(campo);
    return !!(ctrl?.invalid && (ctrl.dirty || ctrl.touched));
  }

  toggleTabla(): void {
    this.mostrarTabla.update((v) => !v);
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { numero, serie, sorteo, anio, fechaSorteo } = this.form.value;

    if (sorteo === 'LOTERIA_NACIONAL' && !fechaSorteo) {
      this.form.get('fechaSorteo')?.setErrors({ required: true });
      this.form.get('fechaSorteo')?.markAsTouched();
      return;
    }

    this.estado.set('cargando');
    this.resultado.set(null);
    this.yaGuardado.set(false);

    const idsorteo = this.form.get('idsorteo')?.value || undefined;
    console.log(`[Comprobar] Enviando: sorteo=${sorteo} fechaSorteo=${fechaSorteo} idsorteo=${idsorteo}`);

    this.loteriaService
      .comprobarNumero(
        Number(numero),
        Number(serie),
        sorteo,
        Number(anio),
        sorteo === 'LOTERIA_NACIONAL' ? fechaSorteo : undefined,
        sorteo === 'LOTERIA_NACIONAL' ? idsorteo : undefined,
      )
      .subscribe({
        next: (res) => { this.resultado.set(res); this.estado.set('exito'); },
        error: (err) => {
          console.error(err);
          this.mensajeError.set('No se pudo conectar con el servicio.');
          this.estado.set('error');
        },
      });
  }

  guardarEnHistorial(resultado: ResultadoComprobacion): void {
    this.historialService.agregar(resultado);
    this.yaGuardado.set(true);
  }
}
