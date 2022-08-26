import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConfirmDialogComponent } from '../shared/components/confirm-dialog/confirm-dialog.component';

import { CursosRoutingModule } from './cursos-routing.module';
import { ListarCursosComponent } from './components/listar-cursos/listar-cursos.component';
import { DialogCursosComponent } from './components/dialog-cursos/dialog-cursos.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ListarCursosComponent,
    DialogCursosComponent,
  ],
  imports: [
    CommonModule,
    CursosRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ]
})
export class CursosModule { }
