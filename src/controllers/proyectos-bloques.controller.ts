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
  Bloques, Proyectos
} from '../models';
import {ProyectosRepository} from '../repositories';

export class ProyectosBloquesController {
  constructor(
    @repository(ProyectosRepository) protected proyectosRepository: ProyectosRepository,
  ) { }

  @get('/proyectos/{id}/bloques', {
    responses: {
      '200': {
        description: 'Array of Proyectos has many Bloques',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Bloques)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Bloques>,
  ): Promise<Bloques[]> {
    return this.proyectosRepository.proyecto_bloques(id).find(filter);
  }

  @post('/proyectos/{id}/bloques', {
    responses: {
      '200': {
        description: 'Proyectos model instance',
        content: {'application/json': {schema: getModelSchemaRef(Bloques)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Proyectos.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Bloques, {
            title: 'NewBloquesInProyectos',
            exclude: ['id'],
            optional: ['proyectoId']
          }),
        },
      },
    }) bloques: Omit<Bloques, 'id'>,
  ): Promise<Bloques> {
    return this.proyectosRepository.proyecto_bloques(id).create(bloques);
  }

  @patch('/proyectos/{id}/bloques', {
    responses: {
      '200': {
        description: 'Proyectos.Bloques PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Bloques, {partial: true}),
        },
      },
    })
    bloques: Partial<Bloques>,
    @param.query.object('where', getWhereSchemaFor(Bloques)) where?: Where<Bloques>,
  ): Promise<Count> {
    return this.proyectosRepository.proyecto_bloques(id).patch(bloques, where);
  }

  @del('/proyectos/{id}/bloques', {
    responses: {
      '200': {
        description: 'Proyectos.Bloques DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Bloques)) where?: Where<Bloques>,
  ): Promise<Count> {
    return this.proyectosRepository.proyecto_bloques(id).delete(where);
  }
}
