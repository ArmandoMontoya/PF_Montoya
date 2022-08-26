import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTable, MatTableDataSource } from '@angular/material/table';

import { DialogService } from 'src/app/shared/services/dialog.service';
import { Curso } from '../../interfaces/cursos';
import { DialogCursosComponent } from '../dialog-cursos/dialog-cursos.component';
import { CursosService } from '../../services/cursos.service';

@Component({
  selector: 'app-listar-cursos',
  templateUrl: './listar-cursos.component.html',
  styleUrls: ['./listar-cursos.component.css']
})
export class ListarCursosComponent implements OnInit {
  title:string = 'Cursos';

  columnas: string[] = ['idCurso', 'descripcion', 'fecha_Creacion', 'duracion', 'estatus', 'acciones'];

  CURSOS_DATA: Curso[] = [];

  dataSource = new MatTableDataSource(this.CURSOS_DATA);
  @ViewChild(MatTable) tabla!: MatTable<Curso>;

  constructor(
    private dialog: MatDialog,
    private dialogService: DialogService,
    private cursosService: CursosService,
    private snackBar: MatSnackBar
  ) {
    this.listarCursos();
  }

  ngOnInit(): void {
  }

  agregar(){
    const dialogRef = this.dialog.open(DialogCursosComponent, {
      width: '700px',
      data: ''
    });

    dialogRef.afterClosed().subscribe(resultado => {
      if(resultado){
        this.dataSource.data.push(resultado);
        this.notificacion('Curso creado con éxito');
        this.tabla.renderRows();
      }
    });
  }

  listarCursos(){
    this.cursosService.getCursos().subscribe((cursos) => {
      this.dataSource = new MatTableDataSource(cursos);
   });
  }

  editar(elemento: Curso){
    const dialogRef = this.dialog.open(DialogCursosComponent, {
      width: '700px',
      data: elemento
    });

    dialogRef.afterClosed().subscribe(resultado => {
      if(resultado){
          this.cursosService.updateCurso(resultado).subscribe((cursos) => {
            this.dataSource = new MatTableDataSource(cursos);
              this.notificacion('Curso modificado con éxito');
        });
      }
    });
  }

  eliminar(elemento: Curso){
    this.dialogService.confirmDialog({
      title: '¿Estás seguro de eliminar este registro?',
      message: '¡Esto no se puede revertir!',
      confirmText: 'Sí, eliminar',
      cancelText: 'Cancelar',
    }).subscribe(data =>
      {
      if(data === true){
        this.cursosService.deleteCurso(elemento).subscribe((cursos) =>{
          this.notificacion('Curso eliminado con éxito');
          this.dataSource = new MatTableDataSource(cursos);
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
