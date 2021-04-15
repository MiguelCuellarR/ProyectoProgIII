import {Model, model, property} from '@loopback/repository';

@model()
export class ResetearClave extends Model {
  @property({
    type: 'string',
    required: true,
  })
  correo: string;


  constructor(data?: Partial<ResetearClave>) {
    super(data);
  }
}

export interface ResetearClaveRelations {
  // describe navigational properties here
}

export type ResetearClaveWithRelations = ResetearClave & ResetearClaveRelations;
