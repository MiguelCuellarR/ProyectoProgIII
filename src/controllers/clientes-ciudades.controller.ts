import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Clientes,
  Ciudades,
} from '../models';
import {ClientesRepository} from '../repositories';

export class ClientesCiudadesController {
  constructor(
    @repository(ClientesRepository)
    public clientesRepository: ClientesRepository,
  ) { }

  @get('/clientes/{id}/ciudades', {
    responses: {
      '200': {
        description: 'Ciudades belonging to Clientes',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Ciudades)},
          },
        },
      },
    },
  })
  async getCiudades(
    @param.path.string('id') id: typeof Clientes.prototype.id,
  ): Promise<Ciudades> {
    return this.clientesRepository.cliente_ciudad(id);
  }
}
