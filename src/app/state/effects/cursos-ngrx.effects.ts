import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, concatMap, map, of } from "rxjs";
import * as CursosNgrxActions from '../actions/cursos-ngrx.actions';
import { CursosService } from '../../cursos/services/cursos.service';

@Injectable()
export class CursosNgrxEffects {

  loadAlumnosNgrxs$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(CursosNgrxActions.loadACursosNgrxs),
      concatMap(() => this.cursoService.getCursos()
        .pipe(
          map(cursos => CursosNgrxActions.loadCursosNgrxsSuccess({ cursos })),
          catchError(error => of(CursosNgrxActions.loadACursosNgrxsFailure({ error }))))
      )
    );
  });


  constructor(private actions$: Actions, private cursoService: CursosService) {}
}
