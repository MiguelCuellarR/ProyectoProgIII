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
import {Ciudades} from '../models';
import {CiudadesRepository, PaisesRepository} from '../repositories';

authenticate('administrador')
export class CiudadesController {
  constructor(
    @repository(CiudadesRepository)
    public ciudadesRepository: CiudadesRepository,
    @repository(PaisesRepository)
    public paisesRepository: PaisesRepository,
  ) { }

  @post('/ciudades')
  @response(200, {
    description: 'Ciudades model instance',
    content: {'application/json': {schema: getModelSchemaRef(Ciudades)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Ciudades, {
            title: 'NewCiudades',
            exclude: ['id'],
          }),
        },
      },
    })
    ciudades: Omit<Ciudades, 'id'>,
  ): Promise<Ciudades> {
    let ciudadCreada = await this.ciudadesRepository.create(ciudades);

    let pais = await this.paisesRepository.findOne({where: {id: ciudadCreada.paisId}});

    if (ciudadCreada){
      if (!pais){
        this.ciudadesRepository.delete(ciudadCreada);
        throw new HttpErrors[401]("Este pais no existe");
      } 
    }
    return ciudadCreada;
  }

  @get('/ciudades/count')
  @response(200, {
    description: 'Ciudades model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Ciudades) where?: Where<Ciudades>,
  ): Promise<Count> {
    return this.ciudadesRepository.count(where);
  }

  @authenticate.skip()
  @get('/ciudades')
  @response(200, {
    description: 'Array of Ciudades model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Ciudades, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Ciudades) filter?: Filter<Ciudades>,
  ): Promise<Ciudades[]> {
    return this.ciudadesRepository.find(filter);
  }

  @patch('/ciudades')
  @response(200, {
    description: 'Ciudades PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Ciudades, {partial: true}),
        },
      },
    })
    ciudades: Ciudades,
    @param.where(Ciudades) where?: Where<Ciudades>,
  ): Promise<Count> {
    return this.ciudadesRepository.updateAll(ciudades, where);
  }

  @authenticate.skip()
  @get('/ciudades/{id}')
  @response(200, {
    description: 'Ciudades model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Ciudades, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Ciudades, {exclude: 'where'}) filter?: FilterExcludingWhere<Ciudades>
  ): Promise<Ciudades> {
    return this.ciudadesRepository.findById(id, filter);
  }

  @patch('/ciudades/{id}')
  @response(204, {
    description: 'Ciudades PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Ciudades, {partial: true}),
        },
      },
    })
    ciudades: Ciudades,
  ): Promise<void> {
    await this.ciudadesRepository.updateById(id, ciudades);
  }

  @put('/ciudades/{id}')
  @response(204, {
    description: 'Ciudades PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() ciudades: Ciudades,
  ): Promise<void> {
    await this.ciudadesRepository.replaceById(id, ciudades);
  }

  @del('/ciudades/{id}')
  @response(204, {
    description: 'Ciudades DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.ciudadesRepository.deleteById(id);
  }
}
