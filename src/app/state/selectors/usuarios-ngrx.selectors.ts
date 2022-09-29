import { createSelector } from "@ngrx/store";
import { AppState } from "../app.state";
import { UsuariosState } from "../interfaces/usuarios.state";

export const selectUsuariosFeature = (state: AppState) => state.usuarios;

export const selectUsuarios = createSelector(
  selectUsuariosFeature,
  (state: UsuariosState) => state.usuarios
);

export const selectUsuariosLoading = createSelector(
  selectUsuariosFeature,
  (state: UsuariosState) => state.loading
);
