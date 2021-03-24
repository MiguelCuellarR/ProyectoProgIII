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
  Estados,
} from '../models';
import {SolicitudesEstudioRepository} from '../repositories';

export class SolicitudesEstudioEstadosController {
  constructor(
    @repository(SolicitudesEstudioRepository)
    public solicitudesEstudioRepository: SolicitudesEstudioRepository,
  ) { }

  @get('/solicitudes-estudios/{id}/estados', {
    responses: {
      '200': {
        description: 'Estados belonging to SolicitudesEstudio',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Estados)},
          },
        },
      },
    },
  })
  async getEstados(
    @param.path.string('id') id: typeof SolicitudesEstudio.prototype.id,
  ): Promise<Estados> {
    return this.solicitudesEstudioRepository.solicitudEstudio_estado(id);
  }
}
