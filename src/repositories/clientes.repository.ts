import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory, HasOneRepositoryFactory} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {Clientes, ClientesRelations, Ciudades, SolicitudesEstudio, InfosFinanciera} from '../models';
import {CiudadesRepository} from './ciudades.repository';
import {SolicitudesEstudioRepository} from './solicitudes-estudio.repository';
import {InfosFinancieraRepository} from './infos-financiera.repository';

export class ClientesRepository extends DefaultCrudRepository<
  Clientes,
  typeof Clientes.prototype.id,
  ClientesRelations
> {

  public readonly cliente_ciudad: BelongsToAccessor<Ciudades, typeof Clientes.prototype.id>;

  public readonly cliente_solicitudesEstudio: HasManyRepositoryFactory<SolicitudesEstudio, typeof Clientes.prototype.id>;

  public readonly Cliente_infoFinanciera: HasOneRepositoryFactory<InfosFinanciera, typeof Clientes.prototype.id>;

  constructor(
    @inject('datasources.MongoDB') dataSource: MongoDbDataSource, @repository.getter('CiudadesRepository') protected ciudadesRepositoryGetter: Getter<CiudadesRepository>, @repository.getter('SolicitudesEstudioRepository') protected solicitudesEstudioRepositoryGetter: Getter<SolicitudesEstudioRepository>, @repository.getter('InfosFinancieraRepository') protected infosFinancieraRepositoryGetter: Getter<InfosFinancieraRepository>,
  ) {
    super(Clientes, dataSource);
    this.Cliente_infoFinanciera = this.createHasOneRepositoryFactoryFor('Cliente_infoFinanciera', infosFinancieraRepositoryGetter);
    this.registerInclusionResolver('Cliente_infoFinanciera', this.Cliente_infoFinanciera.inclusionResolver);
    this.cliente_solicitudesEstudio = this.createHasManyRepositoryFactoryFor('cliente_solicitudesEstudio', solicitudesEstudioRepositoryGetter,);
    this.registerInclusionResolver('cliente_solicitudesEstudio', this.cliente_solicitudesEstudio.inclusionResolver);
    this.cliente_ciudad = this.createBelongsToAccessorFor('cliente_ciudad', ciudadesRepositoryGetter,);
    this.registerInclusionResolver('cliente_ciudad', this.cliente_ciudad.inclusionResolver);
  }
}
