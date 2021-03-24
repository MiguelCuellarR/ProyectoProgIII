import {belongsTo, Entity, hasMany, model, property} from '@loopback/repository';
import {Clientes} from './clientes.model';
import {Estados} from './estados.model';
import {Inmuebles} from './inmuebles.model';
import {Pago} from './pago.model';
import {Usuarios} from './usuarios.model';

@model({
  settings: {
    foreignKeys: {
      fk_inmueble_id: {
        name: 'fk_inmueble_id',
        entity: 'Inmuebles',
        entityKey: 'id',
        foreignKey: 'inmuebleId',
      },
      fk_usuario_id: {
        name: 'fk_usuario_id',
        entity: 'Usuarios',
        entityKey: 'id',
        foreignKey: 'usuarioId',
      },
      fk_cliente_id: {
        name: 'fk_cliente_solicitudEstudio_id',
        entity: 'Clientes',
        entityKey: 'id',
        foreignKey: 'clienteId',
      },
      fk_estado_id: {
        name: 'fk_estado_id',
        entity: 'Estados',
        entityKey: 'id',
        foreignKey: 'estadoId',
      }
    },
  },
})
export class SolicitudesEstudio extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'date',
    required: true,
  })
  fecha: string;

  @property({
    type: 'string',
    required: true,
  })
  oferta_economica: string;

  @hasMany(() => Pago, {keyTo: 'solicitudEstudioId'})
  solicitudEstudio_pagos: Pago[];

  @belongsTo(() => Inmuebles, {name: 'solicitudEstudio_inmueble'})
  inmuebleId: string;

  @belongsTo(() => Clientes, {name: 'solicitudEstudio_cliente'})
  clienteId: string;

  @belongsTo(() => Estados, {name: 'solicitudEstudio_estado'})
  estadoId: string;

  @belongsTo(() => Usuarios, {name: 'solicitudEstudio_usuario'})
  usuarioId: string;

  constructor(data?: Partial<SolicitudesEstudio>) {
    super(data);
  }
}

export interface SolicitudesEstudioRelations {
  // describe navigational properties here
}

export type SolicitudesEstudioWithRelations = SolicitudesEstudio & SolicitudesEstudioRelations;
