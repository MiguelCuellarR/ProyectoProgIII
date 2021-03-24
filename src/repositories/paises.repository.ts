import {Getter, inject} from '@loopback/core';
import {DefaultCrudRepository, HasManyRepositoryFactory, repository} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {Ciudades, Paises, PaisesRelations} from '../models';
import {CiudadesRepository} from './ciudades.repository';

export class PaisesRepository extends DefaultCrudRepository<
  Paises,
  typeof Paises.prototype.id,
  PaisesRelations
> {

  public readonly pais_ciudades: HasManyRepositoryFactory<Ciudades, typeof Paises.prototype.id>;

  constructor(
    @inject('datasources.MongoDB') dataSource: MongoDbDataSource, @repository.getter('CiudadesRepository') protected ciudadesRepositoryGetter: Getter<CiudadesRepository>,
  ) {
    super(Paises, dataSource);
    this.pais_ciudades = this.createHasManyRepositoryFactoryFor('pais_ciudades', ciudadesRepositoryGetter,);
    this.registerInclusionResolver('pais_ciudades', this.pais_ciudades.inclusionResolver);
  }
}
