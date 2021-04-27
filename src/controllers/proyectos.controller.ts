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
import {Proyectos} from '../models';
import {CiudadesRepository, ProyectosRepository} from '../repositories';

@authenticate('administrador')
export class ProyectosController {
  constructor(
    @repository(ProyectosRepository)
    public proyectosRepository: ProyectosRepository,
    @repository(CiudadesRepository)
    public ciudadesRepository: CiudadesRepository,
  ) { }

  @post('/proyectos')
  @response(200, {
    description: 'Proyectos model instance',
    content: {'application/json': {schema: getModelSchemaRef(Proyectos)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Proyectos, {
            title: 'NewProyectos',
            exclude: ['id'],
          }),
        },
      },
    })
    proyectos: Omit<Proyectos, 'id'>,
  ): Promise<Proyectos> {
    let proyectoCreado = await this.proyectosRepository.create(proyectos);
    if (proyectoCreado){
      let ciudad = await this.ciudadesRepository.findOne({where: {id: proyectoCreado.ciudadId}});
      if (!ciudad){
        this.proyectosRepository.delete(proyectoCreado);
        throw new HttpErrors[401]("Esta ciudad no existe");
      }
    }
    return proyectoCreado;
  }

  @get('/proyectos/count')
  @response(200, {
    description: 'Proyectos model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Proyectos) where?: Where<Proyectos>,
  ): Promise<Count> {
    return this.proyectosRepository.count(where);
  }

  @authenticate.skip()
  @get('/proyectos')
  @response(200, {
    description: 'Array of Proyectos model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Proyectos, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Proyectos) filter?: Filter<Proyectos>,
  ): Promise<Proyectos[]> {
    return this.proyectosRepository.find(filter);
  }

  @patch('/proyectos')
  @response(200, {
    description: 'Proyectos PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Proyectos, {partial: true}),
        },
      },
    })
    proyectos: Proyectos,
    @param.where(Proyectos) where?: Where<Proyectos>,
  ): Promise<Count> {
    return this.proyectosRepository.updateAll(proyectos, where);
  }

  @authenticate.skip()
  @get('/proyectos/{id}')
  @response(200, {
    description: 'Proyectos model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Proyectos, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Proyectos, {exclude: 'where'}) filter?: FilterExcludingWhere<Proyectos>
  ): Promise<Proyectos> {
    return this.proyectosRepository.findById(id, filter);
  }

  @patch('/proyectos/{id}')
  @response(204, {
    description: 'Proyectos PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Proyectos, {partial: true}),
        },
      },
    })
    proyectos: Proyectos,
  ): Promise<void> {
    await this.proyectosRepository.updateById(id, proyectos);
  }

  @put('/proyectos/{id}')
  @response(204, {
    description: 'Proyectos PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() proyectos: Proyectos,
  ): Promise<void> {
    await this.proyectosRepository.replaceById(id, proyectos);
  }

  @del('/proyectos/{id}')
  @response(204, {
    description: 'Proyectos DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.proyectosRepository.deleteById(id);
  }
}
