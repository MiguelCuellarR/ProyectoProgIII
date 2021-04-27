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
import {Bloques} from '../models';
import {BloquesRepository, ProyectosRepository} from '../repositories';

@authenticate('administrador')
export class BloquesController {
  constructor(
    @repository(BloquesRepository)
    public bloquesRepository: BloquesRepository,
    @repository(ProyectosRepository)
    public proyectosRepository: ProyectosRepository,
  ) { }

  @post('/bloques')
  @response(200, {
    description: 'Bloques model instance',
    content: {'application/json': {schema: getModelSchemaRef(Bloques)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Bloques, {
            title: 'NewBloques',
            exclude: ['id'],
          }),
        },
      },
    })
    bloques: Omit<Bloques, 'id'>,
  ): Promise<Bloques> {
    let bloqueCreado = await this.bloquesRepository.create(bloques);
    if (bloqueCreado){
      let proyecto = await this.proyectosRepository.findOne({where: {id: bloqueCreado.proyectoId}})
      if (!proyecto){
        this.bloquesRepository.delete(bloqueCreado);
        throw new HttpErrors[401]("Este proyecto no existe");
      }
    }
    return bloqueCreado;
  }

  @get('/bloques/count')
  @response(200, {
    description: 'Bloques model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Bloques) where?: Where<Bloques>,
  ): Promise<Count> {
    return this.bloquesRepository.count(where);
  }

  @authenticate.skip()
  @get('/bloques')
  @response(200, {
    description: 'Array of Bloques model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Bloques, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Bloques) filter?: Filter<Bloques>,
  ): Promise<Bloques[]> {
    return this.bloquesRepository.find(filter);
  }

  @patch('/bloques')
  @response(200, {
    description: 'Bloques PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Bloques, {partial: true}),
        },
      },
    })
    bloques: Bloques,
    @param.where(Bloques) where?: Where<Bloques>,
  ): Promise<Count> {
    return this.bloquesRepository.updateAll(bloques, where);
  }

  @authenticate.skip()
  @get('/bloques/{id}')
  @response(200, {
    description: 'Bloques model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Bloques, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Bloques, {exclude: 'where'}) filter?: FilterExcludingWhere<Bloques>
  ): Promise<Bloques> {
    return this.bloquesRepository.findById(id, filter);
  }

  @patch('/bloques/{id}')
  @response(204, {
    description: 'Bloques PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Bloques, {partial: true}),
        },
      },
    })
    bloques: Bloques,
  ): Promise<void> {
    await this.bloquesRepository.updateById(id, bloques);
  }

  @put('/bloques/{id}')
  @response(204, {
    description: 'Bloques PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() bloques: Bloques,
  ): Promise<void> {
    await this.bloquesRepository.replaceById(id, bloques);
  }

  @del('/bloques/{id}')
  @response(204, {
    description: 'Bloques DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.bloquesRepository.deleteById(id);
  }
}
