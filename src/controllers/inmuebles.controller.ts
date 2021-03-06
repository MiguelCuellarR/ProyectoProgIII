import {authenticate} from '@loopback/authentication';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, HttpErrors, param,


  patch, post,




  put,

  requestBody,
  response
} from '@loopback/rest';
import {Inmuebles} from '../models';
import {BloquesRepository, InmueblesRepository} from '../repositories';

@authenticate('administrador')
export class InmueblesController {
  constructor(
    @repository(InmueblesRepository)
    public inmueblesRepository: InmueblesRepository,
    @repository(BloquesRepository)
    public bloquesRepository: BloquesRepository,
  ) { }

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
    let inmuebleCreado = await this.inmueblesRepository.create(inmuebles);
    if (inmuebleCreado){
      let bloque = await this.bloquesRepository.findOne({where: {id: inmuebleCreado.bloqueId}})
      if (!bloque){
        this.inmueblesRepository.delete(inmuebleCreado);
        throw new HttpErrors[401]("Este inmueble no existe");
      }
    }
    return inmuebleCreado;
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

  @authenticate.skip()
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

  @authenticate.skip()
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
