import { createAction, props } from "@ngrx/store";
import { Inscripcion } from "src/app/inscripciones/interfaces/inscripciones";

export const loadAInscripcionesNgrxs = createAction(
  '[Inscripciones List load] Llamada para cargar los Inscripciones'
);

export const loadInscripcionesNgrxsSuccess = createAction(
  '[Inscripciones List/API] La carga de Inscripciones se ejecutó de forma exitosa',
  props<{ inscripciones: Inscripcion[] }>()
);

export const loadAInscripcionesNgrxsFailure = createAction( //TODO: <----
  '[Inscripciones FAIL] La carga de Inscripcions falló',
  props<{ error: any }>()
);
