import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Sesion } from '../interfaces/sesion';
import { Usuario } from '../interfaces/usuario';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { NotificacionService } from '../../shared/services/notificacion.service';

const _apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  login(usuario: Usuario) {
    throw new Error('Method not implemented.');
  }

  private sesionSubject: BehaviorSubject<Sesion> = new BehaviorSubject({} as Sesion);
  public readonly currentUser: Observable<Sesion> = this.sesionSubject.asObservable();

  constructor(
    private http: HttpClient,
    private notificacion: NotificacionService,
    private router: Router
    )
  {
  }

  iniciarSesion(usuario: Usuario) {
    this.http.post<Usuario>(`${_apiUrl}/Usuario/GetUser`, usuario)
      .subscribe((usuarioLogged: any) => {
        if (usuarioLogged.length > 0) {
          const sesion: Sesion = {
            sesionActiva: true,
            usuario: {
              User: usuarioLogged[0].user,
              Password: usuarioLogged[0].password,
              Admin: usuarioLogged[0].admin,
              UsuarioId: usuarioLogged[0].usuarioId,
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
