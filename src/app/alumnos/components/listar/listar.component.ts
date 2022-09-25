import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { Alumno } from '../../interfaces/alumno.interface';
import { EditarComponent } from '../editar/editar.component';
import { AlumnosService } from '../../services/alumnos.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificacionService } from '../../../shared/services/notificacion.service';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})
export class ListarComponent implements OnInit {
  title:string = 'Alumnos';

  columnas: string[] = [ 'Foto', 'NumeroControl', 'Nombre', 'Curp', 'FechaNacimiento', 'acciones'];

  ALUMNOS_DATA: Alumno[] = [];

  dataSource = new MatTableDataSource(this.ALUMNOS_DATA);
  @ViewChild(MatTable) tabla!: MatTable<Alumno>;

  constructor(
    private dialog: MatDialog,
    private dialogService: DialogService,
    private alumnoService: AlumnosService,
    private notificacion: NotificacionService
  ) {
    this.listarAlumnos();
  }

  ngOnInit(): void {
  }

  agregar(){
    const dialogRef = this.dialog.open(EditarComponent, {
      width: '700px',
      data: ''
    });

    dialogRef.afterClosed().subscribe(resultado => {
      if(resultado){
        this.alumnoService.addAlumno(resultado).subscribe((response) => {

          this.listarAlumnos();
          this.notificacion.mensaje('Alumno creado con éxito');
          this.tabla.renderRows();
        });
      }
    });
  }

  listarAlumnos(){
    this.ALUMNOS_DATA = [];
      this.alumnoService.getAlumnos().subscribe((alumnos) => {
        alumnos.forEach(alumno => {
          this.ALUMNOS_DATA.push(alumno);
        });
        this.dataSource = new MatTableDataSource(this.ALUMNOS_DATA);
     });
  }

  editar(elemento: Alumno){
    console.log(elemento);
    const dialogRef = this.dialog.open(EditarComponent, {
      width: '700px',
      data: elemento
    });


    dialogRef.afterClosed().subscribe(resultado => {
      if(resultado){
          this.alumnoService.updateAlumno(resultado).subscribe((alumnos) => {
            this.listarAlumnos();
              this.notificacion.mensaje('Alumno modificado con éxito');
        });
      }
    });
  }

  eliminar(elemento: any){
    this.dialogService.confirmDialog({
      title: '¿Estás seguro de eliminar este registro?',
      message: '¡Esto no se puede revertir!',
      confirmText: 'Sí, eliminar',
      cancelText: 'Cancelar',
    }).subscribe(data =>
      {
      if(data === true){
        this.alumnoService.deleteAlumno(elemento).subscribe((alumnos) =>{
          this.listarAlumnos();
          this.notificacion.mensaje('Alumno eliminado con éxito');
        });
      }
      });

  }

  filtrar(event: Event){
    const valorObtenido = (event.target as HTMLInputElement).value;
    this.dataSource.filter = valorObtenido.trim().toLocaleLowerCase();
  }
}
