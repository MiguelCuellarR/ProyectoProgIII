import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {Pago, PagoRelations, SolicitudesEstudio} from '../models';
import {SolicitudesEstudioRepository} from './solicitudes-estudio.repository';

export class PagoRepository extends DefaultCrudRepository<
  Pago,
  typeof Pago.prototype.id,
  PagoRelations
> {

  public readonly pago_solicitudEstudio: BelongsToAccessor<SolicitudesEstudio, typeof Pago.prototype.id>;

  constructor(
    @inject('datasources.MongoDB') dataSource: MongoDbDataSource, @repository.getter('SolicitudesEstudioRepository') protected solicitudesEstudioRepositoryGetter: Getter<SolicitudesEstudioRepository>,
  ) {
    super(Pago, dataSource);
    this.pago_solicitudEstudio = this.createBelongsToAccessorFor('pago_solicitudEstudio', solicitudesEstudioRepositoryGetter,);
    this.registerInclusionResolver('pago_solicitudEstudio', this.pago_solicitudEstudio.inclusionResolver);
  }
}
