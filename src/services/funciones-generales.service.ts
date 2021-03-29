import { /* inject, */ BindingScope, injectable} from '@loopback/core';
const generator = require('generate-password');
const cryptoJS = require('crypto-js')

@injectable({scope: BindingScope.TRANSIENT})
export class FuncionesGeneralesService {
  constructor(/* Add @inject to inject parameters */) { }

  GenerarClaveAleatoria(): string {
    let contrasena = generator.generate({
      length: 12,
      numbers: true,
      uppercase: true,
      lowercase: true,
      symbol: false
    });
    return contrasena;
  }

  CifrarTexto(texto: string): string {
    let textoCifrado = cryptoJS.MD5(texto).toString();
    return textoCifrado;
  }


}
