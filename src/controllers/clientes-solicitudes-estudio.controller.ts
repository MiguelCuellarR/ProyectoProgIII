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
  Clientes,
  SolicitudesEstudio,
} from '../models';
import {ClientesRepository} from '../repositories';

export class ClientesSolicitudesEstudioController {
  constructor(
    @repository(ClientesRepository) protected clientesRepository: ClientesRepository,
  ) { }

  @get('/clientes/{id}/solicitudes-estudios', {
    responses: {
      '200': {
        description: 'Array of Clientes has many SolicitudesEstudio',
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
    return this.clientesRepository.cliente_solicitudesEstudio(id).find(filter);
  }

  @post('/clientes/{id}/solicitudes-estudios', {
    responses: {
      '200': {
        description: 'Clientes model instance',
        content: {'application/json': {schema: getModelSchemaRef(SolicitudesEstudio)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Clientes.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SolicitudesEstudio, {
            title: 'NewSolicitudesEstudioInClientes',
            exclude: ['id'],
            optional: ['clienteId']
          }),
        },
      },
    }) solicitudesEstudio: Omit<SolicitudesEstudio, 'id'>,
  ): Promise<SolicitudesEstudio> {
    return this.clientesRepository.cliente_solicitudesEstudio(id).create(solicitudesEstudio);
  }

  @patch('/clientes/{id}/solicitudes-estudios', {
    responses: {
      '200': {
        description: 'Clientes.SolicitudesEstudio PATCH success count',
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
    return this.clientesRepository.cliente_solicitudesEstudio(id).patch(solicitudesEstudio, where);
  }

  @del('/clientes/{id}/solicitudes-estudios', {
    responses: {
      '200': {
        description: 'Clientes.SolicitudesEstudio DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(SolicitudesEstudio)) where?: Where<SolicitudesEstudio>,
  ): Promise<Count> {
    return this.clientesRepository.cliente_solicitudesEstudio(id).delete(where);
  }
}
