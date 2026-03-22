import { Component } from '@angular/core';

@Component({
  selector: 'app-loading-spinner',
  standalone: true,
  template: `
    <div class="spinner" role="status" aria-label="Consultando premios...">
      <div class="spinner__ring"></div>
      <div class="spinner__dots">
        <span></span><span></span><span></span>
      </div>
      <p class="spinner__text">Consultando premios&hellip;</p>
    </div>
  `,
  styles: [`
    .spinner {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 2rem;
      gap: 1rem;
    }
    .spinner__ring {
      width: 48px;
      height: 48px;
      border: 3px solid var(--color-borde);
      border-top-color: var(--color-naranja);
      border-radius: 50%;
      animation: spin 0.8s linear infinite;
    }
    @keyframes spin { to { transform: rotate(360deg); } }
    .spinner__dots {
      display: flex;
      gap: 6px;
    }
    .spinner__dots span {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: var(--color-azul-claro);
      animation: pulse 1.2s ease-in-out infinite;
    }
    .spinner__dots span:nth-child(2) { animation-delay: 0.2s; }
    .spinner__dots span:nth-child(3) { animation-delay: 0.4s; }
    @keyframes pulse {
      0%, 80%, 100% { opacity: 0.2; transform: scale(0.8); }
      40% { opacity: 1; transform: scale(1); }
    }
    .spinner__text {
      font-size: 13px;
      color: var(--color-texto-tenue);
      letter-spacing: 1px;
    }
  `],
})
export class LoadingSpinnerComponent {}
