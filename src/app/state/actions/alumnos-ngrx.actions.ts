import { createAction, props } from '@ngrx/store';
import { Alumno } from '../../alumnos/interfaces/alumno.interface';

export const loadAlumnosNgrxs = createAction(
  '[Alumnos List load] Llamada para cargar los alumnos'
);

export const loadAlumnosNgrxsSuccess = createAction(
  '[Alumnos List/API] La carga de Alumnos se ejecutó de forma exitosa',
  props<{ alumnos: Alumno[] }>()
);

export const loadAlumnosNgrxsFailure = createAction( //TODO: <----
  '[Alumnos FAIL] La carga de alumnos falló',
  props<{ error: any }>()
);
