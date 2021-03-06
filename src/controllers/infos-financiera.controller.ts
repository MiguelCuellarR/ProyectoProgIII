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
import {InfosFinanciera} from '../models';
import {ClientesRepository, InfosFinancieraRepository} from '../repositories';

@authenticate('vendedor')
export class InfosFinancieraController {
  constructor(
    @repository(InfosFinancieraRepository)
    public infosFinancieraRepository: InfosFinancieraRepository,
    @repository(ClientesRepository)
    public clientesRepository: ClientesRepository,
  ) { }

  @post('/infos-financieras')
  @response(200, {
    description: 'InfosFinanciera model instance',
    content: {'application/json': {schema: getModelSchemaRef(InfosFinanciera)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(InfosFinanciera, {
            title: 'NewInfosFinanciera',
            exclude: ['id'],
          }),
        },
      },
    })
    infosFinanciera: Omit<InfosFinanciera, 'id'>,
  ): Promise<InfosFinanciera> {
    let infoFinancieraCreada = await this.infosFinancieraRepository.create(infosFinanciera);
    if (infoFinancieraCreada){
      let cliente = await this.clientesRepository.findOne({where: {id: infoFinancieraCreada.clienteId}})
      if (!cliente){
        this.infosFinancieraRepository.delete(infoFinancieraCreada);
        throw new HttpErrors[401]("Este cliente no existe");
      }
    }
    return infoFinancieraCreada;
  }

  @get('/infos-financieras/count')
  @response(200, {
    description: 'InfosFinanciera model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(InfosFinanciera) where?: Where<InfosFinanciera>,
  ): Promise<Count> {
    return this.infosFinancieraRepository.count(where);
  }

  @authenticate.skip()
  @get('/infos-financieras')
  @response(200, {
    description: 'Array of InfosFinanciera model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(InfosFinanciera, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(InfosFinanciera) filter?: Filter<InfosFinanciera>,
  ): Promise<InfosFinanciera[]> {
    return this.infosFinancieraRepository.find(filter);
  }

  @patch('/infos-financieras')
  @response(200, {
    description: 'InfosFinanciera PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(InfosFinanciera, {partial: true}),
        },
      },
    })
    infosFinanciera: InfosFinanciera,
    @param.where(InfosFinanciera) where?: Where<InfosFinanciera>,
  ): Promise<Count> {
    return this.infosFinancieraRepository.updateAll(infosFinanciera, where);
  }

  @authenticate.skip()
  @get('/infos-financieras/{id}')
  @response(200, {
    description: 'InfosFinanciera model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(InfosFinanciera, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(InfosFinanciera, {exclude: 'where'}) filter?: FilterExcludingWhere<InfosFinanciera>
  ): Promise<InfosFinanciera> {
    return this.infosFinancieraRepository.findById(id, filter);
  }

  @patch('/infos-financieras/{id}')
  @response(204, {
    description: 'InfosFinanciera PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(InfosFinanciera, {partial: true}),
        },
      },
    })
    infosFinanciera: InfosFinanciera,
  ): Promise<void> {
    await this.infosFinancieraRepository.updateById(id, infosFinanciera);
  }

  @put('/infos-financieras/{id}')
  @response(204, {
    description: 'InfosFinanciera PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() infosFinanciera: InfosFinanciera,
  ): Promise<void> {
    await this.infosFinancieraRepository.replaceById(id, infosFinanciera);
  }

  @del('/infos-financieras/{id}')
  @response(204, {
    description: 'InfosFinanciera DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.infosFinancieraRepository.deleteById(id);
  }
}
