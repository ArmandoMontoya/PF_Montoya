import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Inscripcion } from '../interfaces/inscripciones';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

const _urlApi = environment.apiUrl

@Injectable({
  providedIn: 'root'
})
export class InscripcionesService {
  constructor(private _http: HttpClient) { }

  getInscripciones(): Observable<Inscripcion[]>{
    return this._http.get<Inscripcion[]>(`${_urlApi}/Inscripcion/GetAll`);
  }

  addInscripcion(inscripcion: Inscripcion): Observable<Inscripcion[]>{
    return this._http.post<Inscripcion[]>(`${_urlApi}/Inscripcion/Create`, inscripcion);
  }

  updateInscripcion(inscripcion: Inscripcion): Observable<Inscripcion[]>{
    return this._http.put<Inscripcion[]>(`${_urlApi}/Inscripcion/Update`, inscripcion);
  }

  deleteInscripcion(inscripcion: Inscripcion):Observable<Inscripcion[]>{
    return this._http.delete<Inscripcion[]>(`${_urlApi}/Inscripcion/Delete/${inscripcion.inscripcionId}`)
  }
}
