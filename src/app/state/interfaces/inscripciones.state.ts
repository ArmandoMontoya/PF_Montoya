import { Inscripcion } from "src/app/inscripciones/interfaces/inscripciones";

export interface InscripcionesState {
  loading: boolean;
  inscripciones: Array<Inscripcion>;
}
