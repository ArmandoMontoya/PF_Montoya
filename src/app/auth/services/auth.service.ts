import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Sesion } from '../interfaces/sesion';
import { Usuario } from '../interfaces/usuario';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.prod';
import { MatSnackBar } from '@angular/material/snack-bar';

const _apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  sesionSubject!: BehaviorSubject<Sesion>

  constructor(private http: HttpClient, private snackBar: MatSnackBar) {
    const sesion: Sesion = {
      sesionActiva: false
    };

    this.sesionSubject = new BehaviorSubject(sesion);
  }

  iniciarSesion(usuario: Usuario) {
    this.http.get<Usuario>(`${_apiUrl}/usuarios?search=${usuario.usuario}&filter=${usuario.contrasena}`)
      .subscribe((usuarioLogged: any) => {
        debugger;
        if (usuarioLogged.length > 0) {
          const sesion: Sesion = {
            sesionActiva: true,
            usuario: {
              usuario: usuario.usuario,
              contrasena: usuario.contrasena,
              admin: usuarioLogged[0].Admin,
            }
          }

          this.sesionSubject.next(sesion);
          this.notificacion('Inicio de sesión exitoso');

        }

      })

  }

  cerrarSesion() {
    const sesion: Sesion = {
      sesionActiva: false
    };
    this.sesionSubject.next(sesion);
  }

  obtenerSesion() {
    return this.sesionSubject.asObservable();
  }

  notificacion(mensaje:string){
    this.snackBar.open(mensaje, 'x',{
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
}
