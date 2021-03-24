import {Entity, model, property} from '@loopback/repository';

@model()
export class Inmuebles extends Entity {
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
  codigo: number;

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


  constructor(data?: Partial<Inmuebles>) {
    super(data);
  }
}

export interface InmueblesRelations {
  // describe navigational properties here
}

export type InmueblesWithRelations = Inmuebles & InmueblesRelations;
