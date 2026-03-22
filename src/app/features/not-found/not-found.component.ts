import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="not-found">
      <span class="not-found__icon" aria-hidden="true">🎫</span>
      <h2 class="not-found__titulo">Página no encontrada</h2>
      <p class="not-found__desc">
        Este décimo no existe. Vuelve al sorteo principal.
      </p>
      <a routerLink="/comprobar" class="not-found__link">
        ♛ Volver al inicio
      </a>
    </div>
  `,
  styles: [`
    .not-found {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 1rem;
      padding: 4rem 1rem;
      text-align: center;
    }

    .not-found__icon {
      font-size: 56px;
      opacity: 0.3;
    }

    .not-found__titulo {
      font-family: var(--font-display);
      font-size: 22px;
      color: var(--color-oro);
    }

    .not-found__desc {
      font-size: 15px;
      color: var(--color-texto-suave);
      font-style: italic;
    }

    .not-found__link {
      margin-top: 0.5rem;
      padding: 10px 24px;
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
  `],
})
export class NotFoundComponent {}
