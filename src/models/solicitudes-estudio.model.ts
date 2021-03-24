import {Entity, model, property} from '@loopback/repository';

@model()
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


  constructor(data?: Partial<SolicitudesEstudio>) {
    super(data);
  }
}

export interface SolicitudesEstudioRelations {
  // describe navigational properties here
}

export type SolicitudesEstudioWithRelations = SolicitudesEstudio & SolicitudesEstudioRelations;
