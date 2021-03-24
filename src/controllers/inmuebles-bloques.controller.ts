import {
  repository
} from '@loopback/repository';
import {
  get,
  getModelSchemaRef, param
} from '@loopback/rest';
import {
  Bloques, Inmuebles
} from '../models';
import {InmueblesRepository} from '../repositories';

export class InmueblesBloquesController {
  constructor(
    @repository(InmueblesRepository)
    public inmueblesRepository: InmueblesRepository,
  ) { }

  @get('/inmuebles/{id}/bloques', {
    responses: {
      '200': {
        description: 'Bloques belonging to Inmuebles',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Bloques)},
          },
        },
      },
    },
  })
  async getBloques(
    @param.path.string('id') id: typeof Inmuebles.prototype.id,
  ): Promise<Bloques> {
    return this.inmueblesRepository.inmueble_bloque(id);
  }
}
