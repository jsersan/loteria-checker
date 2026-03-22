import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  template: `
    <app-header />
    <main class="main-content">
      <router-outlet />
    </main>
    <footer class="footer">
      <div class="footer__inner">
        <span class="footer__divider">◆</span>
        <p>Comprobador de Lotería Nacional · Solo para uso informativo</p>
        <p class="footer__disclaimer">
          Para verificación oficial visita
          <a href="https://www.loteriasyapuestas.es" target="_blank" rel="noopener">
            loteriasyapuestas.es
          </a>
        </p>
        <span class="footer__divider">◆</span>
      </div>
    </footer>
  `,
  styles: [`
    :host {
      display: flex;
      flex-direction: column;
      min-height: 100vh;
    }

    .main-content {
      flex: 1;
      width: 100%;
      padding: 1.5rem 2rem 3rem;
    }

    .footer {
      border-top: 2px solid var(--color-azul-suave);
      background: var(--color-fondo-blanco);
      padding: 1.5rem 1.25rem;
      text-align: center;
    }

    .footer__inner {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 6px;
    }

    .footer__divider {
      color: var(--color-oro);
      font-size: 10px;
    }

    .footer p {
      font-size: 13px;
      color: var(--color-texto-suave);
      letter-spacing: 0.5px;
    }

    .footer__disclaimer {
      font-style: italic;
      font-size: 12px !important;
    }

    .footer a {
      color: var(--color-oro);
      opacity: 0.8;

      &:hover {
        opacity: 1;
      }
    }
  `],
})
export class AppComponent {}
