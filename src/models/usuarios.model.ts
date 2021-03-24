import {belongsTo, Entity, hasMany, model, property} from '@loopback/repository';
import {Ciudades} from './ciudades.model';
import {RolesUsuario} from './roles-usuario.model';
import {SolicitudesEstudio} from './solicitudes-estudio.model';

@model({
  settings: {
    foreignKeys: {
      fk_rolUsuario_id: {
        name: 'fk_rolUsuario_id',
        entity: 'RolesUsuario',
        entityKey: 'id',
        foreignKey: 'rolUsuarioId',
      },
      fk_ciudad_id: {
        name: 'fk_ciudad_usuario_id',
        entity: 'Ciudades',
        entityKey: 'id',
        foreignKey: 'ciudadId',
      }
    },
  },
})
export class Usuarios extends Entity {
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
  nombres: string;

  @property({
    type: 'string',
    required: true,
  })
  apellidos: string;

  @property({
    type: 'number',
    required: true,
  })
  documento: number;

  @property({
    type: 'string',
    required: true,
  })
  correo_electronico: string;

  @property({
    type: 'string',
    required: true,
  })
  telefono_celular: string;

  @property({
    type: 'string',
    required: true,
  })
  contrasena: string;

  @belongsTo(() => RolesUsuario, {name: 'usuario_rolUsuario'})
  rolUsuarioId: string;

  @belongsTo(() => Ciudades, {name: 'usuario_ciudad'})
  ciudadId: string;

  @hasMany(() => SolicitudesEstudio, {keyTo: 'usuarioId'})
  usuario_solicitudesEstudio: SolicitudesEstudio[];

  constructor(data?: Partial<Usuarios>) {
    super(data);
  }
}

export interface UsuariosRelations {
  // describe navigational properties here
}

export type UsuariosWithRelations = Usuarios & UsuariosRelations;
