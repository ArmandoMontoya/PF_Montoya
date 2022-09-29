import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { NotificacionService } from 'src/app/shared/services/notificacion.service';
import { Usuario } from '../../interfaces/usuario';
import { UsuariosService } from '../../services/usuarios.service';
import { DialogUsuariosComponent } from '../dialog-usuarios/dialog-usuarios.component';
import { DialogDetailUserComponent } from '../dialog-detail-user/dialog-detail-user.component';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/state/app.state';
import { selectUsuariosLoading } from 'src/app/state/selectors/usuarios-ngrx.selectors';
import { selectUsuarios } from '../../../state/selectors/usuarios-ngrx.selectors';
import { loadAUsuariosNgrxs } from 'src/app/state/actions/usuarios-ngrx.actions';

@Component({
  selector: 'app-listar-usuarios',
  templateUrl: './listar-usuarios.component.html',
  styleUrls: ['./listar-usuarios.component.css']
})
export class ListarUsuariosComponent implements OnInit {
  title:string = 'Usuarios';

  columnas: string[] = [ 'usuarioId', 'user', 'admin', 'acciones'];

  USUARIOS_DATA: Observable<Usuario[]> = new Observable();
  loading$: Observable<boolean> = new Observable();

  dataSource = new MatTableDataSource<Usuario>;
  @ViewChild(MatTable) tabla!: MatTable<Usuario>;

  constructor(
    private dialog: MatDialog,
    private dialogService: DialogService,
    private usuariosService: UsuariosService,
    private notificacion: NotificacionService,
    private store: Store<AppState>
  ) {
    this.listarUsuarios();
  }

  ngOnInit(): void {
    this.loading$ = this.store.select(selectUsuariosLoading);
    this.store.dispatch(loadAUsuariosNgrxs());
  }

  agregar(){
    const dialogRef = this.dialog.open(DialogUsuariosComponent, {
      width: '700px',
      data: ''
    });

    dialogRef.afterClosed().subscribe(resultado => {
      if(resultado){
        this.usuariosService.addUsuario(resultado).subscribe((response) => {
          this.loading$ = this.store.select(selectUsuariosLoading);
          this.store.dispatch(loadAUsuariosNgrxs());
          this.listarUsuarios();
          this.notificacion.mensaje('Usuario creado con éxito');
          this.tabla.renderRows();
        });
      }
    });
  }

  listarUsuarios(){
      this.USUARIOS_DATA = this.store.select(selectUsuarios);
      this.USUARIOS_DATA.subscribe(data => {
        this.dataSource = new MatTableDataSource(data);
    });
  }

  editar(elemento: Usuario){
    const dialogRef = this.dialog.open(DialogUsuariosComponent, {
      width: '700px',
      data: elemento
    });


    dialogRef.afterClosed().subscribe(resultado => {
      if(resultado){
          this.usuariosService.updateUsuario(resultado).subscribe((usuarios) => {
            this.loading$ = this.store.select(selectUsuariosLoading);
            this.store.dispatch(loadAUsuariosNgrxs());
            this.listarUsuarios();
              this.notificacion.mensaje('Usuario modificado con éxito');
        });
      }
    });
  }

  eliminar(elemento: Usuario){
    this.dialogService.confirmDialog({
      title: '¿Estás seguro de eliminar este registro?',
      message: '¡Esto no se puede revertir!',
      confirmText: 'Sí, eliminar',
      cancelText: 'Cancelar',
    }).subscribe(data =>
      {
      if(data === true){
        this.usuariosService.deleteUsuario(elemento).subscribe((usuarios) =>{
          this.loading$ = this.store.select(selectUsuariosLoading);
          this.store.dispatch(loadAUsuariosNgrxs());
          this.listarUsuarios();
          this.notificacion.mensaje('Usuario eliminado con éxito');
        });
      }
      });

  }

  detalle(elemento: Usuario){
      const dialogRef = this.dialog.open(DialogDetailUserComponent, {
        width: '700px',
        data: elemento
      });
  }

  filtrar(event: Event){
    const valorObtenido = (event.target as HTMLInputElement).value;
    this.dataSource.filter = valorObtenido.trim().toLocaleLowerCase();
  }

}

