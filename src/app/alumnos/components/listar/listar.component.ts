import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { DialogService } from 'src/app/shared/services/dialog.service';
import { Alumno } from '../../interfaces/alumno.interface';
import { EditarComponent } from '../editar/editar.component';


export interface Curso {
  nombre: string;
  comision: string;
  profesor: string;
  numeroEstudiantes: number;
  matriculaAbierta: boolean;
}


const ALUMNOS_DATA: Alumno[] = [
  {numeroControl: '14256545', nombre: 'Ismael', apellidoPaterno: 'Díaz', apellidoMaterno: 'Flores', fechaNacimiento: new Date(1992, 11, 10), curp: 'sdfjhsfjhs76', sexo: 'M', direccion: 'skdfsfjskf', contacto: 'Jorge Alberto Díaz', numeroContacto: '45454' },
  {numeroControl: '34534534', nombre: 'Eduardo', apellidoPaterno: 'Hernaandez', apellidoMaterno: 'Morales', fechaNacimiento: new Date(1996, 0, 16), curp: 'kjhjsad756asd', sexo: 'M', direccion: 'skdfsfjskf', contacto: 'Erick Morales', numeroContacto: '557878' },
  {numeroControl: '23453453', nombre: 'Fernando', apellidoPaterno: 'Gutierrez', apellidoMaterno: 'Reyes', fechaNacimiento: new Date(1999, 2, 20), curp: '545asdasd89', sexo: 'M', direccion: 'skdfsfjskf', contacto: 'Tadeo Reyes', numeroContacto: '774448' },
  {numeroControl: '98659568', nombre: 'Jorge', apellidoPaterno: 'González', apellidoMaterno: 'Torres', fechaNacimiento: new Date(1990, 5, 5), curp: 'gfhnfgj55554', sexo: 'M', direccion: 'skdfsfjskf', contacto: 'Ofelia Torres', numeroContacto: '32345454' },
  {numeroControl: '23234756', nombre: 'Miguel', apellidoPaterno: 'Rodriguez', apellidoMaterno: 'Mendoza', fechaNacimiento: new Date(1993, 10, 2), curp: 'sfsdfsdf1545zxc', sexo: 'M', direccion: 'skdfsfjskf', contacto: 'Rosalba Rodriguez', numeroContacto: '7474546' },
  {numeroControl: '23434855', nombre: 'Andrea', apellidoPaterno: 'Acevedo', apellidoMaterno: 'Ortiz', fechaNacimiento: new Date(1997, 8, 1), curp: 'zvbs457661', sexo: 'F', direccion: 'skdfsfjskf', contacto: 'Belem Ortiz', numeroContacto: '323464' },
  {numeroControl: '59698543', nombre: 'Josefina', apellidoPaterno: 'Pozos', apellidoMaterno: 'Castillo', fechaNacimiento: new Date(1991, 3, 22), curp: 'setrt124898', sexo: 'F', direccion: 'skdfsfjskf', contacto: 'Ortencia Castillo', numeroContacto: '65768786' },
  {numeroControl: '98293844', nombre: 'Irlanda', apellidoPaterno: 'Garcia', apellidoMaterno: 'Alvarez', fechaNacimiento: new Date(1995, 7, 23), curp: 'puiuo4545fsd', sexo: 'F', direccion: 'skdfsfjskf', contacto: 'Basilio Garcia', numeroContacto: '7845645' },
  {numeroControl: '46537344', nombre: 'Margarita', apellidoPaterno: 'Zavala', apellidoMaterno: 'Medina', fechaNacimiento: new Date(1997, 9, 12), curp: 'uikukuyk548', sexo: 'F', direccion: 'skdfsfjskf', contacto: 'Oscar Zavala', numeroContacto: '999155' },
  {numeroControl: '78592442', nombre: 'Octavio', apellidoPaterno: 'Ramirez', apellidoMaterno: 'Vargas', fechaNacimiento: new Date(1995, 4, 10), curp: 'kjkyter4784', sexo: 'M', direccion: 'skdfsfjskf', contacto: 'Cesar Ramirez', numeroContacto: '5474121' }
];

@Component({
  selector: 'app-listar',
  templateUrl: './listar.component.html',
  styleUrls: ['./listar.component.css']
})
export class ListarComponent implements OnInit {
  title:string = 'Alumnos';

  columnas: string[] = ['numeroControl', 'nombre', 'fechaNacimiento', 'curp', 'sexo', 'acciones'];
  dataSource: MatTableDataSource<Alumno> = new MatTableDataSource(ALUMNOS_DATA);
  @ViewChild(MatTable) tabla!: MatTable<Curso>;

  constructor(
    private dialog: MatDialog,
    private dialogService: DialogService
  ) { }

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
        this.tabla.renderRows();
      }
    });
  }

  editar(elemento: Alumno){
    const dialogRef = this.dialog.open(EditarComponent, {
      width: '700px',
      data: elemento
    });


    dialogRef.afterClosed().subscribe(resultado => {
      if(resultado){
        const item = this.dataSource.data.find(alumno => alumno.numeroControl === resultado.numeroControl);
        const index = this.dataSource.data.indexOf(item!);
        this.dataSource.data[index] = resultado;
        this.tabla.renderRows();
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
        this.dataSource.data = this.dataSource.data.filter((alumno: Alumno) => alumno.numeroControl != elemento.numeroControl);
      }
      });

  }

  filtrar(event: Event){
    const valorObtenido = (event.target as HTMLInputElement).value;
    this.dataSource.filter = valorObtenido.trim().toLocaleLowerCase();
  }
}
