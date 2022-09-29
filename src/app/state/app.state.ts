import { ActionReducerMap } from '@ngrx/store'
import { AlumnosState } from './interfaces/alumnos.state';
import { CursosState } from './interfaces/cursos.state';
import { alumnosReducer } from './reducers/alumnos-ngrx.reducer';
import { cursosReducer } from './reducers/cursos-ngrx.reducer';
import { UsuariosState } from './interfaces/usuarios.state';
import { usuariosReducer } from './reducers/usuarios-ngrx.reducer';
import { InscripcionesState } from './interfaces/inscripciones.state';
import { inscripcionesReducer } from './reducers/inscripciones-ngrx.reducer';


export interface AppState {
  alumnos: AlumnosState,
  cursos: CursosState,
  usuarios: UsuariosState,
  inscripciones: InscripcionesState
}

export const ROOT_REDUCERS: ActionReducerMap<AppState> = {
  alumnos: alumnosReducer,
  cursos: cursosReducer,
  usuarios: usuariosReducer,
  inscripciones: inscripcionesReducer
}
