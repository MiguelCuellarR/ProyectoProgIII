import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Pago,
  SolicitudesEstudio,
} from '../models';
import {PagoRepository} from '../repositories';

export class PagoSolicitudesEstudioController {
  constructor(
    @repository(PagoRepository)
    public pagoRepository: PagoRepository,
  ) { }

  @get('/pagos/{id}/solicitudes-estudio', {
    responses: {
      '200': {
        description: 'SolicitudesEstudio belonging to Pago',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(SolicitudesEstudio)},
          },
        },
      },
    },
  })
  async getSolicitudesEstudio(
    @param.path.string('id') id: typeof Pago.prototype.id,
  ): Promise<SolicitudesEstudio> {
    return this.pagoRepository.pago_solicitudEstudio(id);
  }
}
