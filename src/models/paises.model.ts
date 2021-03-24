import {Entity, model, property} from '@loopback/repository';

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


  constructor(data?: Partial<Paises>) {
    super(data);
  }
}

export interface PaisesRelations {
  // describe navigational properties here
}

export type PaisesWithRelations = Paises & PaisesRelations;
