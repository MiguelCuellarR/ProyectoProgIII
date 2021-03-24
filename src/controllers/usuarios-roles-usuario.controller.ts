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
  RolesUsuario,
} from '../models';
import {UsuariosRepository} from '../repositories';

export class UsuariosRolesUsuarioController {
  constructor(
    @repository(UsuariosRepository)
    public usuariosRepository: UsuariosRepository,
  ) { }

  @get('/usuarios/{id}/roles-usuario', {
    responses: {
      '200': {
        description: 'RolesUsuario belonging to Usuarios',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(RolesUsuario)},
          },
        },
      },
    },
  })
  async getRolesUsuario(
    @param.path.string('id') id: typeof Usuarios.prototype.id,
  ): Promise<RolesUsuario> {
    return this.usuariosRepository.usuario_rolUsuario(id);
  }
}
