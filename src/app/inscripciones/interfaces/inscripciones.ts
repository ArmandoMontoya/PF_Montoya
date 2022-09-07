import { Alumno } from '../../alumnos/interfaces/alumno.interface';
import { Curso } from '../../cursos/interfaces/cursos';

export interface Inscripcion {
  idInscripcion: number;
  alumnos: Alumno[];
  cursos: Curso[];
  fecha_inscripcion: Date;
}

export interface ListaInscripcion {
  idInscripcion?: number;
  fecha_inscripcion?: Date;
  nombreAlumno?: string;
  nombreCurso?: string;
}
