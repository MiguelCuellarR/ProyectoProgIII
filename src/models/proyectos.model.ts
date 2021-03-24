import {Entity, model, property} from '@loopback/repository';

@model()
export class Proyectos extends Entity {
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
    required: true,
  })
  descripcion: string;

  @property({
    type: 'string',
    required: true,
  })
  imagen: string;


  constructor(data?: Partial<Proyectos>) {
    super(data);
  }
}

export interface ProyectosRelations {
  // describe navigational properties here
}

export type ProyectosWithRelations = Proyectos & ProyectosRelations;
