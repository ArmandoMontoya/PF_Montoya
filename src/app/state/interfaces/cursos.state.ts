import { Curso } from '../../cursos/interfaces/cursos';

export interface CursosState {
  loading: boolean;
  cursos: Array<Curso>;
}
