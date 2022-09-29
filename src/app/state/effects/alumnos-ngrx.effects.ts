import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';
import * as AlumnosNgrxActions from '../actions/alumnos-ngrx.actions';
import { AlumnosService } from '../../alumnos/services/alumnos.service';


@Injectable()
export class AlumnosNgrxEffects {

  loadAlumnosNgrxs$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(AlumnosNgrxActions.loadAlumnosNgrxs),
      concatMap(() => this.alumnosService.getAlumnos()
        .pipe(
          map(alumnos => AlumnosNgrxActions.loadAlumnosNgrxsSuccess({ alumnos })),
          catchError(error => of(AlumnosNgrxActions.loadAlumnosNgrxsFailure({ error }))))
      )
    );
  });


  constructor(private actions$: Actions, private alumnosService: AlumnosService) {}
}
