import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTable, MatTableDataSource } from '@angular/material/table';

import { DialogService } from 'src/app/shared/services/dialog.service';
import { Curso } from '../../interfaces/cursos';
import { DialogCursosComponent } from '../dialog-cursos/dialog-cursos.component';
import { CursosService } from '../../services/cursos.service';
import { NotificacionService } from '../../../shared/services/notificacion.service';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import { selectCursos, selectCursosLoading } from 'src/app/state/selectors/cursos-ngrx.selectors';
import { loadACursosNgrxs } from 'src/app/state/actions/cursos-ngrx.actions';

@Component({
  selector: 'app-listar-cursos',
  templateUrl: './listar-cursos.component.html',
  styleUrls: ['./listar-cursos.component.css']
})
export class ListarCursosComponent implements OnInit {
  title:string = 'Cursos';

  columnas: string[] = ['CursoId', 'Descripcion', 'FechaCreacion', 'Duracion', 'Estatus', 'acciones'];

  CURSOS_DATA: Observable<Curso[]> = new Observable();
  loading$: Observable<boolean> = new Observable();

  dataSource = new MatTableDataSource<Curso>;
  @ViewChild(MatTable) tabla!: MatTable<Curso>;

  private userServiceSubscription: Subscription | undefined;
  isAdmin: boolean | undefined = false;


  constructor(
    private dialog: MatDialog,
    private dialogService: DialogService,
    private notificacion: NotificacionService,
    private cursosService: CursosService,
    private auth: AuthService,
    private store: Store<AppState>
  ) {
    this.listarCursos();

    this.userServiceSubscription = this.auth.currentUser.subscribe(
      currentUser => {
        this.isAdmin = currentUser.usuario?.Admin
      }
    );
  }

  ngOnInit(): void {
    this.loading$ = this.store.select(selectCursosLoading);
    this.store.dispatch(loadACursosNgrxs());
  }

  agregar(){
    const dialogRef = this.dialog.open(DialogCursosComponent, {
      width: '700px',
      data: ''
    });

    dialogRef.afterClosed().subscribe(resultado => {
      if(resultado){
        this.cursosService.addCurso(resultado).subscribe((response) => {
          this.loading$ = this.store.select(selectCursosLoading);
    this.store.dispatch(loadACursosNgrxs());
          this.listarCursos();
          this.notificacion.mensaje('Curso creado con éxito');
          this.tabla.renderRows();
        });
      }
    });
  }

  listarCursos(){
    this.CURSOS_DATA = this.store.select(selectCursos);
      this.CURSOS_DATA.subscribe(data => {
        this.dataSource = new MatTableDataSource(data);
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
            this.loading$ = this.store.select(selectCursosLoading);
    this.store.dispatch(loadACursosNgrxs());
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
          this.loading$ = this.store.select(selectCursosLoading);
    this.store.dispatch(loadACursosNgrxs());
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
