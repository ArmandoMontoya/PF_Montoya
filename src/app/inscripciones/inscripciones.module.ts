import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InscripcionesRoutingModule } from './inscripciones-routing.module';

import { ListarInscripcionesComponent } from './components/listar-inscripciones/listar-inscripciones.component';
import { DialogInscripcionesComponent } from './components/dialog-inscripciones/dialog-inscripciones.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ListarInscripcionesComponent,
    DialogInscripcionesComponent
  ],
  imports: [
    CommonModule,
    InscripcionesRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class InscripcionesModule { }
