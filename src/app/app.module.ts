import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LayoutComponent } from './layout/layout.component';
import { LayoutModule } from '@angular/cdk/layout';

import { ListarComponent } from './alumnos/components/listar/listar.component';

import { MaterialModule } from './material/material.module';
import { ReactiveFormsModule } from '@angular/forms';

import { EditarComponent } from './alumnos/components/editar/editar.component';
import { CabecerasDirective } from './alumnos/directives/cabeceras.directive';
import { NombreCompletoPipe } from './alumnos/pipes/nombre-completo.pipe';
import { ConfirmDialogComponent } from './shared/components/confirm-dialog/confirm-dialog.component';
import { AlumnosModule } from './alumnos/alumnos.module';
import { SharedModule } from './shared/shared.module';
import { RouterModule } from '@angular/router';

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
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
