import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsuariosRoutingModule } from './usuarios-routing.module';

import { ListarUsuariosComponent } from './components/listar-usuarios/listar-usuarios.component';
import { DialogUsuariosComponent } from './components/dialog-usuarios/dialog-usuarios.component';
import { SharedModule } from '../shared/shared.module';
import { DialogDetailUserComponent } from './components/dialog-detail-user/dialog-detail-user.component';


@NgModule({
  declarations: [
    ListarUsuariosComponent,
    DialogUsuariosComponent,
    DialogDetailUserComponent
  ],
  imports: [
    CommonModule,
    UsuariosRoutingModule,
    SharedModule
  ]
})
export class UsuariosModule { }
