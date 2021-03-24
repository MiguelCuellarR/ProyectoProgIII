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
  Ciudades, Paises
} from '../models';
import {PaisesRepository} from '../repositories';

export class PaisesCiudadesController {
  constructor(
    @repository(PaisesRepository) protected paisesRepository: PaisesRepository,
  ) { }

  @get('/paises/{id}/ciudades', {
    responses: {
      '200': {
        description: 'Array of Paises has many Ciudades',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Ciudades)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Ciudades>,
  ): Promise<Ciudades[]> {
    return this.paisesRepository.pais_ciudades(id).find(filter);
  }

  @post('/paises/{id}/ciudades', {
    responses: {
      '200': {
        description: 'Paises model instance',
        content: {'application/json': {schema: getModelSchemaRef(Ciudades)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Paises.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Ciudades, {
            title: 'NewCiudadesInPaises',
            exclude: ['id'],
            optional: ['paisId']
          }),
        },
      },
    }) ciudades: Omit<Ciudades, 'id'>,
  ): Promise<Ciudades> {
    return this.paisesRepository.pais_ciudades(id).create(ciudades);
  }

  @patch('/paises/{id}/ciudades', {
    responses: {
      '200': {
        description: 'Paises.Ciudades PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Ciudades, {partial: true}),
        },
      },
    })
    ciudades: Partial<Ciudades>,
    @param.query.object('where', getWhereSchemaFor(Ciudades)) where?: Where<Ciudades>,
  ): Promise<Count> {
    return this.paisesRepository.pais_ciudades(id).patch(ciudades, where);
  }

  @del('/paises/{id}/ciudades', {
    responses: {
      '200': {
        description: 'Paises.Ciudades DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Ciudades)) where?: Where<Ciudades>,
  ): Promise<Count> {
    return this.paisesRepository.pais_ciudades(id).delete(where);
  }
}
