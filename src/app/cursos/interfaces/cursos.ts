export interface Curso {
  idCurso: number;
  idInscripcion: number;
  descripcion: string;
  fecha_Creacion: Date;
  duracion: number;
  estatus: number;
}

export interface SelectCurso {
  idCurso: number;
  descripcion: string;
}

