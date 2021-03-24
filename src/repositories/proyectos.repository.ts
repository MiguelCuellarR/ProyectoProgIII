import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, HasManyRepositoryFactory, repository} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {Bloques, Ciudades, Proyectos, ProyectosRelations} from '../models';
import {BloquesRepository} from './bloques.repository';
import {CiudadesRepository} from './ciudades.repository';

export class ProyectosRepository extends DefaultCrudRepository<
  Proyectos,
  typeof Proyectos.prototype.id,
  ProyectosRelations
> {

  public readonly proyecto_ciudad: BelongsToAccessor<Ciudades, typeof Proyectos.prototype.id>;

  public readonly proyecto_bloques: HasManyRepositoryFactory<Bloques, typeof Proyectos.prototype.id>;

  constructor(
    @inject('datasources.MongoDB') dataSource: MongoDbDataSource, @repository.getter('CiudadesRepository') protected ciudadesRepositoryGetter: Getter<CiudadesRepository>, @repository.getter('BloquesRepository') protected bloquesRepositoryGetter: Getter<BloquesRepository>,
  ) {
    super(Proyectos, dataSource);
    this.proyecto_bloques = this.createHasManyRepositoryFactoryFor('proyecto_bloques', bloquesRepositoryGetter,);
    this.registerInclusionResolver('proyecto_bloques', this.proyecto_bloques.inclusionResolver);
    this.proyecto_ciudad = this.createBelongsToAccessorFor('proyecto_ciudad', ciudadesRepositoryGetter,);
    this.registerInclusionResolver('proyecto_ciudad', this.proyecto_ciudad.inclusionResolver);
  }
}
