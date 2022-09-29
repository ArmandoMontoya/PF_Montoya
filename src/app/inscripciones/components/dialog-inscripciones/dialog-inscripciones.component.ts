import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AlumnosService } from 'src/app/alumnos/services/alumnos.service';
import { CursosService } from 'src/app/cursos/services/cursos.service';

import { AuthService } from '../../../auth/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-dialog-inscripciones',
  templateUrl: './dialog-inscripciones.component.html',
  styleUrls: ['./dialog-inscripciones.component.css']
})
export class DialogInscripcionesComponent implements OnInit {
  private userServiceSubscription: Subscription | undefined;

  formulario!: FormGroup;
  textoBoton: string = '';
  tituloDialog: string = '';

  selectAlumnos: any = [];
  selectCursos: any[] = [];

  usuarioId: any = null;
  auth: any;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<DialogInscripcionesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private alumnosService: AlumnosService,
    private cursosService:CursosService,
    private uthService: AuthService
  ) {

    if(data){ //Actualizar
      this.textoBoton = 'Actualizar';
      this.tituloDialog = 'Editar Inscripción';
    }
    else{ // Agregar
      this.textoBoton = 'Crear';
      this.tituloDialog = 'Agregar Inscripción';
    }


    this.getSelectAlumnos();
    this.getSelectCursos();

    this.userServiceSubscription = this.uthService.currentUser.subscribe(
      currentUser => {
        this.formulario = fb.group({
          InscripcionId: new FormControl(data.inscripcionId),
          AlumnoId: new FormControl(data.alumnoId),
          CursoId: new FormControl(data.cursoId),
          User: new FormControl(currentUser.usuario?.User),
          UsuarioId: new FormControl(currentUser.usuario?.UsuarioId),
          FechaInscripcion: new FormControl(new Date()),
        });

      }
    )


  }

  ngOnInit(){
  }

  getSelectAlumnos(){
    this.alumnosService.selectAlumnos().subscribe(select => {
      this.selectAlumnos = select;
    });
  }

  getSelectCursos(){
    this.cursosService.selectCursos().subscribe(select => {
      this.selectCursos = select;
    });
  }

  actualizar(){
    this.dialogRef.close(this.formulario.value);
  }

  cerrar(){
    this.dialogRef.close();
  }
}
