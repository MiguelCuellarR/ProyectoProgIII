import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, HasManyRepositoryFactory, repository} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {Bloques, BloquesRelations, Inmuebles, Proyectos} from '../models';
import {InmueblesRepository} from './inmuebles.repository';
import {ProyectosRepository} from './proyectos.repository';

export class BloquesRepository extends DefaultCrudRepository<
  Bloques,
  typeof Bloques.prototype.id,
  BloquesRelations
> {

  public readonly bloque_proyecto: BelongsToAccessor<Proyectos, typeof Bloques.prototype.id>;

  public readonly bloque_inmuebles: HasManyRepositoryFactory<Inmuebles, typeof Bloques.prototype.id>;

  constructor(
    @inject('datasources.MongoDB') dataSource: MongoDbDataSource, @repository.getter('ProyectosRepository') protected proyectosRepositoryGetter: Getter<ProyectosRepository>, @repository.getter('InmueblesRepository') protected inmueblesRepositoryGetter: Getter<InmueblesRepository>,
  ) {
    super(Bloques, dataSource);
    this.bloque_inmuebles = this.createHasManyRepositoryFactoryFor('bloque_inmuebles', inmueblesRepositoryGetter,);
    this.registerInclusionResolver('bloque_inmuebles', this.bloque_inmuebles.inclusionResolver);
    this.bloque_proyecto = this.createBelongsToAccessorFor('bloque_proyecto', proyectosRepositoryGetter,);
    this.registerInclusionResolver('bloque_proyecto', this.bloque_proyecto.inclusionResolver);
  }
}
