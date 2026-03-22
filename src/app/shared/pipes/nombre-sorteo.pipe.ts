import { Pipe, PipeTransform } from '@angular/core';
import { TipoSorteo } from '../../core/models/loteria.models';

const NOMBRES: Record<TipoSorteo, string> = {
  GORDO_NAVIDAD: 'El Gordo de Navidad',
  EL_NINO: 'El Niño',
  LOTERIA_NACIONAL: 'Lotería Nacional',
};

@Pipe({ name: 'nombreSorteo', standalone: true })
export class NombreSorteoPipe implements PipeTransform {
  transform(value: TipoSorteo): string {
    return NOMBRES[value] ?? value;
  }
}
