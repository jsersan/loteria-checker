import { Pipe, PipeTransform } from '@angular/core';
import { CategoriaPremio } from '../../core/models/loteria.models';

const ETIQUETAS: Record<CategoriaPremio, string> = {
  primer_premio: '🥇 Primer Premio',
  segundo_premio: '🥈 Segundo Premio',
  tercer_premio: '🥉 Tercer Premio',
  cuarto_premio: '4.º Premio',
  quinto_premio: '5.º Premio',
  aproximacion: 'Aproximación',
  centena: 'Centena',
  pedrea: 'Pedrea',
  reintegro: 'Reintegro',
};

@Pipe({ name: 'categoria', standalone: true })
export class CategoriaPipe implements PipeTransform {
  transform(value: CategoriaPremio): string {
    return ETIQUETAS[value] ?? value;
  }
}
