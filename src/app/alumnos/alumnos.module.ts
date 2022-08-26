import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListarComponent } from './components/listar/listar.component';
import { EditarComponent } from './components/editar/editar.component';
import { CabecerasDirective } from './directives/cabeceras.directive';
import { NombreCompletoPipe } from './pipes/nombre-completo.pipe';
import { ConfirmDialogComponent } from '../shared/components/confirm-dialog/confirm-dialog.component';
import { SharedModule } from '../shared/shared.module';
import { AlumnosRoutingModule } from './alumnos-routing.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ListarComponent,
    EditarComponent,
    CabecerasDirective,
    NombreCompletoPipe,
  ],
  imports: [
    CommonModule,
    SharedModule,
    AlumnosRoutingModule,
    ReactiveFormsModule
  ],
})
export class AlumnosModule { }
