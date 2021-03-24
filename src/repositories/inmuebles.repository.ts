import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {Bloques, Inmuebles, InmueblesRelations, SolicitudesEstudio} from '../models';
import {BloquesRepository} from './bloques.repository';
import {SolicitudesEstudioRepository} from './solicitudes-estudio.repository';

export class InmueblesRepository extends DefaultCrudRepository<
  Inmuebles,
  typeof Inmuebles.prototype.id,
  InmueblesRelations
> {

  public readonly inmueble_bloque: BelongsToAccessor<Bloques, typeof Inmuebles.prototype.id>;

  public readonly inmueble_solicitudesEstudio: HasManyRepositoryFactory<SolicitudesEstudio, typeof Inmuebles.prototype.id>;

  constructor(
    @inject('datasources.MongoDB') dataSource: MongoDbDataSource, @repository.getter('BloquesRepository') protected bloquesRepositoryGetter: Getter<BloquesRepository>, @repository.getter('SolicitudesEstudioRepository') protected solicitudesEstudioRepositoryGetter: Getter<SolicitudesEstudioRepository>,
  ) {
    super(Inmuebles, dataSource);
    this.inmueble_solicitudesEstudio = this.createHasManyRepositoryFactoryFor('inmueble_solicitudesEstudio', solicitudesEstudioRepositoryGetter,);
    this.registerInclusionResolver('inmueble_solicitudesEstudio', this.inmueble_solicitudesEstudio.inclusionResolver);
    this.inmueble_bloque = this.createBelongsToAccessorFor('inmueble_bloque', bloquesRepositoryGetter,);
    this.registerInclusionResolver('inmueble_bloque', this.inmueble_bloque.inclusionResolver);
  }
}
