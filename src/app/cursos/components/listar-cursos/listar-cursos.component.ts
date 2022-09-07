import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTable, MatTableDataSource } from '@angular/material/table';

import { DialogService } from 'src/app/shared/services/dialog.service';
import { Curso } from '../../interfaces/cursos';
import { DialogCursosComponent } from '../dialog-cursos/dialog-cursos.component';
import { CursosService } from '../../services/cursos.service';
import { NotificacionService } from '../../../shared/services/notificacion.service';

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
    private notificacion: NotificacionService
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
        this.cursosService.addCurso(resultado).subscribe((response) => {
          this.listarCursos();
          this.notificacion.mensaje('Alumno creado con éxito');
          this.tabla.renderRows();
        });
      }
    });
  }

  listarCursos(){
    this.CURSOS_DATA = [];
    for(let i = 1; i <= 3; i++){
    this.cursosService.getCursos(i).subscribe((cursos) => {
      cursos.forEach(alumno => {
        this.CURSOS_DATA.push(alumno);
      });
      this.dataSource = new MatTableDataSource(this.CURSOS_DATA);
   });
  }
  }

  editar(elemento: Curso){
    const dialogRef = this.dialog.open(DialogCursosComponent, {
      width: '700px',
      data: elemento
    });

    dialogRef.afterClosed().subscribe(resultado => {
      if(resultado){
          this.cursosService.updateCurso(resultado).subscribe((cursos) => {
            this.listarCursos();
              this.notificacion.mensaje('Curso modificado con éxito');
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
          this.listarCursos();
          this.notificacion.mensaje('Curso eliminado con éxito');
        });
      }
      });

  }

  filtrar(event: Event){
    const valorObtenido = (event.target as HTMLInputElement).value;
    this.dataSource.filter = valorObtenido.trim().toLocaleLowerCase();
  }
}
