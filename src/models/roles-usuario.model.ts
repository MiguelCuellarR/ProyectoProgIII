import {Entity, model, property, hasMany} from '@loopback/repository';
import {Usuarios} from './usuarios.model';

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

  @hasMany(() => Usuarios, {keyTo: 'rolUsuarioId'})
  rolUsuario_usuarios: Usuarios[];

  constructor(data?: Partial<RolesUsuario>) {
    super(data);
  }
}

export interface RolesUsuarioRelations {
  // describe navigational properties here
}

export type RolesUsuarioWithRelations = RolesUsuario & RolesUsuarioRelations;
