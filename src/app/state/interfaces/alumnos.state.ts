import { Alumno } from "../../alumnos/interfaces/alumno.interface";

export interface AlumnosState {
  loading: boolean;
  alumnos: Array<Alumno>;
}
