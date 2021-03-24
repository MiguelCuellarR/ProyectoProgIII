import {
  repository
} from '@loopback/repository';
import {
  get,
  getModelSchemaRef, param
} from '@loopback/rest';
import {
  Ciudades,
  Paises
} from '../models';
import {CiudadesRepository} from '../repositories';

export class CiudadesPaisesController {
  constructor(
    @repository(CiudadesRepository)
    public ciudadesRepository: CiudadesRepository,
  ) { }

  @get('/ciudades/{id}/paises', {
    responses: {
      '200': {
        description: 'Paises belonging to Ciudades',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Paises)},
          },
        },
      },
    },
  })
  async getPaises(
    @param.path.string('id') id: typeof Ciudades.prototype.id,
  ): Promise<Paises> {
    return this.ciudadesRepository.ciudad_pais(id);
  }
}
