import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutComponent } from './layout/layout.component';

import { SharedModule } from './shared/shared.module';
import { RouterModule } from '@angular/router';
import { AuthService } from './auth/services/auth.service';

import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { ROOT_REDUCERS } from './state/app.state';
import { EffectsModule } from '@ngrx/effects';
import { AlumnosNgrxEffects } from './state/effects/alumnos-ngrx.effects';
import { CursosNgrxEffects } from './state/effects/cursos-ngrx.effects';
import { UsuariosNgrxEffects } from './state/effects/usarios-ngrx.effects';
import { InscripcionesNgrxEffects } from './state/effects/incripciones-ngrx.effects';

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    RouterModule,
    SharedModule,
    StoreModule.forRoot(ROOT_REDUCERS),
    StoreDevtoolsModule.instrument({ name: 'Proyecto Final' }),
    EffectsModule.forRoot([AlumnosNgrxEffects, CursosNgrxEffects, UsuariosNgrxEffects, InscripcionesNgrxEffects])
  ],
  providers: [
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
