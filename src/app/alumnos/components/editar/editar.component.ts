import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Alumno } from '../../interfaces/alumno.interface';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.component.html',
  styleUrls: ['./editar.component.css']
})
export class EditarComponent implements OnInit {

  formulario: FormGroup;
  textoBoton: string = '';
  tituloDialog: string = '';

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

    if(data){ //Actualizar
      this.textoBoton = 'Actualizar';
      this.tituloDialog = 'Editar Alumno';
    }
    else{ // Agregar
      this.textoBoton = 'Crear';
      this.tituloDialog = 'Agregar Alumno';
    }
    this.formulario = fb.group({
      alumnoId: new FormControl(data.alumnoId),
      numeroControl: new FormControl(data.numeroControl),
      nombre: new FormControl(data.nombre),
      apellidoPaterno: new FormControl(data.apellidoPaterno),
      apellidoMaterno: new FormControl(data.apellidoMaterno),
      fechaNacimiento: new FormControl(data.fechaNacimiento),
      curp: new FormControl(data.curp),
      foto: new FormControl(data.foto)
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
