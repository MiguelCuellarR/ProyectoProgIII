export namespace keys {
  export const origenCorreoElectronico = 'jhohan.1701821033@ucaldas.edu.co';
  export const asuntoNuevoUsuario = '[Constructora UdeC S.A.S] Mensaje de bienvenida';
  export const asuntocambioClave = '[Constructora UdeC S.A.S] Cambio de contraseña exitoso';
  export const asuntocambioEstado = '[Constructora UdeC S.A.S] Cambio del estado de la solicitud de estudio';
  export const tiempoVencimientoToken = Math.floor(Date.now() / 1000) + (60 * 60);//un token de una hora de duracion
  export const claveSecretaJWT = 'jwt@proyProg3';
  export const carpetaImagenClientes = '../../archivos/clientes';
  export const carpetaImagenProyecto = '../../archivos/proyectos';
  export const carpetaComprobantesPago = '../../archivos/comprobantesPagos';
  export const campoImagenCliente = 'file';
  export const campoImagenProyecto = 'file';
  export const campoComprobantesPagos = 'file';
  export const extensionesPermitidasIMG: string[] = ['.PNG', '.JPG', '.JPEG', '.SVG'];
  export const extensionesPermitidasDOC: string[] = ['.DOCX', '.PDF', '.DOC', '.XLSX'];
  export const tamMaxImagenCliente = 1024 * 1024;
  export const tamMaxImagenProyecto = 1024 * 1024;
  export const twilioPhone = '+15704059449';
  export const EstadoDefault = '6061f270e5bcc3f6cbc5b19e';
}
