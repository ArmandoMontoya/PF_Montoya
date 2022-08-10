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

@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    ListarComponent,
    EditarComponent,
    CabecerasDirective,
    NombreCompletoPipe,
    ConfirmDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
