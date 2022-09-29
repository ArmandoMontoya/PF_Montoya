import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Sesion } from './auth/interfaces/sesion';
import { AuthService } from './auth/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'proyectoFinal_Montoya';

  private userServiceSubscription: Subscription | undefined;

  constructor(private auth: AuthService){}

  ngOnInit(): void {
    this.userServiceSubscription = this.auth.currentUser.subscribe(
      currentUser => {
      }
    );
  }


}
