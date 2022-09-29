import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EditarComponent } from '../editar/editar.component';
import { InscripcionesService } from '../../../inscripciones/services/inscripciones.service';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Inscripcion } from 'src/app/inscripciones/interfaces/inscripciones';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { NotificacionService } from 'src/app/shared/services/notificacion.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {

  title:string = 'Alumnos';

  formulario: FormGroup;
  textoBoton: string = '';
  tituloDialog: string = '';

  columnas: string[] = ['descripcion', 'user', 'fechaInscripcion', 'acciones'];

  INSCRIPCIONES_DATA: any[] = [];
  DATA: Inscripcion[] = [];

  alumnoIdGlobal:number = 0;

  dataSource!: MatTableDataSource<Inscripcion>;
  @ViewChild(MatTable) tabla!: MatTable<any>;

  constructor(
    private inscripcionesService: InscripcionesService,
    private fb: FormBuilder,
    private dialogService: DialogService,
    private notificacion: NotificacionService,
    private dialogRef: MatDialogRef<EditarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

    if(this.data){ //Actualizar
      this.textoBoton = 'Actualizar';
      this.tituloDialog = 'Ver detalle Alumno';
    }
    else{ // Agregar
      this.textoBoton = 'Crear';
      this.tituloDialog = 'Agregar Alumno';
    }
    this.formulario = fb.group({
      alumnoId: new FormControl(this.data.alumnoId),
      numeroControl: new FormControl(this.data.numeroControl),
      nombre: new FormControl(this.data.nombre),
      apellidoPaterno: new FormControl(this.data.apellidoPaterno),
      apellidoMaterno: new FormControl(this.data.apellidoMaterno),
      fechaNacimiento: new FormControl(this.data.fechaNacimiento),
      curp: new FormControl(this.data.curp),
      foto: new FormControl(this.data.foto)
    })

    this.alumnoIdGlobal = this.data.alumnoId;
    this.listarInscripciones(this.data.alumnoId);
  }

  ngOnInit(): void {
  }

  listarInscripciones(alumnoId:number){
    this.INSCRIPCIONES_DATA = [];
    this.inscripcionesService.getInscripcionesAlumno(alumnoId).subscribe(inscripciones => {
      this.INSCRIPCIONES_DATA = inscripciones;
      this.dataSource = new MatTableDataSource(this.INSCRIPCIONES_DATA);
    })

  }

  eliminar(elemento: Inscripcion){
    this.dialogService.confirmDialog({
      title: '¿Estás seguro de eliminar este registro?',
      message: '¡Esto no se puede revertir!',
      confirmText: 'Sí, eliminar',
      cancelText: 'Cancelar',
    }).subscribe(data =>
      {
      if(data === true){
        this.inscripcionesService.deleteInscripcion(elemento).subscribe((inscripciones) =>{
          this.notificacion.mensaje('Inscripción eliminada con éxito');
          this.listarInscripciones(this.alumnoIdGlobal);
        });
      }
      });
  }

  cerrar(){
    this.dialogRef.close();
  }

}
