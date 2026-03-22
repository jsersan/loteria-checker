import { Component, inject, signal, computed } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { HistorialService } from '../../core/services/historial.service';
import { EntradaHistorial, TipoSorteo } from '../../core/models/loteria.models';
import { PremioCardComponent } from '../../shared/components/premio-card/premio-card.component';
import { SORTEOS_DISPONIBLES } from '../../core/models/sorteos.catalog';

type FiltroEstado = 'todos' | 'premiados' | 'sin_premio';

@Component({
  selector: 'app-historial',
  standalone: true,
  imports: [CommonModule, RouterLink, PremioCardComponent],
  template: `
    <section class="historial" aria-labelledby="historial-titulo">

      <!-- Cabecera -->
      <div class="historial__header">
        <div>
          <h2 id="historial-titulo" class="historial__titulo">Historial de consultas</h2>
          <p class="historial__desc">
            Tus últimas {{ historial().length }} consultas guardadas localmente.
          </p>
        </div>
        @if (historial().length > 0) {
          <button
            class="btn-limpiar"
            (click)="confirmarLimpiar()"
            [attr.aria-label]="'Limpiar todo el historial (' + historial().length + ' entradas)'"
          >
            Limpiar todo
          </button>
        }
      </div>

      <div class="divider">
        <div class="divider__line"></div>
        <span class="divider__diamond">◆</span>
        <div class="divider__line"></div>
      </div>

      <!-- Historial vacío -->
      @if (historial().length === 0) {
        <div class="historial__vacio">
          <span class="historial__vacio-icono" aria-hidden="true">🎫</span>
          <p class="historial__vacio-titulo">Sin consultas guardadas</p>
          <p class="historial__vacio-desc">
            Comprueba un número y guárdalo para verlo aquí.
          </p>
          <a routerLink="/comprobar" class="btn-ir-comprobar">
            Ir a comprobar
          </a>
        </div>
      }

      <!-- Filtros (solo si hay entradas) -->
      @if (historial().length > 0) {
        <div class="historial__filtros" role="group" aria-label="Filtrar historial">
          <!-- Filtro por estado -->
          <div class="filtro-grupo">
            <span class="filtro-grupo__label">Estado:</span>
            @for (f of filtrosEstado; track f.valor) {
              <button
                class="filtro-btn"
                [class.filtro-btn--activo]="filtroEstado() === f.valor"
                (click)="setFiltroEstado(f.valor)"
                [attr.aria-pressed]="filtroEstado() === f.valor"
              >
                {{ f.etiqueta }}
              </button>
            }
          </div>

          <!-- Filtro por sorteo -->
          <div class="filtro-grupo">
            <label for="filtro-sorteo" class="filtro-grupo__label">Sorteo:</label>
            <select
              id="filtro-sorteo"
              class="filtro-select"
              (change)="setFiltroSorteo($event)"
            >
              <option value="">Todos</option>
              @for (s of sorteos; track s.id) {
                <option [value]="s.id">{{ s.nombre }}</option>
              }
            </select>
          </div>
        </div>

        <!-- Estadísticas rápidas -->
        <div class="historial__stats" aria-label="Estadísticas del historial">
          <div class="stat-card">
            <span class="stat-card__valor">{{ totalConsultas() }}</span>
            <span class="stat-card__label">Consultas</span>
          </div>
          <div class="stat-card stat-card--premiado">
            <span class="stat-card__valor">{{ totalPremiados() }}</span>
            <span class="stat-card__label">Premiados</span>
          </div>
          <div class="stat-card">
            <span class="stat-card__valor">{{ totalSinPremio() }}</span>
            <span class="stat-card__label">Sin premio</span>
          </div>
        </div>

        <!-- Lista de resultados filtrados -->
        @if (entradasFiltradas().length === 0) {
          <p class="historial__sin-filtro">
            Ninguna consulta coincide con los filtros seleccionados.
          </p>
        }

        <div class="historial__lista" role="list">
          @for (entrada of entradasFiltradas(); track entrada.id) {
            <div class="historial__item" role="listitem">
              <app-premio-card
                [resultado]="entrada.resultado"
                [mostrarGuardar]="false"
                [mostrarEliminar]="true"
                (eliminar)="eliminar(entrada.id)"
              />
            </div>
          }
        </div>
      }

    </section>
  `,
  styles: [`
    .historial__header {
      display: flex;
      align-items: flex-start;
      justify-content: space-between;
      gap: 1rem;
      flex-wrap: wrap;
      margin-bottom: 0.5rem;
    }

    .historial__titulo {
      font-family: var(--font-display);
      font-size: 20px;
      color: var(--color-oro);
      margin-bottom: 4px;
    }

    .historial__desc {
      font-size: 14px;
      color: var(--color-texto-suave);
    }

    .btn-limpiar {
      background: transparent;
      border: 1px solid rgba(240, 112, 96, 0.3);
      border-radius: var(--radio);
      color: var(--color-error);
      font-family: var(--font-body);
      font-size: 13px;
      padding: 6px 14px;
      cursor: pointer;
      opacity: 0.65;
      transition: all var(--transition);
      white-space: nowrap;

      &:hover {
        opacity: 1;
        border-color: var(--color-error);
        background: rgba(240, 112, 96, 0.08);
      }
    }

    /* ── Vacío ─────────────────────────────────── */
    .historial__vacio {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.75rem;
      padding: 3rem 1rem;
      text-align: center;
    }

    .historial__vacio-icono {
      font-size: 48px;
      opacity: 0.4;
    }

    .historial__vacio-titulo {
      font-family: var(--font-display);
      font-size: 18px;
      color: var(--color-texto-suave);
    }

    .historial__vacio-desc {
      font-size: 14px;
      color: var(--color-texto-tenue);
    }

    .btn-ir-comprobar {
      margin-top: 0.5rem;
      padding: 9px 22px;
      background: transparent;
      border: 1px solid var(--color-borde-hover);
      border-radius: var(--radio);
      color: var(--color-oro);
      font-family: var(--font-body);
      font-size: 14px;
      letter-spacing: 1px;
      text-decoration: none;
      transition: all var(--transition);

      &:hover {
        background: rgba(212, 170, 80, 0.1);
        border-color: var(--color-oro);
      }
    }

    /* ── Filtros ───────────────────────────────── */
    .historial__filtros {
      display: flex;
      flex-wrap: wrap;
      gap: 1rem;
      margin-bottom: 1.25rem;
    }

    .filtro-grupo {
      display: flex;
      align-items: center;
      gap: 6px;
      flex-wrap: wrap;
    }

    .filtro-grupo__label {
      font-size: 12px;
      letter-spacing: 1px;
      text-transform: uppercase;
      color: var(--color-texto-tenue);
    }

    .filtro-btn {
      background: transparent;
      border: 1px solid var(--color-borde);
      border-radius: var(--radio);
      color: var(--color-texto-suave);
      font-family: var(--font-body);
      font-size: 13px;
      padding: 4px 12px;
      cursor: pointer;
      transition: all var(--transition);

      &:hover { border-color: var(--color-borde-hover); color: var(--color-texto); }

    .filtro-btn--activo {
        background: rgba(212, 170, 80, 0.12);
        border-color: var(--color-oro);
        color: var(--color-oro);
      }
    }

    .filtro-select {
      background: rgba(0,0,0,0.3);
      border: 1px solid var(--color-borde);
      border-radius: var(--radio);
      color: var(--color-texto);
      font-family: var(--font-body);
      font-size: 13px;
      padding: 4px 10px;
      cursor: pointer;

      option { background: #2a1200; }

      &:focus {
        outline: none;
        border-color: var(--color-oro);
      }
    }

    /* ── Stats ────────────────────────────────── */
    .historial__stats {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 10px;
      margin-bottom: 1.5rem;
    }

    .stat-card {
      background: rgba(212, 170, 80, 0.05);
      border: 1px solid var(--color-borde);
      border-radius: var(--radio);
      padding: 12px;
      text-align: center;
      display: flex;
      flex-direction: column;
      gap: 4px;

    .stat-card--premiado .stat-card__valor { color: var(--color-exito); }
    }

    .stat-card__valor {
      font-family: var(--font-display);
      font-size: 24px;
      font-weight: 700;
      color: var(--color-oro);
    }

    .stat-card__label {
      font-size: 11px;
      letter-spacing: 1.5px;
      text-transform: uppercase;
      color: var(--color-texto-tenue);
    }

    /* ── Lista ─────────────────────────────────── */
    .historial__sin-filtro {
      text-align: center;
      font-size: 14px;
      color: var(--color-texto-tenue);
      font-style: italic;
      padding: 1.5rem;
    }

    .historial__lista {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(440px, 1fr));
      gap: 1rem;
      align-items: start;
    }
  `],
})
export class HistorialComponent {
  private readonly historialService = inject(HistorialService);

  readonly historial = toSignal(this.historialService.historial$, { initialValue: [] });
  readonly filtroEstado = signal<FiltroEstado>('todos');
  readonly filtroSorteo = signal<TipoSorteo | ''>('');

  readonly sorteos = SORTEOS_DISPONIBLES;

  readonly filtrosEstado: { valor: FiltroEstado; etiqueta: string }[] = [
    { valor: 'todos', etiqueta: 'Todos' },
    { valor: 'premiados', etiqueta: '🏅 Premiados' },
    { valor: 'sin_premio', etiqueta: '🎱 Sin premio' },
  ];

  // Computed values para stats y filtrado
  readonly entradasFiltradas = computed(() => {
    let lista = this.historial();

    if (this.filtroEstado() === 'premiados') {
      lista = lista.filter((e) => e.resultado.premiado);
    } else if (this.filtroEstado() === 'sin_premio') {
      lista = lista.filter((e) => !e.resultado.premiado);
    }

    if (this.filtroSorteo()) {
      lista = lista.filter((e) => e.resultado.sorteo === this.filtroSorteo());
    }

    return lista;
  });

  readonly totalConsultas = computed(() => (this.historial()).length);
  readonly totalPremiados = computed(
    () => (this.historial()).filter((e) => e.resultado.premiado).length
  );
  readonly totalSinPremio = computed(
    () => (this.historial()).filter((e) => !e.resultado.premiado).length
  );

  setFiltroEstado(valor: FiltroEstado): void {
    this.filtroEstado.set(valor);
  }

  setFiltroSorteo(event: Event): void {
    const val = (event.target as HTMLSelectElement).value as TipoSorteo | '';
    this.filtroSorteo.set(val);
  }

  eliminar(id: string): void {
    this.historialService.eliminar(id);
  }

  confirmarLimpiar(): void {
    if (window.confirm('¿Eliminar todo el historial de consultas? Esta acción no se puede deshacer.')) {
      this.historialService.limpiar();
    }
  }
}
