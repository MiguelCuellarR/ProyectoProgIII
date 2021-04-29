import {belongsTo, Entity, hasMany, model, property} from '@loopback/repository';
import {Clientes} from './clientes.model';
import {Paises} from './paises.model';
import {Proyectos} from './proyectos.model';
import {Usuarios} from './usuarios.model';

@model({
  settings: {
    foreignKeys: {
      fk_pais_id: {
        name: 'fk_pais_id',
        entity: 'Paises',
        entityKey: 'id',
        foreignKey: 'paisId',
      },
    },
  },
})
export class Ciudades extends Entity {
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
  codigo: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @belongsTo(() => Paises, {name: 'ciudad_pais'})
  paisId: string;

  @hasMany(() => Proyectos, {keyTo: 'ciudadId'})
  ciudad_proyectos: Proyectos[];

  @hasMany(() => Clientes, {keyTo: 'ciudadId'})
  ciudad_clientes: Clientes[];

  @hasMany(() => Usuarios, {keyTo: 'ciudadId'})
  ciudad_usuarios: Usuarios[];

  constructor(data?: Partial<Ciudades>) {
    super(data);
  }
}

export interface CiudadesRelations {
  // describe navigational properties here
}

export type CiudadesWithRelations = Ciudades & CiudadesRelations;
