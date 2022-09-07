export interface Alumno {
  idAlumno: number;
  idInscripcion: number;
  numeroControl: string;
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  curp: string;
  sexo: string;
  foto: string;
  fechaNacimiento: Date;
}

export interface SelectAlumno {
  idAlumno: number;
  nombre: string;
}

