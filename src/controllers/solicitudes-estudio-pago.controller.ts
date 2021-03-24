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
  SolicitudesEstudio,
  Pago,
} from '../models';
import {SolicitudesEstudioRepository} from '../repositories';

export class SolicitudesEstudioPagoController {
  constructor(
    @repository(SolicitudesEstudioRepository) protected solicitudesEstudioRepository: SolicitudesEstudioRepository,
  ) { }

  @get('/solicitudes-estudios/{id}/pagos', {
    responses: {
      '200': {
        description: 'Array of SolicitudesEstudio has many Pago',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Pago)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Pago>,
  ): Promise<Pago[]> {
    return this.solicitudesEstudioRepository.solicitudEstudio_pagos(id).find(filter);
  }

  @post('/solicitudes-estudios/{id}/pagos', {
    responses: {
      '200': {
        description: 'SolicitudesEstudio model instance',
        content: {'application/json': {schema: getModelSchemaRef(Pago)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof SolicitudesEstudio.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pago, {
            title: 'NewPagoInSolicitudesEstudio',
            exclude: ['id'],
            optional: ['solicitudEstudioId']
          }),
        },
      },
    }) pago: Omit<Pago, 'id'>,
  ): Promise<Pago> {
    return this.solicitudesEstudioRepository.solicitudEstudio_pagos(id).create(pago);
  }

  @patch('/solicitudes-estudios/{id}/pagos', {
    responses: {
      '200': {
        description: 'SolicitudesEstudio.Pago PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pago, {partial: true}),
        },
      },
    })
    pago: Partial<Pago>,
    @param.query.object('where', getWhereSchemaFor(Pago)) where?: Where<Pago>,
  ): Promise<Count> {
    return this.solicitudesEstudioRepository.solicitudEstudio_pagos(id).patch(pago, where);
  }

  @del('/solicitudes-estudios/{id}/pagos', {
    responses: {
      '200': {
        description: 'SolicitudesEstudio.Pago DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Pago)) where?: Where<Pago>,
  ): Promise<Count> {
    return this.solicitudesEstudioRepository.solicitudEstudio_pagos(id).delete(where);
  }
}
