import {Model, model, property} from '@loopback/repository';

@model()
export class CambiarClave extends Model {
  @property({
    type: 'string',
    required: true,
  })
  correo: string;

  @property({
    type: 'string',
    required: true,
  })
  clave: string;

  @property({
    type: 'string',
    required: true,
  })
  nuevaClave: string;


  constructor(data?: Partial<CambiarClave>) {
    super(data);
  }
}

export interface CambiarClaveRelations {
  // describe navigational properties here
}

export type CambiarClaveWithRelations = CambiarClave & CambiarClaveRelations;
