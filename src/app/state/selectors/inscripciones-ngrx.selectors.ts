import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state";
import { InscripcionesState } from "../interfaces/inscripciones.state";

export const selectInscripcionesFeature = (state: AppState) => state.inscripciones;

export const selectInscripciones = createSelector(
  selectInscripcionesFeature,
  (state: InscripcionesState) => state.inscripciones
);

export const selectInscripcionesLoading = createSelector(
  selectInscripcionesFeature,
  (state: InscripcionesState) => state.loading
);
