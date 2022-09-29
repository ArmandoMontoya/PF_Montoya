import { createAction, props } from "@ngrx/store";
import { Usuario } from "src/app/usuarios/interfaces/usuario";

export const loadAUsuariosNgrxs = createAction(
  '[Usuarios List load] Llamada para cargar los Usuarios'
);

export const loadUsuariosNgrxsSuccess = createAction(
  '[Usuarios List/API] La carga de Usuarios se ejecutó de forma exitosa',
  props<{ usuarios: Usuario[] }>()
);

export const loadAUsuariosNgrxsFailure = createAction( //TODO: <----
  '[Usuarios FAIL] La carga de Usuarios falló',
  props<{ error: any }>()
);
