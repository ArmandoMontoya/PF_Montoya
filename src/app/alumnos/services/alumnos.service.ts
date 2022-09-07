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

  getAlumnos(idInscripcion: number): Observable<Alumno[]>{
    return this._http.get<Alumno[]>(`${_urlApi}/inscripcion/${idInscripcion}/alumno`)
  }

  addAlumno(alumno: Alumno): Observable<Alumno[]>{
    alumno.idInscripcion = 1;
    return this._http.post<Alumno[]>(`${_urlApi}/inscripcion/${alumno.idInscripcion}/alumno`, alumno);
  }

  updateAlumno(alumno: Alumno): Observable<Alumno[]>{
    return this._http.put<Alumno[]>(`${_urlApi}/inscripcion/${alumno.idInscripcion}/alumno/${alumno.idAlumno}`, alumno);
  }

  deleteAlumno(alumno: Alumno):Observable<Alumno[]>{
    return this._http.delete<Alumno[]>(`${_urlApi}/inscripcion/${alumno.idInscripcion}/alumno/${alumno.idAlumno}`)
  }
}
