import { Component, input, computed } from '@angular/core';

@Component({
  selector: 'app-digit-ball',
  standalone: true,
  template: `
    <div class="digit-balls" [attr.aria-label]="'Número ' + numero()">
      @for (digito of digitosArray(); track $index) {
        <div
          class="digit-ball"
          [class.digit-ball--premiado]="premiado()"
          [class.digit-ball--sin-premio]="!premiado()"
        >
          {{ digito }}
        </div>
      }
    </div>
  `,
  styles: [`
    .digit-balls {
      display: flex;
      justify-content: center;
      gap: 10px;
      flex-wrap: wrap;
    }
    .digit-ball {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: var(--font-display);
      font-size: 26px;
      font-weight: 900;
      transition: transform 0.2s ease;
    }
    .digit-ball--premiado {
      background: var(--color-naranja);
      color: var(--color-naranja-texto);
      box-shadow: 0 4px 14px rgba(245, 166, 35, 0.55);
    }
    .digit-ball--sin-premio {
      background: var(--color-fondo);
      color: var(--color-texto-tenue);
      border: 2px solid var(--color-borde);
    }
  `],
})
export class DigitBallComponent {
  readonly numero = input.required<string>();
  readonly premiado = input(false);
  readonly digitosArray = computed(() => this.numero().padStart(5, '0').split(''));
}
