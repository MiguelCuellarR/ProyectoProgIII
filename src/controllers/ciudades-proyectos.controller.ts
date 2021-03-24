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
  Ciudades,
  Proyectos
} from '../models';
import {CiudadesRepository} from '../repositories';

export class CiudadesProyectosController {
  constructor(
    @repository(CiudadesRepository) protected ciudadesRepository: CiudadesRepository,
  ) { }

  @get('/ciudades/{id}/proyectos', {
    responses: {
      '200': {
        description: 'Array of Ciudades has many Proyectos',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Proyectos)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Proyectos>,
  ): Promise<Proyectos[]> {
    return this.ciudadesRepository.ciudad_proyectos(id).find(filter);
  }

  @post('/ciudades/{id}/proyectos', {
    responses: {
      '200': {
        description: 'Ciudades model instance',
        content: {'application/json': {schema: getModelSchemaRef(Proyectos)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Ciudades.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Proyectos, {
            title: 'NewProyectosInCiudades',
            exclude: ['id'],
            optional: ['ciudadId']
          }),
        },
      },
    }) proyectos: Omit<Proyectos, 'id'>,
  ): Promise<Proyectos> {
    return this.ciudadesRepository.ciudad_proyectos(id).create(proyectos);
  }

  @patch('/ciudades/{id}/proyectos', {
    responses: {
      '200': {
        description: 'Ciudades.Proyectos PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Proyectos, {partial: true}),
        },
      },
    })
    proyectos: Partial<Proyectos>,
    @param.query.object('where', getWhereSchemaFor(Proyectos)) where?: Where<Proyectos>,
  ): Promise<Count> {
    return this.ciudadesRepository.ciudad_proyectos(id).patch(proyectos, where);
  }

  @del('/ciudades/{id}/proyectos', {
    responses: {
      '200': {
        description: 'Ciudades.Proyectos DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Proyectos)) where?: Where<Proyectos>,
  ): Promise<Count> {
    return this.ciudadesRepository.ciudad_proyectos(id).delete(where);
  }
}
