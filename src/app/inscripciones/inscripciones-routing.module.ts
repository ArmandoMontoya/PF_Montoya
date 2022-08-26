import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarInscripcionesComponent } from './components/listar-inscripciones/listar-inscripciones.component';


const routes: Routes = [{ path: '', component: ListarInscripcionesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InscripcionesRoutingModule { }
