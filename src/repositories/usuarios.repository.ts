import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {Usuarios, UsuariosRelations, RolesUsuario, Ciudades, SolicitudesEstudio} from '../models';
import {RolesUsuarioRepository} from './roles-usuario.repository';
import {CiudadesRepository} from './ciudades.repository';
import {SolicitudesEstudioRepository} from './solicitudes-estudio.repository';

export class UsuariosRepository extends DefaultCrudRepository<
  Usuarios,
  typeof Usuarios.prototype.id,
  UsuariosRelations
> {

  public readonly usuario_rolUsuario: BelongsToAccessor<RolesUsuario, typeof Usuarios.prototype.id>;

  public readonly usuario_ciudad: BelongsToAccessor<Ciudades, typeof Usuarios.prototype.id>;

  public readonly usuario_solicitudesEstudio: HasManyRepositoryFactory<SolicitudesEstudio, typeof Usuarios.prototype.id>;

  constructor(
    @inject('datasources.MongoDB') dataSource: MongoDbDataSource, @repository.getter('RolesUsuarioRepository') protected rolesUsuarioRepositoryGetter: Getter<RolesUsuarioRepository>, @repository.getter('CiudadesRepository') protected ciudadesRepositoryGetter: Getter<CiudadesRepository>, @repository.getter('SolicitudesEstudioRepository') protected solicitudesEstudioRepositoryGetter: Getter<SolicitudesEstudioRepository>,
  ) {
    super(Usuarios, dataSource);
    this.usuario_solicitudesEstudio = this.createHasManyRepositoryFactoryFor('usuario_solicitudesEstudio', solicitudesEstudioRepositoryGetter,);
    this.registerInclusionResolver('usuario_solicitudesEstudio', this.usuario_solicitudesEstudio.inclusionResolver);
    this.usuario_ciudad = this.createBelongsToAccessorFor('usuario_ciudad', ciudadesRepositoryGetter,);
    this.registerInclusionResolver('usuario_ciudad', this.usuario_ciudad.inclusionResolver);
    this.usuario_rolUsuario = this.createBelongsToAccessorFor('usuario_rolUsuario', rolesUsuarioRepositoryGetter,);
    this.registerInclusionResolver('usuario_rolUsuario', this.usuario_rolUsuario.inclusionResolver);
  }
}
