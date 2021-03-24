import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody
} from '@loopback/rest';
import {
  Bloques,
  Inmuebles
} from '../models';
import {BloquesRepository} from '../repositories';

export class BloquesInmueblesController {
  constructor(
    @repository(BloquesRepository) protected bloquesRepository: BloquesRepository,
  ) { }

  @get('/bloques/{id}/inmuebles', {
    responses: {
      '200': {
        description: 'Array of Bloques has many Inmuebles',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Inmuebles)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Inmuebles>,
  ): Promise<Inmuebles[]> {
    return this.bloquesRepository.bloque_inmuebles(id).find(filter);
  }

  @post('/bloques/{id}/inmuebles', {
    responses: {
      '200': {
        description: 'Bloques model instance',
        content: {'application/json': {schema: getModelSchemaRef(Inmuebles)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Bloques.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Inmuebles, {
            title: 'NewInmueblesInBloques',
            exclude: ['id'],
            optional: ['bloqueId']
          }),
        },
      },
    }) inmuebles: Omit<Inmuebles, 'id'>,
  ): Promise<Inmuebles> {
    return this.bloquesRepository.bloque_inmuebles(id).create(inmuebles);
  }

  @patch('/bloques/{id}/inmuebles', {
    responses: {
      '200': {
        description: 'Bloques.Inmuebles PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Inmuebles, {partial: true}),
        },
      },
    })
    inmuebles: Partial<Inmuebles>,
    @param.query.object('where', getWhereSchemaFor(Inmuebles)) where?: Where<Inmuebles>,
  ): Promise<Count> {
    return this.bloquesRepository.bloque_inmuebles(id).patch(inmuebles, where);
  }

  @del('/bloques/{id}/inmuebles', {
    responses: {
      '200': {
        description: 'Bloques.Inmuebles DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Inmuebles)) where?: Where<Inmuebles>,
  ): Promise<Count> {
    return this.bloquesRepository.bloque_inmuebles(id).delete(where);
  }
}
