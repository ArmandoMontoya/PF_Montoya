import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { Alumno } from '../../interfaces/alumno.interface';
import { EditarComponent } from '../editar/editar.component';
import { AlumnosService } from '../../services/alumnos.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})
export class ListarComponent implements OnInit {
  title:string = 'Alumnos';

  columnas: string[] = ['numeroControl', 'nombre', 'fechaNacimiento', 'curp', 'sexo', 'acciones'];

  ALUMNOS_DATA: Alumno[] = [];

  dataSource = new MatTableDataSource(this.ALUMNOS_DATA);
  @ViewChild(MatTable) tabla!: MatTable<Alumno>;

  constructor(
    private dialog: MatDialog,
    private dialogService: DialogService,
    private alumnoService: AlumnosService,
    private snackBar: MatSnackBar
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
        this.dataSource.data.push(resultado);
        this.notificacion('Alumno creado con éxito');
        this.tabla.renderRows();
      }
    });
  }

  listarAlumnos(){
    this.alumnoService.getAlumnos().subscribe((alumnos) => {
      this.dataSource = new MatTableDataSource(alumnos);
   });
  }

  editar(elemento: Alumno){
    const dialogRef = this.dialog.open(EditarComponent, {
      width: '700px',
      data: elemento
    });


    dialogRef.afterClosed().subscribe(resultado => {
      if(resultado){
          this.alumnoService.updateAlumno(resultado).subscribe((alumnos) => {
            this.dataSource = new MatTableDataSource(alumnos);
              this.notificacion('Alumno modificado con éxito');
        });
      }
    });
  }

  eliminar(elemento: Alumno){
    this.dialogService.confirmDialog({
      title: '¿Estás seguro de eliminar este registro?',
      message: '¡Esto no se puede revertir!',
      confirmText: 'Sí, eliminar',
      cancelText: 'Cancelar',
    }).subscribe(data =>
      {
      if(data === true){
        this.alumnoService.deleteAlumno(elemento).subscribe((alumnos) =>{
          this.notificacion('Alumno eliminado con éxito');
          this.dataSource = new MatTableDataSource(alumnos);
        });
      }
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
