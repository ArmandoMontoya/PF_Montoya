import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromAlumnosNgrx from '../reducers/alumnos-ngrx.reducer';
import { AppState } from '../app.state';
import { AlumnosState } from '../interfaces/alumnos.state';


export const selectAlumnosFeature = (state: AppState) => state.alumnos;

export const selectListaAlumnos = createSelector(
  selectAlumnosFeature,
  (state: AlumnosState) => state.alumnos
);

export const selectLoading = createSelector(
  selectAlumnosFeature,
  (state: AlumnosState) => state.loading
);
