import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Curso } from '../../interfaces/cursos';

@Component({
  selector: 'app-dialog-cursos',
  templateUrl: './dialog-cursos.component.html',
  styleUrls: ['./dialog-cursos.component.css']
})
export class DialogCursosComponent implements OnInit {
  formulario: FormGroup;
  textoBoton: string = '';
  tituloDialog: string = '';

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<DialogCursosComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Curso
  ) {

    if(data){ //Actualizar
      this.textoBoton = 'Actualizar';
      this.tituloDialog = 'Editar Curso';
    }
    else{ // Agregar
      this.textoBoton = 'Crear';
      this.tituloDialog = 'Agregar Curso';
    }
    this.formulario = fb.group({
      idCurso: new FormControl(data.idCurso),
      idInscripcion: new FormControl(data.idInscripcion),
      descripcion: new FormControl(data.descripcion),
      fecha_Creacion: new FormControl(data.fecha_Creacion),
      duracion: new FormControl(data.duracion),
      estatus: new FormControl(data.estatus),
    })
  }

  ngOnInit(){
  }

  actualizar(){
    this.dialogRef.close(this.formulario.value);
  }

  cerrar(){
    this.dialogRef.close();
  }
}
