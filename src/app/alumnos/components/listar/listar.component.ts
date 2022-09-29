import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { Alumno } from '../../interfaces/alumno.interface';
import { EditarComponent } from '../editar/editar.component';
import { AlumnosService } from '../../services/alumnos.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NotificacionService } from '../../../shared/services/notificacion.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Subscription, Observable } from 'rxjs';
import { Store } from '@ngrx/store'
import { loadAlumnosNgrxs, loadAlumnosNgrxsSuccess } from '../../../state/actions/alumnos-ngrx.actions';
import { selectListaAlumnos, selectLoading } from '../../../state/selectors/alumnos-ngrx.selectors';
import { AppState } from '../../../state/app.state';
import { DetalleComponent } from '../detalle/detalle.component';


@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})
export class ListarComponent implements OnInit {
  title:string = 'Alumnos';

  columnas: string[] = [ 'Foto', 'NumeroControl', 'Nombre', 'Curp', 'FechaNacimiento', 'acciones'];

  ALUMNOS_DATA: Observable<Alumno[]> = new Observable();

  private userServiceSubscription: Subscription | undefined;
  isAdmin: boolean | undefined = false;

  loading$: Observable<boolean> = new Observable();

  dataSource = new MatTableDataSource<Alumno>;
  @ViewChild(MatTable) tabla!: MatTable<Alumno>;

  constructor(
    private dialog: MatDialog,
    private dialogService: DialogService,
    private alumnoService: AlumnosService,
    private notificacion: NotificacionService,
    private auth: AuthService,
    private store: Store<AppState>
  ) {
    this.listarAlumnos();

    this.userServiceSubscription = this.auth.currentUser.subscribe(
      currentUser => {
        this.isAdmin = currentUser.usuario?.Admin
      }
    );
  }

  ngOnInit(): void {
    this.loading$ = this.store.select(selectLoading);
    this.store.dispatch(loadAlumnosNgrxs());
  }

  agregar(){
    const dialogRef = this.dialog.open(EditarComponent, {
      width: '700px',
      data: ''
    });

    dialogRef.afterClosed().subscribe(resultado => {
      if(resultado){
        this.alumnoService.addAlumno(resultado).subscribe((response) => {
          this.loading$ = this.store.select(selectLoading);
          this.store.dispatch(loadAlumnosNgrxs());
          this.listarAlumnos();
          this.notificacion.mensaje('Alumno creado con éxito');
          this.tabla.renderRows();
        });
      }
    });
  }

  listarAlumnos(){
    this.ALUMNOS_DATA = this.store.select(selectListaAlumnos);
      this.ALUMNOS_DATA.subscribe(data => {
        this.dataSource = new MatTableDataSource(data);
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
            this.loading$ = this.store.select(selectLoading);
          this.store.dispatch(loadAlumnosNgrxs());
            this.listarAlumnos();
              this.notificacion.mensaje('Alumno modificado con éxito');
        });
      }
    });
  }

  verDetalle(elemento: Alumno){
    const dialogRef = this.dialog.open(DetalleComponent, {
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
          this.loading$ = this.store.select(selectLoading);
          this.store.dispatch(loadAlumnosNgrxs());
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
