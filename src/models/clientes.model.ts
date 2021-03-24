import {belongsTo, Entity, hasMany, hasOne, model, property} from '@loopback/repository';
import {Ciudades} from './ciudades.model';
import {InfosFinanciera} from './infos-financiera.model';
import {SolicitudesEstudio} from './solicitudes-estudio.model';

@model({
  settings: {
    foreignKeys: {
      fk_ciudad_id: {
        name: 'fk_ciudad_cliente_id',
        entity: 'Ciudades',
        entityKey: 'id',
        foreignKey: 'ciudadId',
      },
    },
  },
})
export class Clientes extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'number',
    required: true,
  })
  documento: number;

  @property({
    type: 'string',
    required: true,
  })
  nombres: string;

  @property({
    type: 'string',
    required: true,
  })
  apellidos: string;

  @property({
    type: 'date',
    required: true,
  })
  fec_nacimiento: string;

  @property({
    type: 'string',
    required: true,
  })
  fotografia: string;

  @property({
    type: 'string',
    required: true,
  })
  num_celular: string;

  @property({
    type: 'string',
    required: true,
  })
  correo_electronico: string;

  @property({
    type: 'string',
    required: true,
  })
  direccion: string;

  @belongsTo(() => Ciudades, {name: 'cliente_ciudad'})
  ciudadId: string;

  @hasMany(() => SolicitudesEstudio, {keyTo: 'clienteId'})
  cliente_solicitudesEstudio: SolicitudesEstudio[];

  @hasOne(() => InfosFinanciera, {keyTo: 'clienteId'})
  Cliente_infoFinanciera: InfosFinanciera;

  constructor(data?: Partial<Clientes>) {
    super(data);
  }
}

export interface ClientesRelations {
  // describe navigational properties here
}

export type ClientesWithRelations = Clientes & ClientesRelations;
