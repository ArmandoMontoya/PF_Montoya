import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from '../auth/services/auth.service';
import { Router } from '@angular/router';
import { NotificacionService } from '../shared/services/notificacion.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent {

  isAdmin: boolean | undefined = false;

  private userServiceSubscription: Subscription | undefined;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private auth: AuthService,
    private router: Router,
    ) {

      this.userServiceSubscription = this.auth.currentUser.subscribe(
        currentUser => {
          this.isAdmin = currentUser.usuario?.Admin
        }
      )

    }

  cerrarSesion(){
    this.auth.cerrarSesion();
  }



}
