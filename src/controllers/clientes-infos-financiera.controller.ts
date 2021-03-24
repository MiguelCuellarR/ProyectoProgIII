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
  InfosFinanciera,
} from '../models';
import {ClientesRepository} from '../repositories';

export class ClientesInfosFinancieraController {
  constructor(
    @repository(ClientesRepository) protected clientesRepository: ClientesRepository,
  ) { }

  @get('/clientes/{id}/infos-financiera', {
    responses: {
      '200': {
        description: 'Clientes has one InfosFinanciera',
        content: {
          'application/json': {
            schema: getModelSchemaRef(InfosFinanciera),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<InfosFinanciera>,
  ): Promise<InfosFinanciera> {
    return this.clientesRepository.Cliente_infoFinanciera(id).get(filter);
  }

  @post('/clientes/{id}/infos-financiera', {
    responses: {
      '200': {
        description: 'Clientes model instance',
        content: {'application/json': {schema: getModelSchemaRef(InfosFinanciera)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Clientes.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(InfosFinanciera, {
            title: 'NewInfosFinancieraInClientes',
            exclude: ['id'],
            optional: ['clienteId']
          }),
        },
      },
    }) infosFinanciera: Omit<InfosFinanciera, 'id'>,
  ): Promise<InfosFinanciera> {
    return this.clientesRepository.Cliente_infoFinanciera(id).create(infosFinanciera);
  }

  @patch('/clientes/{id}/infos-financiera', {
    responses: {
      '200': {
        description: 'Clientes.InfosFinanciera PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(InfosFinanciera, {partial: true}),
        },
      },
    })
    infosFinanciera: Partial<InfosFinanciera>,
    @param.query.object('where', getWhereSchemaFor(InfosFinanciera)) where?: Where<InfosFinanciera>,
  ): Promise<Count> {
    return this.clientesRepository.Cliente_infoFinanciera(id).patch(infosFinanciera, where);
  }

  @del('/clientes/{id}/infos-financiera', {
    responses: {
      '200': {
        description: 'Clientes.InfosFinanciera DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(InfosFinanciera)) where?: Where<InfosFinanciera>,
  ): Promise<Count> {
    return this.clientesRepository.Cliente_infoFinanciera(id).delete(where);
  }
}
