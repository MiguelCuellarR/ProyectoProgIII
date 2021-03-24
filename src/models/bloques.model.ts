import {Entity, model, property} from '@loopback/repository';

@model()
export class Bloques extends Entity {
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
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'string',
  })
  descripcion?: string;

  @property({
    type: 'string',
    required: true,
  })
  proyecto: string;


  constructor(data?: Partial<Bloques>) {
    super(data);
  }
}

export interface BloquesRelations {
  // describe navigational properties here
}

export type BloquesWithRelations = Bloques & BloquesRelations;
