import {Entity, model, property, hasMany} from '@loopback/repository';
import {SolicitudesEstudio} from './solicitudes-estudio.model';

@model()
export class Estados extends Entity {
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
  nombre: string;

  @hasMany(() => SolicitudesEstudio, {keyTo: 'estadoId'})
  estado_solicitudesEstudio: SolicitudesEstudio[];

  constructor(data?: Partial<Estados>) {
    super(data);
  }
}

export interface EstadosRelations {
  // describe navigational properties here
}

export type EstadosWithRelations = Estados & EstadosRelations;
