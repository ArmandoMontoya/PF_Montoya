import { Injectable, ElementRef } from '@angular/core';
import { of, Observable } from 'rxjs';
import { Alumno } from '../interfaces/alumno.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

const _urlApi = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class AlumnosService {


  constructor(private _http: HttpClient) { }

  getAlumnos(): Observable<Alumno[]>{
    return this._http.get<Alumno[]>(`${_urlApi}/inscripcion/1/alumno`)
  }

  // updateAlumno(resultado: Alumno): Observable<Alumno[]>{
  //   // const item = this.alumnosFakeData.find(alumno => alumno.idAlumno === resultado.idAlumno);
  //   // const index = this.alumnosFakeData.indexOf(item!);
  //   // this.alumnosFakeData[index] = resultado;

  //   // return of(this.alumnosFakeData);
  // }

  // deleteAlumno(elemento: Alumno):Observable<Alumno[]>{
  //   // this.alumnosFakeData = this.alumnosFakeData.filter((alumno: Alumno) => alumno.idAlumno != elemento.idAlumno);

  //   // return of(this.alumnosFakeData);
  // }
}
