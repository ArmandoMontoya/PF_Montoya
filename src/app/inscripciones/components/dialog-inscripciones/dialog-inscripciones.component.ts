import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inscripcion } from '../../interfaces/inscripciones';

@Component({
  selector: 'app-dialog-inscripciones',
  templateUrl: './dialog-inscripciones.component.html',
  styleUrls: ['./dialog-inscripciones.component.css']
})
export class DialogInscripcionesComponent implements OnInit {
  formulario: FormGroup;
  textoBoton: string = '';
  tituloDialog: string = '';

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<DialogInscripcionesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Inscripcion
  ) {

    if(data){ //Actualizar
      this.textoBoton = 'Actualizar';
      this.tituloDialog = 'Editar Inscripción';
    }
    else{ // Agregar
      this.textoBoton = 'Crear';
      this.tituloDialog = 'Agregar Inscripción';
    }
    this.formulario = fb.group({
      idInscripcion: new FormControl(data.idInscripcion),
      // idAlumno: new FormControl(data.idAlumno),
      // idCurso: new FormControl(data.idCurso),
      fecha_inscripcion: new FormControl(data.fecha_inscripcion)
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
