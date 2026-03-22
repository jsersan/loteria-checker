import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  template: `
    <header class="header">
      <div class="header__brand">
        <div class="header__escudo" aria-hidden="true">🎫</div>
        <div class="header__titles">
          <span class="header__title">Txema Serrano's Lottery</span>
          <span class="header__subtitle">Comprobador de Premios · SELAE</span>
        </div>
      </div>
      <nav class="header__nav" aria-label="Navegación principal">
        <a routerLink="/comprobar" routerLinkActive="header__nav-link--active" class="header__nav-link">
          Comprobar
        </a>
        <a routerLink="/historial" routerLinkActive="header__nav-link--active" class="header__nav-link">
          Historial
        </a>
      </nav>
    </header>
    <div class="header__stripe" aria-hidden="true"></div>
  `,
  styles: [`
    .header {
      background: var(--color-azul);
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-wrap: wrap;
      gap: 1rem;
      padding: 0.875rem 1.5rem;
    }

    .header__brand {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .header__escudo {
      font-size: 26px;
      line-height: 1;
      filter: brightness(1.3);
    }

    .header__titles {
      display: flex;
      flex-direction: column;
    }

    .header__title {
      font-family: var(--font-display);
      font-size: 18px;
      font-weight: 900;
      letter-spacing: 1px;
      color: #ffffff;
      line-height: 1.1;
    }

    .header__subtitle {
      font-size: 10px;
      letter-spacing: 2px;
      text-transform: uppercase;
      color: rgba(255, 255, 255, 0.55);
    }

    .header__nav {
      display: flex;
      align-items: center;
      gap: 0.25rem;
    }

    .header__nav-link {
      font-size: 13px;
      font-family: var(--font-body);
      letter-spacing: 0.5px;
      color: rgba(255, 255, 255, 0.75);
      text-decoration: none;
      padding: 6px 14px;
      border-radius: var(--radio);
      transition: all var(--transition);
      border: 1px solid transparent;

      &:hover {
        color: #ffffff;
        background: rgba(255, 255, 255, 0.1);
      }
    }

    .header__nav-link--active {
      color: #ffffff;
      background: rgba(255, 255, 255, 0.15);
      border-color: rgba(255, 255, 255, 0.25);
    }

    .header__stripe {
      height: 4px;
      background: linear-gradient(90deg, var(--color-naranja) 0%, #f5c842 50%, var(--color-naranja) 100%);
    }
  `],
})
export class HeaderComponent {}
