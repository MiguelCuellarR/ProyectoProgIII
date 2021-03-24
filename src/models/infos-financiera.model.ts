import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    foreignKeys: {
      fk_cliente_id: {
        name: 'fk_cliente_id',
        entity: 'Clientes',
        entityKey: 'id',
        foreignKey: 'clienteId',
      },
    },
  },
})
export class InfosFinanciera extends Entity {
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
  total_ingresos: number;

  @property({
    type: 'string',
    required: true,
  })
  datos_trabajo: string;

  @property({
    type: 'number',
    required: true,
  })
  tiempo_trabajo_actual: number;

  @property({
    type: 'string',
    required: true,
  })
  nombre_ref_familiar: string;

  @property({
    type: 'string',
    required: true,
  })
  telefono_ref_familiar: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre_ref_personal: string;

  @property({
    type: 'string',
    required: true,
  })
  telefono_ref_personal: string;

  @property({
    type: 'string',
  })
  clienteId?: string;

  constructor(data?: Partial<InfosFinanciera>) {
    super(data);
  }
}

export interface InfosFinancieraRelations {
  // describe navigational properties here
}

export type InfosFinancieraWithRelations = InfosFinanciera & InfosFinancieraRelations;
