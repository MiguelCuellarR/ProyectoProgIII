import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Usuarios,
  Ciudades,
} from '../models';
import {UsuariosRepository} from '../repositories';

export class UsuariosCiudadesController {
  constructor(
    @repository(UsuariosRepository)
    public usuariosRepository: UsuariosRepository,
  ) { }

  @get('/usuarios/{id}/ciudades', {
    responses: {
      '200': {
        description: 'Ciudades belonging to Usuarios',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Ciudades)},
          },
        },
      },
    },
  })
  async getCiudades(
    @param.path.string('id') id: typeof Usuarios.prototype.id,
  ): Promise<Ciudades> {
    return this.usuariosRepository.usuario_ciudad(id);
  }
}
