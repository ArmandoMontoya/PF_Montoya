import { NgModule } from '@angular/core';

import { Routes, RouterModule } from '@angular/router';

import { ListarComponent } from './components/listar/listar.component';

const routes: Routes = [
  {
    path: '',
    component: ListarComponent,
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports:[
    RouterModule
  ]
})
export class AlumnosRoutingModule { }
