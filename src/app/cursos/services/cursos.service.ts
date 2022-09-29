import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Curso, SelectCurso } from '../interfaces/cursos';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

const _urlApi = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class CursosService {

  constructor(private _http: HttpClient) { }

  getCursos(): Observable<Curso[]>{
    return this._http.get<Curso[]>(`${_urlApi}/Curso/GetAll`)
  }

  selectCursos(): Observable<SelectCurso[]>{
    return this._http.get<SelectCurso[]>(`${_urlApi}/Curso/GetActive`)
  }

  addCurso(curso: Curso): Observable<Curso[]>{
    return this._http.post<Curso[]>(`${_urlApi}/Curso/Create`, curso);
  }

  updateCurso(curso: Curso): Observable<Curso[]>{
    return this._http.put<Curso[]>(`${_urlApi}/Curso/Update`, curso);
  }

  deleteCurso(curso: any):Observable<Curso[]>{
    return this._http.delete<Curso[]>(`${_urlApi}/Curso/Delete/${curso.cursoId}`)
  }
}
