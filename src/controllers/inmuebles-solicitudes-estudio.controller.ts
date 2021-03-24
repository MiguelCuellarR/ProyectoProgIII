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
  Inmuebles,
  SolicitudesEstudio,
} from '../models';
import {InmueblesRepository} from '../repositories';

export class InmueblesSolicitudesEstudioController {
  constructor(
    @repository(InmueblesRepository) protected inmueblesRepository: InmueblesRepository,
  ) { }

  @get('/inmuebles/{id}/solicitudes-estudios', {
    responses: {
      '200': {
        description: 'Array of Inmuebles has many SolicitudesEstudio',
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
    return this.inmueblesRepository.inmueble_solicitudesEstudio(id).find(filter);
  }

  @post('/inmuebles/{id}/solicitudes-estudios', {
    responses: {
      '200': {
        description: 'Inmuebles model instance',
        content: {'application/json': {schema: getModelSchemaRef(SolicitudesEstudio)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Inmuebles.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SolicitudesEstudio, {
            title: 'NewSolicitudesEstudioInInmuebles',
            exclude: ['id'],
            optional: ['inmuebleId']
          }),
        },
      },
    }) solicitudesEstudio: Omit<SolicitudesEstudio, 'id'>,
  ): Promise<SolicitudesEstudio> {
    return this.inmueblesRepository.inmueble_solicitudesEstudio(id).create(solicitudesEstudio);
  }

  @patch('/inmuebles/{id}/solicitudes-estudios', {
    responses: {
      '200': {
        description: 'Inmuebles.SolicitudesEstudio PATCH success count',
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
    return this.inmueblesRepository.inmueble_solicitudesEstudio(id).patch(solicitudesEstudio, where);
  }

  @del('/inmuebles/{id}/solicitudes-estudios', {
    responses: {
      '200': {
        description: 'Inmuebles.SolicitudesEstudio DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(SolicitudesEstudio)) where?: Where<SolicitudesEstudio>,
  ): Promise<Count> {
    return this.inmueblesRepository.inmueble_solicitudesEstudio(id).delete(where);
  }
}
