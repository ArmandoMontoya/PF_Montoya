import { Alumno } from '../../alumnos/interfaces/alumno.interface';
import { Curso } from '../../cursos/interfaces/cursos';

export interface Inscripcion {
  inscripcionId: number;
  alumnoId: number;
  nombre: string;
  cursoId: number;
  descripcion: string;
  usuarioId: number;
  user: string;
  fechaInscripcion: Date;
}
