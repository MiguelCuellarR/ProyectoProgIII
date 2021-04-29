import {belongsTo, Entity, hasMany, model, property} from '@loopback/repository';
import {Inmuebles} from './inmuebles.model';
import {Proyectos} from './proyectos.model';

@model({
  settings: {
    foreignKeys: {
      fk_proyecto_id: {
        name: 'fk_proyecto_id',
        entity: 'Proyectos',
        entityKey: 'id',
        foreignKey: 'proyectoId',
      },
    },
  },
})
export class Bloques extends Entity {
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
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'string',
  })
  descripcion?: string;

  @belongsTo(() => Proyectos, {name: 'bloque_proyecto'})
  proyectoId: string;

  @hasMany(() => Inmuebles, {keyTo: 'bloqueId'})
  bloque_inmuebles: Inmuebles[];

  constructor(data?: Partial<Bloques>) {
    super(data);
  }
}

export interface BloquesRelations {
  // describe navigational properties here
}

export type BloquesWithRelations = Bloques & BloquesRelations;
