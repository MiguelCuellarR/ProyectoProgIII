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
  Usuarios,
} from '../models';
import {SolicitudesEstudioRepository} from '../repositories';

export class SolicitudesEstudioUsuariosController {
  constructor(
    @repository(SolicitudesEstudioRepository)
    public solicitudesEstudioRepository: SolicitudesEstudioRepository,
  ) { }

  @get('/solicitudes-estudios/{id}/usuarios', {
    responses: {
      '200': {
        description: 'Usuarios belonging to SolicitudesEstudio',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Usuarios)},
          },
        },
      },
    },
  })
  async getUsuarios(
    @param.path.string('id') id: typeof SolicitudesEstudio.prototype.id,
  ): Promise<Usuarios> {
    return this.solicitudesEstudioRepository.solicitudEstudio_usuario(id);
  }
}
