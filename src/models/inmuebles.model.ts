import {belongsTo, Entity, hasMany, model, property} from '@loopback/repository';
import {Bloques} from './bloques.model';
import {SolicitudesEstudio} from './solicitudes-estudio.model';

@model({
  settings: {
    foreignKeys: {
      fk_bloque_id: {
        name: 'fk_bloque_id',
        entity: 'Bloques',
        entityKey: 'id',
        foreignKey: 'bloqueId',
      },
    },
  },
})
export class Inmuebles extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  codigo: string;

  @property({
    type: 'number',
    required: true,
  })
  identificador: number;

  @property({
    type: 'number',
    required: true,
  })
  valor: number;

  @belongsTo(() => Bloques, {name: 'inmueble_bloque'})
  bloqueId: string;

  @hasMany(() => SolicitudesEstudio, {keyTo: 'inmuebleId'})
  inmueble_solicitudesEstudio: SolicitudesEstudio[];

  constructor(data?: Partial<Inmuebles>) {
    super(data);
  }
}

export interface InmueblesRelations {
  // describe navigational properties here
}

export type InmueblesWithRelations = Inmuebles & InmueblesRelations;
