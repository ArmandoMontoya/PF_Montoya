import { createAction, props } from "@ngrx/store";
import { Curso } from '../../cursos/interfaces/cursos';

export const loadACursosNgrxs = createAction(
  '[Cursos List load] Llamada para cargar los Cursos'
);

export const loadCursosNgrxsSuccess = createAction(
  '[Cursos List/API] La carga de Cursos se ejecutó de forma exitosa',
  props<{ cursos: Curso[] }>()
);

export const loadACursosNgrxsFailure = createAction( //TODO: <----
  '[Cursos FAIL] La carga de Cursos falló',
  props<{ error: any }>()
);
