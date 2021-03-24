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
  Usuarios,
  SolicitudesEstudio,
} from '../models';
import {UsuariosRepository} from '../repositories';

export class UsuariosSolicitudesEstudioController {
  constructor(
    @repository(UsuariosRepository) protected usuariosRepository: UsuariosRepository,
  ) { }

  @get('/usuarios/{id}/solicitudes-estudios', {
    responses: {
      '200': {
        description: 'Array of Usuarios has many SolicitudesEstudio',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(SolicitudesEstudio)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<SolicitudesEstudio>,
  ): Promise<SolicitudesEstudio[]> {
    return this.usuariosRepository.usuario_solicitudesEstudio(id).find(filter);
  }

  @post('/usuarios/{id}/solicitudes-estudios', {
    responses: {
      '200': {
        description: 'Usuarios model instance',
        content: {'application/json': {schema: getModelSchemaRef(SolicitudesEstudio)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Usuarios.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SolicitudesEstudio, {
            title: 'NewSolicitudesEstudioInUsuarios',
            exclude: ['id'],
            optional: ['usuarioId']
          }),
        },
      },
    }) solicitudesEstudio: Omit<SolicitudesEstudio, 'id'>,
  ): Promise<SolicitudesEstudio> {
    return this.usuariosRepository.usuario_solicitudesEstudio(id).create(solicitudesEstudio);
  }

  @patch('/usuarios/{id}/solicitudes-estudios', {
    responses: {
      '200': {
        description: 'Usuarios.SolicitudesEstudio PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SolicitudesEstudio, {partial: true}),
        },
      },
    })
    solicitudesEstudio: Partial<SolicitudesEstudio>,
    @param.query.object('where', getWhereSchemaFor(SolicitudesEstudio)) where?: Where<SolicitudesEstudio>,
  ): Promise<Count> {
    return this.usuariosRepository.usuario_solicitudesEstudio(id).patch(solicitudesEstudio, where);
  }

  @del('/usuarios/{id}/solicitudes-estudios', {
    responses: {
      '200': {
        description: 'Usuarios.SolicitudesEstudio DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(SolicitudesEstudio)) where?: Where<SolicitudesEstudio>,
  ): Promise<Count> {
    return this.usuariosRepository.usuario_solicitudesEstudio(id).delete(where);
  }
}
