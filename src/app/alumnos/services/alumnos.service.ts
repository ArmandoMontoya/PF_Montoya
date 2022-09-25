import { Injectable, ElementRef } from '@angular/core';
import { of, Observable } from 'rxjs';
import { Alumno, SelectAlumno } from '../interfaces/alumno.interface';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

const _urlApi = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class AlumnosService {


  constructor(private _http: HttpClient) { }

  getAlumnos(): Observable<Alumno[]>{
    return this._http.get<Alumno[]>(`${_urlApi}/Alumno/GetAll`)
  }

  selectAlumnos(): Observable<SelectAlumno[]>{
    return this._http.get<SelectAlumno[]>(`${_urlApi}/Alumno/GetAll`)
  }

  addAlumno(alumno: Alumno): Observable<Alumno[]>{
    console.log(alumno)
    return this._http.post<Alumno[]>(`${_urlApi}/Alumno/Create`, alumno);
  }

  updateAlumno(alumno: Alumno): Observable<Alumno[]>{
    return this._http.put<Alumno[]>(`${_urlApi}/Alumno/Update`, alumno);
  }

  deleteAlumno(alumno: any):Observable<Alumno[]>{
    return this._http.delete<Alumno[]>(`${_urlApi}/Alumno/Delete/${alumno.alumnoId}`)
  }
}
