import { createReducer, on } from '@ngrx/store';
import { InscripcionesState } from '../interfaces/inscripciones.state';
import * as InscripcionesNgrxActions from '../actions/inscripciones-ngrx.actions'

export const initialState: InscripcionesState = { loading: false, inscripciones: [] }

export const inscripcionesReducer = createReducer(
  initialState,

  on(InscripcionesNgrxActions.loadAInscripcionesNgrxs, (state) => {
    return {...state, loading: true}
  }),
  on(InscripcionesNgrxActions.loadInscripcionesNgrxsSuccess, (state, { inscripciones }) => {
    return {...state, loading: false, inscripciones}
  }),

);
