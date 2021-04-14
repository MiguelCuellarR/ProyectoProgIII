import {inject} from '@loopback/core';
import {
  HttpErrors,
  post,
  Request,
  requestBody,
  Response,
  RestBindings
} from '@loopback/rest';
import multer from 'multer';
import path from 'path';
import {keys as llaves} from '../config/keys';

export class CargaArchivoController {
  constructor(
  ) { }



  /**
   *
   * @param response
   * @param request
   */
  @post('/CargarImagenCliente', {
    responses: {
      200: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
            },
          },
        },
        description: 'Función de carga de la imagen del cliente.',
      },
    },
  })
  async clientcargarImagenDelCliente(
    @inject(RestBindings.Http.RESPONSE) response: Response,
    @requestBody.file() request: Request,
  ): Promise<object | false> {
    const rutaImagenCliente = path.join(__dirname, llaves.carpetaImagenClientes);
    let res = await this.StoreFileToPath(rutaImagenCliente, llaves.campoImagenCliente, request, response, llaves.extensionesPermitidasIMG);
    if (res) {
      const nombre_archivo = response.req?.file.filename;
      if (nombre_archivo) {
        return {filename: nombre_archivo};
      }
    }
    return res;
  }


  @post('/CargarImagenProyecto', {
    responses: {
      200: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
            },
          },
        },
        description: 'Función de carga de la imagen del Proyecto.',
      },
    },
  })
  async proyectocargarImagenDelProyecto(
    @inject(RestBindings.Http.RESPONSE) response: Response,
    @requestBody.file() request: Request,
  ): Promise<object | false> {
    const rutaImagenProyecto = path.join(__dirname, llaves.carpetaImagenProyecto);
    let res = await this.StoreFileToPath(rutaImagenProyecto, llaves.campoImagenProyecto, request, response, llaves.extensionesPermitidasIMG);
    if (res) {
      const nombre_archivo = response.req?.file.filename;
      if (nombre_archivo) {
        return {filename: nombre_archivo};
      }
    }
    return res;
  }



  @post('/CargarComprobantePago', {
    responses: {
      200: {
        content: {
          'application/json': {
            schema: {
              type: 'object',
            },
          },
        },
        description: 'Función de carga de comprobantes de pago',
      },
    },
  })
  async DocumentosPersona(
    @inject(RestBindings.Http.RESPONSE) response: Response,
    @requestBody.file() request: Request,
  ): Promise<object | false> {
    const rutaComprobantesPago = path.join(__dirname, llaves.carpetaComprobantesPago);
    let res = await this.StoreFileToPath(rutaComprobantesPago, llaves.campoComprobantesPagos, request, response, llaves.extensionesPermitidasDOC);
    if (res) {
      const nombre_archivo = response.req?.file.filename;
      if (nombre_archivo) {
        return {filename: nombre_archivo};
      }
    }
    return res;
  }



  /**
   *
   * @param response
   * @param request
   */


  /**
   * Return a config for multer storage
   * @param path
   */
  private GetMulterStorageConfig(path: string) {
    var filename: string = '';
    const storage = multer.diskStorage({
      destination: function (req: any, file: any, cb: any) {
        cb(null, path)
      },
      filename: function (req: any, file: any, cb: any) {
        filename = `${Date.now()}-${file.originalname}`
        cb(null, filename);
      }
    });
    return storage;
  }

  /**
   * store the file in a specific path
   * @param storePath
   * @param request
   * @param response
   */
  private StoreFileToPath(storePath: string, fieldname: string, request: Request, response: Response, acceptedExt: string[]): Promise<object> {
    return new Promise<object>((resolve, reject) => {
      const storage = this.GetMulterStorageConfig(storePath);
      const upload = multer({
        storage: storage,
        fileFilter: function (req: any, file: any, callback: any) {
          var ext = path.extname(file.originalname).toUpperCase();
          if (acceptedExt.includes(ext)) {
            return callback(null, true);
          }
          return callback(new HttpErrors[400]('El formato del archivo no es permitido.'));
        },
        limits: {
          fileSize: llaves.tamMaxImagenCliente
        }
      },
      ).single(fieldname);
      upload(request, response, (err: any) => {
        if (err) {
          reject(err);
        }
        resolve(response);
      });
    });
  }

}
