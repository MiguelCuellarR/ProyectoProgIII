import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Ciudades,
  Clientes,
} from '../models';
import {CiudadesRepository} from '../repositories';

export class CiudadesClientesController {
  constructor(
    @repository(CiudadesRepository) protected ciudadesRepository: CiudadesRepository,
  ) { }

  @get('/ciudades/{id}/clientes', {
    responses: {
      '200': {
        description: 'Array of Ciudades has many Clientes',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Clientes)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Clientes>,
  ): Promise<Clientes[]> {
    return this.ciudadesRepository.ciudad_clientes(id).find(filter);
  }

  @post('/ciudades/{id}/clientes', {
    responses: {
      '200': {
        description: 'Ciudades model instance',
        content: {'application/json': {schema: getModelSchemaRef(Clientes)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Ciudades.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Clientes, {
            title: 'NewClientesInCiudades',
            exclude: ['id'],
            optional: ['ciudadId']
          }),
        },
      },
    }) clientes: Omit<Clientes, 'id'>,
  ): Promise<Clientes> {
    return this.ciudadesRepository.ciudad_clientes(id).create(clientes);
  }

  @patch('/ciudades/{id}/clientes', {
    responses: {
      '200': {
        description: 'Ciudades.Clientes PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Clientes, {partial: true}),
        },
      },
    })
    clientes: Partial<Clientes>,
    @param.query.object('where', getWhereSchemaFor(Clientes)) where?: Where<Clientes>,
  ): Promise<Count> {
    return this.ciudadesRepository.ciudad_clientes(id).patch(clientes, where);
  }

  @del('/ciudades/{id}/clientes', {
    responses: {
      '200': {
        description: 'Ciudades.Clientes DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Clientes)) where?: Where<Clientes>,
  ): Promise<Count> {
    return this.ciudadesRepository.ciudad_clientes(id).delete(where);
  }
}
