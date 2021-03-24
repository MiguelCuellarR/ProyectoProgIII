import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, HasManyRepositoryFactory, repository} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {Ciudades, CiudadesRelations, Paises, Proyectos, Clientes, Usuarios} from '../models';
import {PaisesRepository} from './paises.repository';
import {ProyectosRepository} from './proyectos.repository';
import {ClientesRepository} from './clientes.repository';
import {UsuariosRepository} from './usuarios.repository';

export class CiudadesRepository extends DefaultCrudRepository<
  Ciudades,
  typeof Ciudades.prototype.id,
  CiudadesRelations
> {

  public readonly ciudad_pais: BelongsToAccessor<Paises, typeof Ciudades.prototype.id>;

  public readonly ciudad_proyectos: HasManyRepositoryFactory<Proyectos, typeof Ciudades.prototype.id>;

  public readonly ciudad_clientes: HasManyRepositoryFactory<Clientes, typeof Ciudades.prototype.id>;

  public readonly ciudad_usuarios: HasManyRepositoryFactory<Usuarios, typeof Ciudades.prototype.id>;

  constructor(
    @inject('datasources.MongoDB') dataSource: MongoDbDataSource, @repository.getter('PaisesRepository') protected paisesRepositoryGetter: Getter<PaisesRepository>, @repository.getter('ProyectosRepository') protected proyectosRepositoryGetter: Getter<ProyectosRepository>, @repository.getter('ClientesRepository') protected clientesRepositoryGetter: Getter<ClientesRepository>, @repository.getter('UsuariosRepository') protected usuariosRepositoryGetter: Getter<UsuariosRepository>,
  ) {
    super(Ciudades, dataSource);
    this.ciudad_usuarios = this.createHasManyRepositoryFactoryFor('ciudad_usuarios', usuariosRepositoryGetter,);
    this.registerInclusionResolver('ciudad_usuarios', this.ciudad_usuarios.inclusionResolver);
    this.ciudad_clientes = this.createHasManyRepositoryFactoryFor('ciudad_clientes', clientesRepositoryGetter,);
    this.registerInclusionResolver('ciudad_clientes', this.ciudad_clientes.inclusionResolver);
    this.ciudad_proyectos = this.createHasManyRepositoryFactoryFor('ciudad_proyectos', proyectosRepositoryGetter,);
    this.registerInclusionResolver('ciudad_proyectos', this.ciudad_proyectos.inclusionResolver);
    this.ciudad_pais = this.createBelongsToAccessorFor('ciudad_pais', paisesRepositoryGetter,);
    this.registerInclusionResolver('ciudad_pais', this.ciudad_pais.inclusionResolver);
  }
}
