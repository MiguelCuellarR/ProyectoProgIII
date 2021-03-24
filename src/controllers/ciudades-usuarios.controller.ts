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
  Usuarios,
} from '../models';
import {CiudadesRepository} from '../repositories';

export class CiudadesUsuariosController {
  constructor(
    @repository(CiudadesRepository) protected ciudadesRepository: CiudadesRepository,
  ) { }

  @get('/ciudades/{id}/usuarios', {
    responses: {
      '200': {
        description: 'Array of Ciudades has many Usuarios',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Usuarios)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Usuarios>,
  ): Promise<Usuarios[]> {
    return this.ciudadesRepository.ciudad_usuarios(id).find(filter);
  }

  @post('/ciudades/{id}/usuarios', {
    responses: {
      '200': {
        description: 'Ciudades model instance',
        content: {'application/json': {schema: getModelSchemaRef(Usuarios)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Ciudades.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuarios, {
            title: 'NewUsuariosInCiudades',
            exclude: ['id'],
            optional: ['ciudadId']
          }),
        },
      },
    }) usuarios: Omit<Usuarios, 'id'>,
  ): Promise<Usuarios> {
    return this.ciudadesRepository.ciudad_usuarios(id).create(usuarios);
  }

  @patch('/ciudades/{id}/usuarios', {
    responses: {
      '200': {
        description: 'Ciudades.Usuarios PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuarios, {partial: true}),
        },
      },
    })
    usuarios: Partial<Usuarios>,
    @param.query.object('where', getWhereSchemaFor(Usuarios)) where?: Where<Usuarios>,
  ): Promise<Count> {
    return this.ciudadesRepository.ciudad_usuarios(id).patch(usuarios, where);
  }

  @del('/ciudades/{id}/usuarios', {
    responses: {
      '200': {
        description: 'Ciudades.Usuarios DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Usuarios)) where?: Where<Usuarios>,
  ): Promise<Count> {
    return this.ciudadesRepository.ciudad_usuarios(id).delete(where);
  }
}
