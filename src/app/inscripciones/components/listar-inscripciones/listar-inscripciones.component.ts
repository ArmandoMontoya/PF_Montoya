import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Inscripcion } from '../../interfaces/inscripciones';
import { DialogInscripcionesComponent } from '../dialog-inscripciones/dialog-inscripciones.component';
import { InscripcionesService } from '../../services/inscripciones.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { AlumnosService } from '../../../alumnos/services/alumnos.service';
import { CursosService } from '../../../cursos/services/cursos.service';
import { SelectAlumno } from 'src/app/alumnos/interfaces/alumno.interface';

@Component({
  selector: 'app-listar-inscripciones',
  templateUrl: './listar-inscripciones.component.html',
  styleUrls: ['./listar-inscripciones.component.css']
})
export class ListarInscripcionesComponent implements OnInit {
  title:string = 'Inscripciones';

  columnas: string[] = ['idInscripcion', 'idAlumno', 'idCurso', 'fecha_inscripcion', 'acciones'];

  INSCRIPCIONES_DATA: Inscripcion[] = [];

  dataSource = new MatTableDataSource(this.INSCRIPCIONES_DATA);
  @ViewChild(MatTable) tabla!: MatTable<Inscripcion>;

  constructor(
    private dialog: MatDialog,
    private dialogService: DialogService,
    private inscripcionesService: InscripcionesService,
    private alumnosService: AlumnosService,
    private cursosService:CursosService,
    private snackBar: MatSnackBar
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
        this.notificacion('Inscripción creada con éxito');
        this.tabla.renderRows();
      }
    });
  }

  listarInscripciones(){
    this.inscripcionesService.getInscripciones().subscribe((inscripciones) => {
      inscripciones.forEach( element => {
        this.listarAlumnos(element.idAlumno);
        this.listarCursos(element.idCurso);
      });

      this.dataSource = new MatTableDataSource(inscripciones);
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
            this.dataSource = new MatTableDataSource(inscripciones);
              this.notificacion('Inscripción modificada con éxito');
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
          this.notificacion('Inscripción eliminada con éxito');
          this.dataSource = new MatTableDataSource(inscripciones);
        });
      }
      });
  }

  selectAlumnos: any;

  listarAlumnos(id:number){
    this.alumnosService.getAlumnos().subscribe((alumnos) => {
      this.selectAlumnos = alumnos.find(x => x.idAlumno === id);
   });
  }

  cursos:any;
  listarCursos(id:number){
    this.cursosService.getCursos().subscribe((cursos) => {
      this.cursos = cursos;
   });
  }

  filtrar(event: Event){
    const valorObtenido = (event.target as HTMLInputElement).value;
    this.dataSource.filter = valorObtenido.trim().toLocaleLowerCase();
  }

  notificacion(mensaje:string){
    this.snackBar.open(mensaje, 'x',{
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
  }
}
