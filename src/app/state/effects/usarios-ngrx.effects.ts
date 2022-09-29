import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, concatMap, map, of } from "rxjs";
import { UsuariosService } from "src/app/usuarios/services/usuarios.service";
import * as UsuariosNgrxActions from '../actions/usuarios-ngrx.actions';

@Injectable()
export class UsuariosNgrxEffects {

  loadAlumnosNgrxs$ = createEffect(() => {
    return this.actions$.pipe(

      ofType(UsuariosNgrxActions.loadAUsuariosNgrxs),
      concatMap(() => this.usuarioService.getUsuarios()
        .pipe(
          map(usuarios => UsuariosNgrxActions.loadUsuariosNgrxsSuccess({ usuarios })),
          catchError(error => of(UsuariosNgrxActions.loadAUsuariosNgrxsFailure({ error }))))
      )
    );
  });


  constructor(private actions$: Actions, private usuarioService: UsuariosService) {}
}
