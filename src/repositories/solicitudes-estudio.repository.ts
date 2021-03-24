import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory, BelongsToAccessor} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {SolicitudesEstudio, SolicitudesEstudioRelations, Pago, Inmuebles, Clientes, Estados, Usuarios} from '../models';
import {PagoRepository} from './pago.repository';
import {InmueblesRepository} from './inmuebles.repository';
import {ClientesRepository} from './clientes.repository';
import {EstadosRepository} from './estados.repository';
import {UsuariosRepository} from './usuarios.repository';

export class SolicitudesEstudioRepository extends DefaultCrudRepository<
  SolicitudesEstudio,
  typeof SolicitudesEstudio.prototype.id,
  SolicitudesEstudioRelations
> {

  public readonly solicitudEstudio_pagos: HasManyRepositoryFactory<Pago, typeof SolicitudesEstudio.prototype.id>;

  public readonly solicitudEstudio_inmueble: BelongsToAccessor<Inmuebles, typeof SolicitudesEstudio.prototype.id>;

  public readonly solicitudEstudio_cliente: BelongsToAccessor<Clientes, typeof SolicitudesEstudio.prototype.id>;

  public readonly solicitudEstudio_estado: BelongsToAccessor<Estados, typeof SolicitudesEstudio.prototype.id>;

  public readonly solicitudEstudio_usuario: BelongsToAccessor<Usuarios, typeof SolicitudesEstudio.prototype.id>;

  constructor(
    @inject('datasources.MongoDB') dataSource: MongoDbDataSource, @repository.getter('PagoRepository') protected pagoRepositoryGetter: Getter<PagoRepository>, @repository.getter('InmueblesRepository') protected inmueblesRepositoryGetter: Getter<InmueblesRepository>, @repository.getter('ClientesRepository') protected clientesRepositoryGetter: Getter<ClientesRepository>, @repository.getter('EstadosRepository') protected estadosRepositoryGetter: Getter<EstadosRepository>, @repository.getter('UsuariosRepository') protected usuariosRepositoryGetter: Getter<UsuariosRepository>,
  ) {
    super(SolicitudesEstudio, dataSource);
    this.solicitudEstudio_usuario = this.createBelongsToAccessorFor('solicitudEstudio_usuario', usuariosRepositoryGetter,);
    this.registerInclusionResolver('solicitudEstudio_usuario', this.solicitudEstudio_usuario.inclusionResolver);
    this.solicitudEstudio_estado = this.createBelongsToAccessorFor('solicitudEstudio_estado', estadosRepositoryGetter,);
    this.registerInclusionResolver('solicitudEstudio_estado', this.solicitudEstudio_estado.inclusionResolver);
    this.solicitudEstudio_cliente = this.createBelongsToAccessorFor('solicitudEstudio_cliente', clientesRepositoryGetter,);
    this.registerInclusionResolver('solicitudEstudio_cliente', this.solicitudEstudio_cliente.inclusionResolver);
    this.solicitudEstudio_inmueble = this.createBelongsToAccessorFor('solicitudEstudio_inmueble', inmueblesRepositoryGetter,);
    this.registerInclusionResolver('solicitudEstudio_inmueble', this.solicitudEstudio_inmueble.inclusionResolver);
    this.solicitudEstudio_pagos = this.createHasManyRepositoryFactoryFor('solicitudEstudio_pagos', pagoRepositoryGetter,);
    this.registerInclusionResolver('solicitudEstudio_pagos', this.solicitudEstudio_pagos.inclusionResolver);
  }
}
