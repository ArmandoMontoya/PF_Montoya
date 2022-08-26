import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Inscripcion } from '../interfaces/inscripciones';

@Injectable({
  providedIn: 'root'
})
export class InscripcionesService {
  inscripcionFakeData: Inscripcion[] = [
    {idInscripcion: 1, idAlumno: 1, idCurso: 1, fecha_inscripcion: new Date()},
    {idInscripcion: 2, idAlumno: 3, idCurso: 2, fecha_inscripcion: new Date()},
  ];

  constructor() { }

  getInscripciones(): Observable<Inscripcion[]>{
    return of(this.inscripcionFakeData);
  }

  updateInscripcion(resultado: Inscripcion): Observable<Inscripcion[]>{
    const item = this.inscripcionFakeData.find(inscripcion => inscripcion.idInscripcion === resultado.idInscripcion);
    const index = this.inscripcionFakeData.indexOf(item!);
    this.inscripcionFakeData[index] = resultado;

    return of(this.inscripcionFakeData);
  }

  deleteInscripcion(elemento: Inscripcion):Observable<Inscripcion[]>{
    this.inscripcionFakeData = this.inscripcionFakeData.filter((inscripcion: Inscripcion) => inscripcion.idInscripcion != elemento.idInscripcion);

    return of(this.inscripcionFakeData);
  }
}
