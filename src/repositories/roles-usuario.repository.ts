import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {RolesUsuario, RolesUsuarioRelations, Usuarios} from '../models';
import {UsuariosRepository} from './usuarios.repository';

export class RolesUsuarioRepository extends DefaultCrudRepository<
  RolesUsuario,
  typeof RolesUsuario.prototype.id,
  RolesUsuarioRelations
> {

  public readonly rolUsuario_usuarios: HasManyRepositoryFactory<Usuarios, typeof RolesUsuario.prototype.id>;

  constructor(
    @inject('datasources.MongoDB') dataSource: MongoDbDataSource, @repository.getter('UsuariosRepository') protected usuariosRepositoryGetter: Getter<UsuariosRepository>,
  ) {
    super(RolesUsuario, dataSource);
    this.rolUsuario_usuarios = this.createHasManyRepositoryFactoryFor('rolUsuario_usuarios', usuariosRepositoryGetter,);
    this.registerInclusionResolver('rolUsuario_usuarios', this.rolUsuario_usuarios.inclusionResolver);
  }
}
