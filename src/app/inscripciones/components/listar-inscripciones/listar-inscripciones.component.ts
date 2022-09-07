import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Inscripcion, ListaInscripcion } from '../../interfaces/inscripciones';
import { DialogInscripcionesComponent } from '../dialog-inscripciones/dialog-inscripciones.component';
import { InscripcionesService } from '../../services/inscripciones.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { AlumnosService } from '../../../alumnos/services/alumnos.service';
import { CursosService } from '../../../cursos/services/cursos.service';
import { SelectAlumno } from 'src/app/alumnos/interfaces/alumno.interface';
import { NotificacionService } from '../../../shared/services/notificacion.service';
import { Alumno } from '../../../alumnos/interfaces/alumno.interface';

@Component({
  selector: 'app-listar-inscripciones',
  templateUrl: './listar-inscripciones.component.html',
  styleUrls: ['./listar-inscripciones.component.css']
})
export class ListarInscripcionesComponent implements OnInit {
  title:string = 'Inscripciones';

  columnas: string[] = ['idInscripcion', 'fecha_inscripcion', 'nombreAlumno', 'nombreCurso', 'acciones'];

  INSCRIPCIONES_DATA: any[] = [];
  DATA: ListaInscripcion[] = [];

  dataSource!: MatTableDataSource<ListaInscripcion>;
  @ViewChild(MatTable) tabla!: MatTable<any>;

  constructor(
    private dialog: MatDialog,
    private dialogService: DialogService,
    private inscripcionesService: InscripcionesService,
    private alumnosService: AlumnosService,
    private cursosService:CursosService,
    private notificacion: NotificacionService
  ) {
    this.listarInscripciones();
  }

  ngOnInit(): void {
  }

  agregar(){
    const dialogRef = this.dialog.open(DialogInscripcionesComponent, {
      width: '700px',
      data: ''
    });

    dialogRef.afterClosed().subscribe(resultado => {
      if(resultado){
        this.dataSource.data.push(resultado);
        this.notificacion.mensaje('Inscripción creada con éxito');
        this.tabla.renderRows();
      }
    });
  }

  contador = 0;
  listarInscripciones(){
    this.INSCRIPCIONES_DATA = [];
    this.inscripcionesService.getInscripciones().subscribe((inscripciones) => {
      console.log(inscripciones)
      inscripciones.map(  (inscripcion) => {

        inscripcion.alumnos.map( (alumno) => {
          let alumnos = `${alumno.nombre} ${alumno.apellidoPaterno} ${alumno.apellidoMaterno}`;
          this.INSCRIPCIONES_DATA.push({idInscripcion:inscripcion.idInscripcion, fecha_inscripcion:inscripcion.fecha_inscripcion, nombreAlumno:alumnos})
        });

        console.log(this.INSCRIPCIONES_DATA)
        inscripcion.cursos.map( (curso) => {
          this.INSCRIPCIONES_DATA[this.contador].nombreCurso = curso.descripcion;
          this.contador++;
        });
      });


      this.DATA = this.INSCRIPCIONES_DATA;
      console.log(this.DATA)
      this.dataSource = new MatTableDataSource(this.DATA)
    });
  }

  editar(elemento: Inscripcion){
    const dialogRef = this.dialog.open(DialogInscripcionesComponent, {
      width: '700px',
      data: elemento
    });


    dialogRef.afterClosed().subscribe(resultado => {
      if(resultado){
          this.inscripcionesService.updateInscripcion(resultado).subscribe((inscripciones) => {
            this.listarInscripciones();
              this.notificacion.mensaje('Inscripción modificada con éxito');
        });
      }
    });
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
          this.listarInscripciones();
        });
      }
      });
  }

  filtrar(event: Event){
    const valorObtenido = (event.target as HTMLInputElement).value;
    this.dataSource.filter = valorObtenido.trim().toLocaleLowerCase();
  }

}
