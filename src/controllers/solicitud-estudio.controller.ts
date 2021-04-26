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
  getModelSchemaRef, param,


  patch, post,




  put,

  requestBody,
  response
} from '@loopback/rest';
import {SolicitudesEstudio} from '../models';
import {SolicitudesEstudioRepository} from '../repositories';



@authenticate('vendedor')
export class SolicitudEstudioController {
  constructor(
    @repository(SolicitudesEstudioRepository)
    public solicitudesEstudioRepository: SolicitudesEstudioRepository,
  ) { }

  @post('/solicitudes-estudios')
  @response(200, {
    description: 'SolicitudesEstudio model instance',
    content: {'application/json': {schema: getModelSchemaRef(SolicitudesEstudio)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SolicitudesEstudio, {
            title: 'NewSolicitudesEstudio',
            exclude: ['id'],
          }),
        },
      },
    })
    solicitudesEstudio: Omit<SolicitudesEstudio, 'id'>,
  ): Promise<SolicitudesEstudio> {


    return this.solicitudesEstudioRepository.create(solicitudesEstudio);
  }

  @get('/solicitudes-estudios/count')
  @response(200, {
    description: 'SolicitudesEstudio model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(SolicitudesEstudio) where?: Where<SolicitudesEstudio>,
  ): Promise<Count> {
    return this.solicitudesEstudioRepository.count(where);
  }

  @get('/solicitudes-estudios')
  @response(200, {
    description: 'Array of SolicitudesEstudio model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(SolicitudesEstudio, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(SolicitudesEstudio) filter?: Filter<SolicitudesEstudio>,
  ): Promise<SolicitudesEstudio[]> {
    return this.solicitudesEstudioRepository.find(filter);
  }

  @patch('/solicitudes-estudios')
  @response(200, {
    description: 'SolicitudesEstudio PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SolicitudesEstudio, {partial: true}),
        },
      },
    })
    solicitudesEstudio: SolicitudesEstudio,
    @param.where(SolicitudesEstudio) where?: Where<SolicitudesEstudio>,
  ): Promise<Count> {
    return this.solicitudesEstudioRepository.updateAll(solicitudesEstudio, where);
  }

  @get('/solicitudes-estudios/{id}')
  @response(200, {
    description: 'SolicitudesEstudio model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(SolicitudesEstudio, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(SolicitudesEstudio, {exclude: 'where'}) filter?: FilterExcludingWhere<SolicitudesEstudio>
  ): Promise<SolicitudesEstudio> {
    return this.solicitudesEstudioRepository.findById(id, filter);
  }

  @patch('/solicitudes-estudios/{id}')
  @response(204, {
    description: 'SolicitudesEstudio PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(SolicitudesEstudio, {partial: true}),
        },
      },
    })
    solicitudesEstudio: SolicitudesEstudio,
  ): Promise<void> {
    await this.solicitudesEstudioRepository.updateById(id, solicitudesEstudio);
  }

  @put('/solicitudes-estudios/{id}')
  @response(204, {
    description: 'SolicitudesEstudio PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() solicitudesEstudio: SolicitudesEstudio,
  ): Promise<void> {
    await this.solicitudesEstudioRepository.replaceById(id, solicitudesEstudio);
  }

  @del('/solicitudes-estudios/{id}')
  @response(204, {
    description: 'SolicitudesEstudio DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.solicitudesEstudioRepository.deleteById(id);
  }
}
