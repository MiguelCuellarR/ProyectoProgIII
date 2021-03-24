import {
  repository
} from '@loopback/repository';
import {
  get,
  getModelSchemaRef, param
} from '@loopback/rest';
import {
  Ciudades, Proyectos
} from '../models';
import {ProyectosRepository} from '../repositories';

export class ProyectosCiudadesController {
  constructor(
    @repository(ProyectosRepository)
    public proyectosRepository: ProyectosRepository,
  ) { }

  @get('/proyectos/{id}/ciudades', {
    responses: {
      '200': {
        description: 'Ciudades belonging to Proyectos',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Ciudades)},
          },
        },
      },
    },
  })
  async getCiudades(
    @param.path.string('id') id: typeof Proyectos.prototype.id,
  ): Promise<Ciudades> {
    return this.proyectosRepository.proyecto_ciudad(id);
  }
}
