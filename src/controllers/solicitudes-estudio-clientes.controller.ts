import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  SolicitudesEstudio,
  Clientes,
} from '../models';
import {SolicitudesEstudioRepository} from '../repositories';

export class SolicitudesEstudioClientesController {
  constructor(
    @repository(SolicitudesEstudioRepository)
    public solicitudesEstudioRepository: SolicitudesEstudioRepository,
  ) { }

  @get('/solicitudes-estudios/{id}/clientes', {
    responses: {
      '200': {
        description: 'Clientes belonging to SolicitudesEstudio',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Clientes)},
          },
        },
      },
    },
  })
  async getClientes(
    @param.path.string('id') id: typeof SolicitudesEstudio.prototype.id,
  ): Promise<Clientes> {
    return this.solicitudesEstudioRepository.solicitudEstudio_cliente(id);
  }
}
