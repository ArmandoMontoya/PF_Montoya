import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Usuario } from '../interfaces/usuario';

const _urlApi = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  constructor(private _http: HttpClient) { }

  getUsuarios(): Observable<Usuario[]>{
    return this._http.get<Usuario[]>(`${_urlApi}/Usuario/GetAll`)
  }

  addUsuario(usuario: Usuario): Observable<Usuario[]>{
    return this._http.post<Usuario[]>(`${_urlApi}/Usuario/Create`, usuario);
  }

  updateUsuario(usuario: Usuario): Observable<Usuario[]>{
    return this._http.put<Usuario[]>(`${_urlApi}/Usuario/Update`, usuario);
  }

  deleteUsuario(usuario: Usuario):Observable<Usuario[]>{
    return this._http.delete<Usuario[]>(`${_urlApi}/Usuario/Delete/${usuario.usuarioId}`)
  }
}
