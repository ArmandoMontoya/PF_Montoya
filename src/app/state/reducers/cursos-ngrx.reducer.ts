import { createReducer, on } from "@ngrx/store";
import { CursosState } from "../interfaces/cursos.state";
import * as CursosNgrxActions from '../actions/cursos-ngrx.actions';

export const initialState: CursosState = { loading: false, cursos: [] }

export const cursosReducer = createReducer(
  initialState,

  on(CursosNgrxActions.loadACursosNgrxs, (state) => {
    return {...state, loading: true}
  }),
  on(CursosNgrxActions.loadCursosNgrxsSuccess, (state, { cursos }) => {
    return {...state, loading: false, cursos}
  }),

);
