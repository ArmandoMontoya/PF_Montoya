export interface Alumno {
  AlumnoId: number;
  NumeroControl: string;
  Nombre: string;
  ApellidoPaterno: string;
  ApellidoMaterno: string;
  Curp: string;
  Foto: string;
  FechaNacimiento: Date;
}

export interface SelectAlumno {
  AlumnoId: number;
  Nombre: string;
}

