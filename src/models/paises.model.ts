import {Entity, hasMany, model, property} from '@loopback/repository';
import {Ciudades} from './ciudades.model';

@model()
export class Paises extends Entity {
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

  @hasMany(() => Ciudades, {keyTo: 'paisId'})
  pais_ciudades: Ciudades[];

  constructor(data?: Partial<Paises>) {
    super(data);
  }
}

export interface PaisesRelations {
  // describe navigational properties here
}

export type PaisesWithRelations = Paises & PaisesRelations;
