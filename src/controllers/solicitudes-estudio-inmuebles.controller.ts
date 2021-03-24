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
  Inmuebles,
} from '../models';
import {SolicitudesEstudioRepository} from '../repositories';

export class SolicitudesEstudioInmueblesController {
  constructor(
    @repository(SolicitudesEstudioRepository)
    public solicitudesEstudioRepository: SolicitudesEstudioRepository,
  ) { }

  @get('/solicitudes-estudios/{id}/inmuebles', {
    responses: {
      '200': {
        description: 'Inmuebles belonging to SolicitudesEstudio',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Inmuebles)},
          },
        },
      },
    },
  })
  async getInmuebles(
    @param.path.string('id') id: typeof SolicitudesEstudio.prototype.id,
  ): Promise<Inmuebles> {
    return this.solicitudesEstudioRepository.solicitudEstudio_inmueble(id);
  }
}
