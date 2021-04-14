import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {keys as llaves} from '../config/keys';
import {Usuarios} from '../models';
const jwt = require('jsonwebtoken');

@injectable({scope: BindingScope.TRANSIENT})
export class SesionService {
  constructor(/* Add @inject to inject parameters */) { }

  /*
   * Generacion del token JWT
   */
  GenerarToken(usuario: Usuarios): string {
    let tk =
      jwt.sign({
        exp: llaves.tiempoVencimientoToken,
        data: {
          username: usuario.correo_electronico,
          role: usuario.rolUsuarioId
        }
      }, llaves.claveSecretaJWT);
    return tk;
  }

  VerificarTokenJWT(token: string) {
    try {
      const decoded = jwt.verify(token, llaves.claveSecretaJWT);
      return decoded;
    } catch {
      return null;
    }
  }

}
