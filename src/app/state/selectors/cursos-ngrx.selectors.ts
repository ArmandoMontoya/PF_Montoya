import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state";
import { CursosState } from "../interfaces/cursos.state";

export const selectCursosFeature = (state: AppState) => state.cursos;

export const selectCursos = createSelector(
  selectCursosFeature,
  (state: CursosState) => state.cursos
);

export const selectCursosLoading = createSelector(
  selectCursosFeature,
  (state: CursosState) => state.loading
);
