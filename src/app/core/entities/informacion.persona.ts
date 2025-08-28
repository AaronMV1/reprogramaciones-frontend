

export interface InformacionPersona {
  status_code: string;
  status: string;
  description: string;
  result: InformacionPersonaResult;
}


export interface InformacionPersonaResult {
  resultado: string;
  emplID: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  nombre: string;
  sexo: string;
  nacionalidadId: string;
  nacionalidadIdTipo: string;
  nacionalidadTipo: string;
  correo: string;
  fechaNacimiento: string;
  estadoCivil: string;
  detalleInformacionAcademica: InformacionPersonaAcademica[];
}


export interface InformacionPersonaAcademica {
  campus: string;
  descCampus: string;
  institucion: string;
  gradoAcademico: string;
  descGradoAcademico: string;
  carrera: string;
  descCarrera: string;
  cicloLectivo: string;
  cicloIngreso: string;
  estadoPrograma: string;
  numeroGradoPrograma: string;
  cicloAcademico: string;
  stdntCarNbr: string;
  motAccion: string;
  desProgramaAct: string;
  desMotAct: string;
  strm: string;
  desStrm: string;
  desAcadTerm: string;
  cicloNivel: string;
  ultimoCicloNivel: string;
  ultimoCicloNivelDescripcion: string;
  esIngresante: string;
  esMatriculado: string;
}
