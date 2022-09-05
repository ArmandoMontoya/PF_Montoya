import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Sesion } from '../interfaces/sesion';
import { Usuario } from '../interfaces/usuario';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment.prod';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NotificacionService } from '../../shared/services/notificacion.service';

const _apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  sesionSubject!: BehaviorSubject<Sesion>

  constructor(
    private http: HttpClient,
    private notificacion: NotificacionService,
    private router: Router
    ) {
    const sesion: Sesion = {
      sesionActiva: false
    };

    this.sesionSubject = new BehaviorSubject(sesion);
  }

  iniciarSesion(usuario: Usuario) {
    this.http.get<Usuario>(`${_apiUrl}/usuarios?search=${usuario.usuario}&filter=${usuario.contrasena}`)
      .subscribe((usuarioLogged: any) => {
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
          this.router.navigate(['/alumnos']);
          this.notificacion.mensaje('Inicio de sesión exitoso');

        }else{
          this.notificacion.mensaje('Usuario no encontrado, verifica tus datos');
        }

      })

  }

  cerrarSesion() {
    const sesion: Sesion = {
      sesionActiva: false
    };
    this.sesionSubject.next(sesion);
    this.router.navigate(['/auth']);
    this.notificacion.mensaje('Sesión cerrada exitosamente')
  }

  obtenerSesion() {
    return this.sesionSubject.asObservable();
  }
}
