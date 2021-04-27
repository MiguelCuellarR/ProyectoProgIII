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
import {Inmuebles, Pago} from '../models';
import {InmueblesRepository, PagoRepository, SolicitudesEstudioRepository} from '../repositories';

@authenticate('vendedor')
export class PagoController {
  constructor(
    @repository(PagoRepository)
    public pagoRepository: PagoRepository,
    @repository(SolicitudesEstudioRepository)
    public solicitudesEstudioRepository: SolicitudesEstudioRepository,
    @repository(InmueblesRepository)
    public inmueblesRepository: InmueblesRepository
  ) { }

  @post('/pagos')
  @response(200, {
    description: 'Pago model instance',
    content: {'application/json': {schema: getModelSchemaRef(Pago)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pago, {
            title: 'NewPago',
            exclude: ['id'],
          }),
        },
      },
    })
    pago: Omit<Pago, 'id'>,
  ): Promise<Pago> {
    let pagoCreado = await this.pagoRepository.create(pago);
    if (pagoCreado) {
      let solicitudEstudio = await this.solicitudesEstudioRepository.findOne({where: {id: pagoCreado.solicitudEstudioId}})
      if (!solicitudEstudio) {
        this.pagoRepository.delete(pagoCreado);
        throw new HttpErrors[401]("Este solicitud de estudio no existe");

      } else {
        let inmueble = await this.inmueblesRepository.findOne({where: {id: solicitudEstudio.inmuebleId}})
        if (!inmueble) {
          this.pagoRepository.delete(pagoCreado);
          throw new HttpErrors[401]("Este inmueble no existe");
        } else {
          if (inmueble.valor < pago.valor) {
            this.pagoRepository.delete(pagoCreado);
            throw new HttpErrors[400]("El pago no puede ser mayor al precio del inmueble");
          }
          /*if (solicitudEstudio.solicitudEstudio_pagos != undefined){
            let sumatoria = 0;
            solicitudEstudio.solicitudEstudio_pagos.forEach(element => {
              sumatoria += element.valor;
            });
            if (sumatoria > inmueble.valor) {
              this.pagoRepository.delete(pagoCreado);
              throw new HttpErrors[400]("La sumatoria de los pagos no puede ser mayor al precio del inmueble");
            }
          }*/
        }
      }
    }
    return pagoCreado;
  }

  @get('/pagos/count')
  @response(200, {
    description: 'Pago model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Pago) where?: Where<Pago>,
  ): Promise<Count> {
    return this.pagoRepository.count(where);
  }

  @authenticate.skip()
  @get('/pagos')
  @response(200, {
    description: 'Array of Pago model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Pago, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Pago) filter?: Filter<Pago>,
  ): Promise<Pago[]> {
    return this.pagoRepository.find(filter);
  }

  @patch('/pagos')
  @response(200, {
    description: 'Pago PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pago, {partial: true}),
        },
      },
    })
    pago: Pago,
    @param.where(Pago) where?: Where<Pago>,
  ): Promise<Count> {
    return this.pagoRepository.updateAll(pago, where);
  }

  @authenticate.skip()
  @get('/pagos/{id}')
  @response(200, {
    description: 'Pago model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Pago, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Pago, {exclude: 'where'}) filter?: FilterExcludingWhere<Pago>
  ): Promise<Pago> {
    return this.pagoRepository.findById(id, filter);
  }

  @patch('/pagos/{id}')
  @response(204, {
    description: 'Pago PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Pago, {partial: true}),
        },
      },
    })
    pago: Pago,
  ): Promise<void> {
    await this.pagoRepository.updateById(id, pago);
  }

  @put('/pagos/{id}')
  @response(204, {
    description: 'Pago PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() pago: Pago,
  ): Promise<void> {
    await this.pagoRepository.replaceById(id, pago);
  }

  @del('/pagos/{id}')
  @response(204, {
    description: 'Pago DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.pagoRepository.deleteById(id);
  }
}
