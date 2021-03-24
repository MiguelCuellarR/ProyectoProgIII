import {
  repository
} from '@loopback/repository';
import {
  get,
  getModelSchemaRef, param
} from '@loopback/rest';
import {
  Bloques,
  Proyectos
} from '../models';
import {BloquesRepository} from '../repositories';

export class BloquesProyectosController {
  constructor(
    @repository(BloquesRepository)
    public bloquesRepository: BloquesRepository,
  ) { }

  @get('/bloques/{id}/proyectos', {
    responses: {
      '200': {
        description: 'Proyectos belonging to Bloques',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Proyectos)},
          },
        },
      },
    },
  })
  async getProyectos(
    @param.path.string('id') id: typeof Bloques.prototype.id,
  ): Promise<Proyectos> {
    return this.bloquesRepository.bloque_proyecto(id);
  }
}
