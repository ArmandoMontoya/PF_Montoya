import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, concatMap, map, of } from "rxjs";
import { InscripcionesService } from "src/app/inscripciones/services/inscripciones.service";
import * as InscripcionesNgrxActions from '../actions/inscripciones-ngrx.actions';

@Injectable()
export class InscripcionesNgrxEffects {

  loadAlumnosNgrxs$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(InscripcionesNgrxActions.loadAInscripcionesNgrxs),
      concatMap(() => this.inscripcionService.getInscripciones()
        .pipe(
          map(inscripciones => InscripcionesNgrxActions.loadInscripcionesNgrxsSuccess({ inscripciones })),
          catchError(error => of(InscripcionesNgrxActions.loadAInscripcionesNgrxsFailure({ error }))))
      )
    );
  });


  constructor(private actions$: Actions, private inscripcionService: InscripcionesService) {}
}
