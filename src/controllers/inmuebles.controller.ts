import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Inmuebles} from '../models';
import {InmueblesRepository} from '../repositories';

export class InmueblesController {
  constructor(
    @repository(InmueblesRepository)
    public inmueblesRepository : InmueblesRepository,
  ) {}

  @post('/inmuebles')
  @response(200, {
    description: 'Inmuebles model instance',
    content: {'application/json': {schema: getModelSchemaRef(Inmuebles)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Inmuebles, {
            title: 'NewInmuebles',
            exclude: ['id'],
          }),
        },
      },
    })
    inmuebles: Omit<Inmuebles, 'id'>,
  ): Promise<Inmuebles> {
    return this.inmueblesRepository.create(inmuebles);
  }

  @get('/inmuebles/count')
  @response(200, {
    description: 'Inmuebles model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Inmuebles) where?: Where<Inmuebles>,
  ): Promise<Count> {
    return this.inmueblesRepository.count(where);
  }

  @get('/inmuebles')
  @response(200, {
    description: 'Array of Inmuebles model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Inmuebles, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Inmuebles) filter?: Filter<Inmuebles>,
  ): Promise<Inmuebles[]> {
    return this.inmueblesRepository.find(filter);
  }

  @patch('/inmuebles')
  @response(200, {
    description: 'Inmuebles PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Inmuebles, {partial: true}),
        },
      },
    })
    inmuebles: Inmuebles,
    @param.where(Inmuebles) where?: Where<Inmuebles>,
  ): Promise<Count> {
    return this.inmueblesRepository.updateAll(inmuebles, where);
  }

  @get('/inmuebles/{id}')
  @response(200, {
    description: 'Inmuebles model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Inmuebles, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Inmuebles, {exclude: 'where'}) filter?: FilterExcludingWhere<Inmuebles>
  ): Promise<Inmuebles> {
    return this.inmueblesRepository.findById(id, filter);
  }

  @patch('/inmuebles/{id}')
  @response(204, {
    description: 'Inmuebles PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Inmuebles, {partial: true}),
        },
      },
    })
    inmuebles: Inmuebles,
  ): Promise<void> {
    await this.inmueblesRepository.updateById(id, inmuebles);
  }

  @put('/inmuebles/{id}')
  @response(204, {
    description: 'Inmuebles PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() inmuebles: Inmuebles,
  ): Promise<void> {
    await this.inmueblesRepository.replaceById(id, inmuebles);
  }

  @del('/inmuebles/{id}')
  @response(204, {
    description: 'Inmuebles DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.inmueblesRepository.deleteById(id);
  }
}
