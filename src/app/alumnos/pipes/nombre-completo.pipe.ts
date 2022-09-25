import { Pipe, PipeTransform } from '@angular/core';
import { Alumno } from '../interfaces/alumno.interface';

@Pipe({
  name: 'nombreCompletoPipe'
})
export class NombreCompletoPipe implements PipeTransform {

  transform(alumno:any): string {
    const nombreCompleto = `${alumno.nombre} ${alumno.apellidoPaterno} ${alumno.apellidoMaterno}`;
    return nombreCompleto;
  }

}
