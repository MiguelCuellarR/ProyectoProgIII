import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {Estados, EstadosRelations, SolicitudesEstudio} from '../models';
import {SolicitudesEstudioRepository} from './solicitudes-estudio.repository';

export class EstadosRepository extends DefaultCrudRepository<
  Estados,
  typeof Estados.prototype.id,
  EstadosRelations
> {

  public readonly estado_solicitudesEstudio: HasManyRepositoryFactory<SolicitudesEstudio, typeof Estados.prototype.id>;

  constructor(
    @inject('datasources.MongoDB') dataSource: MongoDbDataSource, @repository.getter('SolicitudesEstudioRepository') protected solicitudesEstudioRepositoryGetter: Getter<SolicitudesEstudioRepository>,
  ) {
    super(Estados, dataSource);
    this.estado_solicitudesEstudio = this.createHasManyRepositoryFactoryFor('estado_solicitudesEstudio', solicitudesEstudioRepositoryGetter,);
    this.registerInclusionResolver('estado_solicitudesEstudio', this.estado_solicitudesEstudio.inclusionResolver);
  }
}
