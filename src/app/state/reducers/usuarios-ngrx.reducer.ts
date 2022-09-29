import { createReducer, on } from '@ngrx/store';
import { UsuariosState } from '../interfaces/usuarios.state';
import * as UsuariosNgrxActions from '../actions/usuarios-ngrx.actions'

export const initialState: UsuariosState = { loading: false, usuarios: [] }

export const usuariosReducer = createReducer(
  initialState,

  on(UsuariosNgrxActions.loadAUsuariosNgrxs, (state) => {
    return {...state, loading: true}
  }),
  on(UsuariosNgrxActions.loadUsuariosNgrxsSuccess, (state, { usuarios }) => {
    return {...state, loading: false, usuarios}
  }),

);
