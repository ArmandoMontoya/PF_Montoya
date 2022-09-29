import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Usuario } from '../../interfaces/usuario';
import { DialogUsuariosComponent } from '../dialog-usuarios/dialog-usuarios.component';

@Component({
  selector: 'app-dialog-detail-user',
  templateUrl: './dialog-detail-user.component.html',
  styleUrls: ['./dialog-detail-user.component.css']
})
export class DialogDetailUserComponent implements OnInit {

  formulario: FormGroup;
  textoBoton: string = '';
  tituloDialog: string = '';


  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<DialogUsuariosComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

    if(data){ //Actualizar
      this.tituloDialog = 'Ver detalle';
    }
    this.formulario = fb.group({
      usuarioId: new FormControl(data.usuarioId),
      user: new FormControl(data.user),
      password : new FormControl(data.password),
      Admin: new FormControl(data.admin),
    })
  }

  ngOnInit(){
  }

  cerrar(){
    this.dialogRef.close();
  }

}
