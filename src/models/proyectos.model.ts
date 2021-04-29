import {belongsTo, Entity, hasMany, model, property} from '@loopback/repository';
import {Bloques} from './bloques.model';
import {Ciudades} from './ciudades.model';

@model({
  settings: {
    foreignKeys: {
      fk_ciudad_id: {
        name: 'fk_ciudad_proyecto_id',
        entity: 'Ciudades',
        entityKey: 'id',
        foreignKey: 'ciudadId',
      },
    },
  },
})
export class Proyectos extends Entity {
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
    required: true,
  })
  descripcion: string;

  @property({
    type: 'string',
    required: true,
  })
  imagen: string;

  @belongsTo(() => Ciudades, {name: 'proyecto_ciudad'})
  ciudadId: string;

  @hasMany(() => Bloques, {keyTo: 'proyectoId'})
  proyecto_bloques: Bloques[];

  constructor(data?: Partial<Proyectos>) {
    super(data);
  }
}

export interface ProyectosRelations {
  // describe navigational properties here
}

export type ProyectosWithRelations = Proyectos & ProyectosRelations;
