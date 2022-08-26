import { Injectable, ElementRef } from '@angular/core';
import { of, Observable } from 'rxjs';
import { Alumno } from '../interfaces/alumno.interface';



@Injectable({
  providedIn: 'root'
})
export class AlumnosService {

  alumnosFakeData: Alumno[] = [
    {idAlumno: 1, numeroControl: '14256545', nombre: 'Ismael', apellidoPaterno: 'Díaz', apellidoMaterno: 'Flores', fechaNacimiento: new Date(1992, 11, 10), curp: 'sdfjhsfjhs76', sexo: 'M', direccion: 'skdfsfjskf', contacto: 'Jorge Alberto Díaz', numeroContacto: '45454' },
    {idAlumno: 2, numeroControl: '34534534', nombre: 'Eduardo', apellidoPaterno: 'Hernaandez', apellidoMaterno: 'Morales', fechaNacimiento: new Date(1996, 0, 16), curp: 'kjhjsad756asd', sexo: 'M', direccion: 'skdfsfjskf', contacto: 'Erick Morales', numeroContacto: '557878' },
    {idAlumno: 3, numeroControl: '23453453', nombre: 'Fernando', apellidoPaterno: 'Gutierrez', apellidoMaterno: 'Reyes', fechaNacimiento: new Date(1999, 2, 20), curp: '545asdasd89', sexo: 'M', direccion: 'skdfsfjskf', contacto: 'Tadeo Reyes', numeroContacto: '774448' },
    {idAlumno: 4, numeroControl: '98659568', nombre: 'Jorge', apellidoPaterno: 'González', apellidoMaterno: 'Torres', fechaNacimiento: new Date(1990, 5, 5), curp: 'gfhnfgj55554', sexo: 'M', direccion: 'skdfsfjskf', contacto: 'Ofelia Torres', numeroContacto: '32345454' },
    {idAlumno: 5, numeroControl: '23234756', nombre: 'Miguel', apellidoPaterno: 'Rodriguez', apellidoMaterno: 'Mendoza', fechaNacimiento: new Date(1993, 10, 2), curp: 'sfsdfsdf1545zxc', sexo: 'M', direccion: 'skdfsfjskf', contacto: 'Rosalba Rodriguez', numeroContacto: '7474546' },
    {idAlumno: 6, numeroControl: '23434855', nombre: 'Andrea', apellidoPaterno: 'Acevedo', apellidoMaterno: 'Ortiz', fechaNacimiento: new Date(1997, 8, 1), curp: 'zvbs457661', sexo: 'F', direccion: 'skdfsfjskf', contacto: 'Belem Ortiz', numeroContacto: '323464' },
    {idAlumno: 7, numeroControl: '59698543', nombre: 'Josefina', apellidoPaterno: 'Pozos', apellidoMaterno: 'Castillo', fechaNacimiento: new Date(1991, 3, 22), curp: 'setrt124898', sexo: 'F', direccion: 'skdfsfjskf', contacto: 'Ortencia Castillo', numeroContacto: '65768786' },
    {idAlumno: 8, numeroControl: '98293844', nombre: 'Irlanda', apellidoPaterno: 'Garcia', apellidoMaterno: 'Alvarez', fechaNacimiento: new Date(1995, 7, 23), curp: 'puiuo4545fsd', sexo: 'F', direccion: 'skdfsfjskf', contacto: 'Basilio Garcia', numeroContacto: '7845645' },
    {idAlumno: 9, numeroControl: '46537344', nombre: 'Margarita', apellidoPaterno: 'Zavala', apellidoMaterno: 'Medina', fechaNacimiento: new Date(1997, 9, 12), curp: 'uikukuyk548', sexo: 'F', direccion: 'skdfsfjskf', contacto: 'Oscar Zavala', numeroContacto: '999155' },
    {idAlumno: 10, numeroControl: '78592442', nombre: 'Octavio', apellidoPaterno: 'Ramirez', apellidoMaterno: 'Vargas', fechaNacimiento: new Date(1995, 4, 10), curp: 'kjkyter4784', sexo: 'M', direccion: 'skdfsfjskf', contacto: 'Cesar Ramirez', numeroContacto: '5474121' }
  ];

  constructor() { }

  getAlumnos(): Observable<Alumno[]>{
    return of(this.alumnosFakeData);
  }

  updateAlumno(resultado: Alumno): Observable<Alumno[]>{
    const item = this.alumnosFakeData.find(alumno => alumno.idAlumno === resultado.idAlumno);
    const index = this.alumnosFakeData.indexOf(item!);
    this.alumnosFakeData[index] = resultado;

    return of(this.alumnosFakeData);
  }

  deleteAlumno(elemento: Alumno):Observable<Alumno[]>{
    this.alumnosFakeData = this.alumnosFakeData.filter((alumno: Alumno) => alumno.idAlumno != elemento.idAlumno);

    return of(this.alumnosFakeData);
  }
}
