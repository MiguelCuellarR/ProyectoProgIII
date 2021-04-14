import {AuthenticationStrategy} from '@loopback/authentication';
import {service} from '@loopback/core';
import {HttpErrors, Request} from '@loopback/rest';
import {UserProfile} from '@loopback/security';
import parseBearerToken from 'parse-bearer-token';
import {SesionService} from '../services';

export class VendedorStrategy implements AuthenticationStrategy {
  name: string = 'vendedor';

  constructor(@service(SesionService)
  public servicioSesion: SesionService) {

  }

  async authenticate(request: Request): Promise<UserProfile | undefined> {
    const token = parseBearerToken(request)
    if (!token) {
      throw new HttpErrors[401]("Usted no ha suministrado un token");
    }
    let datos = this.servicioSesion.VerificarTokenJWT(token);
    if (datos) {
      if (datos.data.role == '6061f1d4e5bcc3f6cbc5b19d') {
        let perfil: UserProfile = Object.assign({
          nombre_usuario: datos.data.username,
          rol: datos.data.role
        });
        return perfil;
      } else {
        throw new HttpErrors[401]("Usted no tiene el rol para ejecutar esta accion")
      }
    } else {
      throw new HttpErrors[401]("Usted no tiene un token válido");
    }


  };
}
