import {authenticate} from '@loopback/authentication';
import {service} from '@loopback/core';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, HttpErrors, param,
  patch, post,
  put,
  requestBody,
  response
} from '@loopback/rest';
import {keys as llaves} from '../config/keys';
import {Credenciales, ResetearClave, Usuarios} from '../models';
import {RolesUsuarioRepository, UsuariosRepository} from '../repositories';
import {FuncionesGeneralesService, NotificacionesService, SesionService} from '../services';

@authenticate('administrador')
export class UsuarioController {
  constructor(
    @repository(UsuariosRepository)
    public usuariosRepository: UsuariosRepository,
    @repository(RolesUsuarioRepository)
    public rolUsuarioRepository: RolesUsuarioRepository,

    @service(FuncionesGeneralesService)
    public servicioFunciones: FuncionesGeneralesService,
    @service(NotificacionesService)
    public servicioNotificaciones: NotificacionesService,
    @service(SesionService)
    public servicioSesion: SesionService
  ) { }

  @post('/usuarios')
  @response(200, {
    description: 'Usuarios model instance',
    content: {'application/json': {schema: getModelSchemaRef(Usuarios)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuarios, {
            title: 'NewUsuarios',
            exclude: ['id', 'contrasena'],
          }),
        },
      },
    })
    usuarios: Omit<Usuarios, 'id'>,
  ): Promise<Usuarios> {
    let claveAleatoria = this.servicioFunciones.GenerarClaveAleatoria();

    let claveCifrada = this.servicioFunciones.CifrarTexto(claveAleatoria);


    usuarios.contrasena = claveCifrada;
    let usuarioCreado = await this.usuariosRepository.create(usuarios);
    let rol = await this.rolUsuarioRepository.findById(usuarioCreado.rolUsuarioId);

    //Buscando el rol que tiene el usuario


    //notificacion via email, necesitamos decir que rol es
    if (usuarioCreado) {
      let contenido = `Hola buen dìa<br/> usted se ha reportado en nuestra plataforma, sus npmnciales, son: <br/>
      <ul>
      <li>Usuario: ${usuarioCreado.correo_electronico}
      <li>Contraseña: ${claveAleatoria}
      <li>Rol: ${rol.nombre}
      <ul/>
      Gracias por Confiar en nuestra plataforma.
      `
      this.servicioNotificaciones.EnviarCorreoElectronico(usuarioCreado.correo_electronico, llaves.asuntoNuevoUsuario, contenido);
    }
    return usuarioCreado;
  }

  @authenticate.skip()
  @post('/reset-password')
  @response(200, {
    content: {'application/json': {schema: getModelSchemaRef(ResetearClave)}},
  })
  async resetPassword(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(ResetearClave),
        },
      },
    })
    resetearClave: ResetearClave,
  ): Promise<Object> {

    let usuario = await this.usuariosRepository.findOne({where: {correo_electronico: resetearClave.correo}})
    if (!usuario) {
      throw new HttpErrors[401]("Este usuario no existe");
    }
    let claveAleatoria = this.servicioFunciones.GenerarClaveAleatoria();
    console.log(claveAleatoria);

    let claveCifrada = this.servicioFunciones.CifrarTexto(claveAleatoria);
    console.log(claveCifrada);

    usuario.contrasena = claveCifrada;
    await this.usuariosRepository.update(usuario);
    let contenido = `Hola, sus datos son: Usuario: ${usuario.correo_electronico} y Contraseña: ${claveAleatoria}.
      `;

    this.servicioNotificaciones.EnviarNotificacionPorSMS(usuario.telefono_celular, contenido);
    return {
      envio: "OK"
    };
  }

  @authenticate.skip()
  @post('/identificar-usuario')
  async validar(
    @requestBody(
      {
        content: {
          'application/json': {
            schema: getModelSchemaRef(Credenciales)
          }
        }
      }
    )
    credenciales: Credenciales
  ): Promise<object> {
    let usuario = await this.usuariosRepository.findOne({where: {correo_electronico: credenciales.nombre_usuario, contrasena: credenciales.clave}});
    if (usuario) {
      let token = this.servicioSesion.GenerarToken(usuario)
      return {
        user: {
          username: usuario.correo_electronico,
          role: usuario.rolUsuarioId
        },
        tk: token
      };
    } else {
      throw new HttpErrors[401]("Las credenciales no son correctas");
    }
  }

  @get('/usuarios/count')
  @response(200, {
    description: 'Usuarios model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Usuarios) where?: Where<Usuarios>,
  ): Promise<Count> {
    return this.usuariosRepository.count(where);
  }

  @get('/usuarios')
  @response(200, {
    description: 'Array of Usuarios model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Usuarios, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Usuarios) filter?: Filter<Usuarios>,
  ): Promise<Usuarios[]> {
    return this.usuariosRepository.find(filter);
  }

  @patch('/usuarios')
  @response(200, {
    description: 'Usuarios PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuarios, {partial: true}),
        },
      },
    })
    usuarios: Usuarios,
    @param.where(Usuarios) where?: Where<Usuarios>,
  ): Promise<Count> {
    return this.usuariosRepository.updateAll(usuarios, where);
  }

  @get('/usuarios/{id}')
  @response(200, {
    description: 'Usuarios model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Usuarios, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Usuarios, {exclude: 'where'}) filter?: FilterExcludingWhere<Usuarios>
  ): Promise<Usuarios> {
    return this.usuariosRepository.findById(id, filter);
  }

  @patch('/usuarios/{id}')
  @response(204, {
    description: 'Usuarios PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuarios, {partial: true}),
        },
      },
    })
    usuarios: Usuarios,
  ): Promise<void> {
    await this.usuariosRepository.updateById(id, usuarios);
  }

  @authenticate.skip()
  @put('/usuarios/{id}')
  @response(204, {
    description: 'Usuarios PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() usuarios: Usuarios,
  ): Promise<void> {
    await this.usuariosRepository.replaceById(id, usuarios);
  }

  @del('/usuarios/{id}')
  @response(204, {
    description: 'Usuarios DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.usuariosRepository.deleteById(id);
  }
}
