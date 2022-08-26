export interface Alumno {
  idAlumno: number;
  numeroControl: string;
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  fechaNacimiento: Date;
  curp: string;
  sexo: string;
  direccion: string;
  contacto: string;
  numeroContacto: string;
}

export interface SelectAlumno {
  idAlumno: number;
  nombre: string;
}

