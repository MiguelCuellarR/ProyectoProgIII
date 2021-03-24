import {Entity, model, property} from '@loopback/repository';

@model()
export class RolesUsuario extends Entity {
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


  constructor(data?: Partial<RolesUsuario>) {
    super(data);
  }
}

export interface RolesUsuarioRelations {
  // describe navigational properties here
}

export type RolesUsuarioWithRelations = RolesUsuario & RolesUsuarioRelations;
