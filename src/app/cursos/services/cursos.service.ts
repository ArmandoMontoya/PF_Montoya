import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Curso } from '../interfaces/cursos';

@Injectable({
  providedIn: 'root'
})
export class CursosService {
  cursosFakeData: Curso[] = [
    {idCurso: 1, descripcion: 'Matemáticas', fecha_Creacion: new Date(), duracion: 6, estatus: 1},
    {idCurso: 2, descripcion: 'Física', fecha_Creacion: new Date(), duracion: 12, estatus: 1},
  ];

  constructor() { }

  getCursos(): Observable<Curso[]>{
    return of(this.cursosFakeData);
  }

  updateCurso(resultado: Curso): Observable<Curso[]>{
    console.log(resultado)
    const item = this.cursosFakeData.find(curso => curso.idCurso === resultado.idCurso);
    console.log(item)
    const index = this.cursosFakeData.indexOf(item!);
    console.log(index)
    this.cursosFakeData[index] = resultado;

    return of(this.cursosFakeData);
  }

  deleteCurso(elemento: Curso):Observable<Curso[]>{
    this.cursosFakeData = this.cursosFakeData.filter((curso: Curso) => curso.idCurso != elemento.idCurso);

    return of(this.cursosFakeData);
  }
}
