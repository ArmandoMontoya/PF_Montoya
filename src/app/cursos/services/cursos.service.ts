import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Curso } from '../interfaces/cursos';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

const _urlApi = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class CursosService {

  constructor(private _http: HttpClient) { }

  getCursos(idInscripcion: number): Observable<Curso[]>{
    return this._http.get<Curso[]>(`${_urlApi}/inscripcion/${idInscripcion}/curso`)
  }

  addCurso(curso: Curso): Observable<Curso[]>{
    curso.idInscripcion = 1;
    return this._http.post<Curso[]>(`${_urlApi}/inscripcion/${curso.idInscripcion}/curso`, curso);
  }

  updateCurso(curso: Curso): Observable<Curso[]>{
    return this._http.put<Curso[]>(`${_urlApi}/inscripcion/${curso.idInscripcion}/curso/${curso.idCurso}`, curso);
  }

  deleteCurso(curso: Curso):Observable<Curso[]>{
    return this._http.delete<Curso[]>(`${_urlApi}/inscripcion/${curso.idInscripcion}/curso/${curso.idCurso}`)
  }
}
