import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { NotificacionService } from 'src/app/shared/services/notificacion.service';
import { Usuario } from '../../interfaces/usuario';
import { UsuariosService } from '../../services/usuarios.service';
import { DialogUsuariosComponent } from '../dialog-usuarios/dialog-usuarios.component';
import { DialogDetailUserComponent } from '../dialog-detail-user/dialog-detail-user.component';

@Component({
  selector: 'app-listar-usuarios',
  templateUrl: './listar-usuarios.component.html',
  styleUrls: ['./listar-usuarios.component.css']
})
export class ListarUsuariosComponent implements OnInit {
  title:string = 'Usuarios';

  columnas: string[] = [ 'idUsuario', 'user', 'Admin', 'acciones'];

  USUARIOS_DATA: Usuario[] = [];

  dataSource = new MatTableDataSource(this.USUARIOS_DATA);
  @ViewChild(MatTable) tabla!: MatTable<Usuario>;

  constructor(
    private dialog: MatDialog,
    private dialogService: DialogService,
    private usuariosService: UsuariosService,
    private notificacion: NotificacionService
  ) {
    this.listarUsuarios();
  }

  ngOnInit(): void {
  }

  agregar(){
    const dialogRef = this.dialog.open(DialogUsuariosComponent, {
      width: '700px',
      data: ''
    });

    dialogRef.afterClosed().subscribe(resultado => {
      if(resultado){
        this.usuariosService.addUsuario(resultado).subscribe((response) => {

          this.listarUsuarios();
          this.notificacion.mensaje('Usuario creado con éxito');
          this.tabla.renderRows();
        });
      }
    });
  }

  listarUsuarios(){
    this.USUARIOS_DATA = [];
      this.usuariosService.getUsuarios().subscribe((usuarios) => {
        usuarios.forEach(usuario => {
          this.USUARIOS_DATA.push(usuario);
        });
        this.dataSource = new MatTableDataSource(this.USUARIOS_DATA);
     });

  }

  editar(elemento: Usuario){
    console.log(elemento);
    const dialogRef = this.dialog.open(DialogUsuariosComponent, {
      width: '700px',
      data: elemento
    });


    dialogRef.afterClosed().subscribe(resultado => {
      if(resultado){
          this.usuariosService.updateUsuario(resultado).subscribe((usuarios) => {
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
