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
import {CambiarClave, Credenciales, ResetearClave, Usuarios} from '../models';
import {CiudadesRepository, RolesUsuarioRepository, UsuariosRepository} from '../repositories';
import {FuncionesGeneralesService, NotificacionesService, SesionService} from '../services';

@authenticate('administrador')
export class UsuarioController {
  constructor(
    @repository(UsuariosRepository)
    public usuariosRepository: UsuariosRepository,
    @repository(RolesUsuarioRepository)
    public rolUsuarioRepository: RolesUsuarioRepository,
    @repository(CiudadesRepository)
    public ciudadRepository: CiudadesRepository,

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
    if (usuarioCreado) {
      let rol = await this.rolUsuarioRepository.findOne({where: {id: usuarioCreado.rolUsuarioId}});
      let ciudad = await this.ciudadRepository.findOne({where: {id: usuarioCreado.ciudadId}});

      if (!rol) {
        this.usuariosRepository.delete(usuarioCreado);
        throw new HttpErrors[401]("Este rol no existe");
      } else {

        let contenido = `Hola Buen día ${usuarioCreado.nombres}
          <br/>Bienvenido a la plataforma de la Constructora UdeC S.A.S, sus credenciales de acceso son: <br/>
          <ul>
            <li>Usuario: ${usuarioCreado.correo_electronico}
            <li>Contraseña: ${claveAleatoria}
            <li>Rol: ${rol.nombre}
          </ul>
          Gracias por Confiar en nuestra plataforma.
          `;
          this.servicioNotificaciones.EnviarCorreoElectronico(usuarioCreado.correo_electronico, llaves.asuntoNuevoUsuario, contenido);

        if(!ciudad){
          usuarioCreado.ciudadId = '';
          this.usuariosRepository.update(usuarioCreado);
          throw new HttpErrors[401]("Esta ciudad no existe");
        }
      }
    }
    return usuarioCreado;
  }

  @authenticate.skip()
  @post('/change-password')
  @response(200, {
    content: {'application/json': {schema: getModelSchemaRef(CambiarClave)}},
  })
  async cambiarClave(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(CambiarClave),
        },
      },
    })
    cambiarClave: CambiarClave,
  ): Promise<Object> {

    let usuario = await this.usuariosRepository.findOne({where: {correo_electronico: cambiarClave.correo}})
    if (!usuario) {
      throw new HttpErrors[401]("Este usuario no existe");
    }
    let verificado = null;
    try {
      if (cambiarClave.clave === usuario.contrasena) {
        verificado = "correcto"
        let claveCifrada = this.servicioFunciones.CifrarTexto(cambiarClave.nuevaClave);
        console.log(claveCifrada);

        usuario.contrasena = claveCifrada;
        await this.usuariosRepository.update(usuario);
        let contenido = `Hola Buen dia ${usuario.nombres}, sus credenciales de acceso a la plataforma son: <br/>
          <ul>
            <li>Usuario:  ${usuario.correo_electronico}
            <li>Contraseña: ${cambiarClave.nuevaClave}
          </ul>
          Gracias por confiar en nuestra plataforma.
        `;

        this.servicioNotificaciones.EnviarCorreoElectronico(usuario.correo_electronico, llaves.asuntocambioClave, contenido);
      }
      else {
        throw new HttpErrors[401]("Las credenciales no son correctas o incompletas, verifique otra vez.");
      }

    } catch (error) {
      throw new HttpErrors[401]("Complete el formulario.");
    }
    return {
      procesado: verificado
    };
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
    let contenido = `Hola Buen día, sus credenciales de acceso son: Usuario: ${usuario.correo_electronico} y Contraseña: ${claveAleatoria}.
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
