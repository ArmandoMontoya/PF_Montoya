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
import { NotificacionService } from '../../../shared/services/notificacion.service';
import { Alumno } from '../../../alumnos/interfaces/alumno.interface';
import { SelectCurso } from '../../../cursos/interfaces/cursos';
import { Observable, Subscription } from 'rxjs';
import { AppState } from 'src/app/state/app.state';
import { Store } from '@ngrx/store';
import { selectInscripcionesLoading } from 'src/app/state/selectors/inscripciones-ngrx.selectors';
import { loadAInscripcionesNgrxs } from 'src/app/state/actions/inscripciones-ngrx.actions';
import { selectInscripciones } from '../../../state/selectors/inscripciones-ngrx.selectors';
import { AuthService } from '../../../auth/services/auth.service';

@Component({
  selector: 'app-listar-inscripciones',
  templateUrl: './listar-inscripciones.component.html',
  styleUrls: ['./listar-inscripciones.component.css']
})
export class ListarInscripcionesComponent implements OnInit {
  title:string = 'Inscripciones';

  columnas: string[] = ['inscripcionId', 'nombre', 'descripcion', 'user', 'fechaInscripcion', 'acciones'];

  INSCRIPCIONES_DATA: Observable<Inscripcion[]> = new Observable();
  loading$: Observable<boolean> = new Observable();

  private userServiceSubscription: Subscription | undefined;
  isAdmin: boolean | undefined = false;


  dataSource = new MatTableDataSource<Inscripcion>;
  @ViewChild(MatTable) tabla!: MatTable<any>;


  constructor(
    private dialog: MatDialog,
    private dialogService: DialogService,
    private inscripcionesService: InscripcionesService,
    private alumnosService: AlumnosService,
    private cursosService:CursosService,
    private notificacion: NotificacionService,
    private store: Store<AppState>,
    private auth:AuthService
  ) {
    this.listarInscripciones();

    this.userServiceSubscription = this.auth.currentUser.subscribe(
      currentUser => {
        this.isAdmin = currentUser.usuario?.Admin
      }
    );
  }

  ngOnInit(): void {
    this.loading$ = this.store.select(selectInscripcionesLoading);
    this.store.dispatch(loadAInscripcionesNgrxs());
  }



  agregar(){
    const dialogRef = this.dialog.open(DialogInscripcionesComponent, {
      width: '700px',
      data: ''
    });

    dialogRef.afterClosed().subscribe(resultado => {
      if(resultado){
        this.inscripcionesService.addInscripcion(resultado).subscribe(
          (inscripcion) => {
            // this.dataSource.data.push(resultado);
        this.notificacion.mensaje('Inscripción creada con éxito');
        this.tabla.renderRows();
        this.loading$ = this.store.select(selectInscripcionesLoading);
        this.store.dispatch(loadAInscripcionesNgrxs());
        this.listarInscripciones();
          }
        )

      }
    });
  }

  contador = 0;
  listarInscripciones(){
    this.INSCRIPCIONES_DATA = this.store.select(selectInscripciones);
      this.INSCRIPCIONES_DATA.subscribe(data => {

        this.dataSource = new MatTableDataSource(data);

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
            this.loading$ = this.store.select(selectInscripcionesLoading);
        this.store.dispatch(loadAInscripcionesNgrxs());
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
          this.loading$ = this.store.select(selectInscripcionesLoading);
        this.store.dispatch(loadAInscripcionesNgrxs());
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
