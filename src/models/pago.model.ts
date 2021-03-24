import {belongsTo, Entity, model, property} from '@loopback/repository';
import {SolicitudesEstudio} from './solicitudes-estudio.model';

@model({
  settings: {
    foreignKeys: {
      fk_solicitudEstudio_id: {
        name: 'fk_solicitudEstudio_id',
        entity: 'SolicitudesEstudio',
        entityKey: 'id',
        foreignKey: 'solicitudEstudioId',
      },
    },
  },
})
export class Pago extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
  })
  comprobante?: string;

  @property({
    type: 'number',
    required: true,
  })
  valor: number;

  @belongsTo(() => SolicitudesEstudio, {name: 'pago_solicitudEstudio'})
  solicitudEstudioId: string;

  constructor(data?: Partial<Pago>) {
    super(data);
  }
}

export interface PagoRelations {
  // describe navigational properties here
}

export type PagoWithRelations = Pago & PagoRelations;
