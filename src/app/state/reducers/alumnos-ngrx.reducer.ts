import { Action, createReducer, on } from '@ngrx/store';
import * as AlumnosNgrxActions from '../actions/alumnos-ngrx.actions';
import { Alumno } from '../../alumnos/interfaces/alumno.interface';
import { AlumnosState } from '../interfaces/alumnos.state';

export const alumnosNgrxFeatureKey = 'alumnosNgrx';

export const initialState: AlumnosState = { loading: false, alumnos: [] }

export const alumnosReducer = createReducer(
  initialState,

  on(AlumnosNgrxActions.loadAlumnosNgrxs, (state) => {
    return {...state, loading: true}
  }),
  on(AlumnosNgrxActions.loadAlumnosNgrxsSuccess, (state, {alumnos}) => {
    return {...state, loading: false, alumnos}
  }),

);
