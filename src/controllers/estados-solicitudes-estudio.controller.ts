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
  response,
} from '@loopback/rest';
import {
  Estados,
  SolicitudesEstudio,
} from '../models';
import {EstadosRepository} from '../repositories';

export class EstadosSolicitudesEstudioController {
  constructor(
    @repository(EstadosRepository)
    protected estadosRepository: EstadosRepository,
  ) { }

  @get('/estados')
  @response(200, {
    description: 'Array of Estados model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Estados, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Estados) filter?: Filter<Estados>,
  ): Promise<Estados[]> {
    return this.estadosRepository.find(filter);
  }

  @get('/estados/{id}/solicitudes-estudios', {
    responses: {
      '200': {
        description: 'Array of Estados has many SolicitudesEstudio',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(SolicitudesEstudio)},
          },
        },
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<SolicitudesEstudio>,
  ): Promise<SolicitudesEstudio[]> {
    return this.estadosRepository.estado_solicitudesEstudio(id).find(filter);
  }

  @post('/estados/{id}/solicitudes-estudios', {
    responses: {
      '200': {
        description: 'Estados model instance',
        content: {'application/json': {schema: getModelSchemaRef(SolicitudesEstudio)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Estados.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SolicitudesEstudio, {
            title: 'NewSolicitudesEstudioInEstados',
            exclude: ['id'],
            optional: ['estadoId']
          }),
        },
      },
    }) solicitudesEstudio: Omit<SolicitudesEstudio, 'id'>,
  ): Promise<SolicitudesEstudio> {
    return this.estadosRepository.estado_solicitudesEstudio(id).create(solicitudesEstudio);
  }

  @patch('/estados/{id}/solicitudes-estudios', {
    responses: {
      '200': {
        description: 'Estados.SolicitudesEstudio PATCH success count',
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
    return this.estadosRepository.estado_solicitudesEstudio(id).patch(solicitudesEstudio, where);
  }

  @del('/estados/{id}/solicitudes-estudios', {
    responses: {
      '200': {
        description: 'Estados.SolicitudesEstudio DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(SolicitudesEstudio)) where?: Where<SolicitudesEstudio>,
  ): Promise<Count> {
    return this.estadosRepository.estado_solicitudesEstudio(id).delete(where);
  }
}
