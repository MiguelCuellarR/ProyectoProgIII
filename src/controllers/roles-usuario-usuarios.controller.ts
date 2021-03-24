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
  RolesUsuario,
  Usuarios,
} from '../models';
import {RolesUsuarioRepository} from '../repositories';

export class RolesUsuarioUsuariosController {
  constructor(
    @repository(RolesUsuarioRepository) protected rolesUsuarioRepository: RolesUsuarioRepository,
  ) { }

  @get('/roles-usuarios/{id}/usuarios', {
    responses: {
      '200': {
        description: 'Array of RolesUsuario has many Usuarios',
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
    return this.rolesUsuarioRepository.rolUsuario_usuarios(id).find(filter);
  }

  @post('/roles-usuarios/{id}/usuarios', {
    responses: {
      '200': {
        description: 'RolesUsuario model instance',
        content: {'application/json': {schema: getModelSchemaRef(Usuarios)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof RolesUsuario.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuarios, {
            title: 'NewUsuariosInRolesUsuario',
            exclude: ['id'],
            optional: ['rolUsuarioId']
          }),
        },
      },
    }) usuarios: Omit<Usuarios, 'id'>,
  ): Promise<Usuarios> {
    return this.rolesUsuarioRepository.rolUsuario_usuarios(id).create(usuarios);
  }

  @patch('/roles-usuarios/{id}/usuarios', {
    responses: {
      '200': {
        description: 'RolesUsuario.Usuarios PATCH success count',
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
    return this.rolesUsuarioRepository.rolUsuario_usuarios(id).patch(usuarios, where);
  }

  @del('/roles-usuarios/{id}/usuarios', {
    responses: {
      '200': {
        description: 'RolesUsuario.Usuarios DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Usuarios)) where?: Where<Usuarios>,
  ): Promise<Count> {
    return this.rolesUsuarioRepository.rolUsuario_usuarios(id).delete(where);
  }
}
