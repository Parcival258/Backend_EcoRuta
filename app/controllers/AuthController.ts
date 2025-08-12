// app/Controllers/Http/AuthController.ts
import { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import { JwtService } from '#services/jwt_service'

export default class AuthController {
  // Login
  public async login({ request, response }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])

    try {
      const user = await User.verifyCredentials(email, password)
      
      // Generar JWT token
      const token = JwtService.generateToken(user)
      
      return response.ok({
        message: 'Login exitoso',
        token,
        user: {
          id: user.id,
          nombre: user.nombre,
          email: user.email,
          puntos: user.puntos,
          es_admin: user.es_admin
        }
      })
    } catch (error) {
      return response.badRequest({
        message: 'Credenciales inválidas'
      })
    }
  }

  // Registro
  public async register({ request, response }: HttpContext) {
    const { nombre, email, password, proveedor, proveedor_id } = request.only([
      'nombre', 'email', 'password', 'proveedor', 'proveedor_id'
    ])

    try {
      // si el email ya existe
      const existingUser = await User.findBy('email', email)
      if (existingUser) {
        return response.badRequest({ message: 'El email ya está registrado' })
      }

      const user = await User.create({
        nombre,
        email,
        password,
        proveedor: proveedor || null,
        proveedor_id: proveedor_id || null,
        es_admin: false,
        puntos: 0
      })
      
      // Generar JWT token automáticamente después del registro
      const token = JwtService.generateToken(user)
      
      return response.created({
        message: 'Usuario registrado exitosamente',
        token,
        user: {
          id: user.id,
          nombre: user.nombre,
          email: user.email,
          puntos: user.puntos,
          es_admin: user.es_admin
        }
      })
    } catch (error) {
      return response.badRequest({
        message: 'Error en el registro',
        error: error.message
      })
    }
  }

  // salir (con JWT, el logout es del lado del cliente)
  public async logout({ response }: HttpContext) {
    // Con JWT, el logout es manejado del lado del cliente
    // simplemente eliminando el token del almacenamiento local
    return response.ok({ message: 'Logout exitoso. Elimina el token del cliente.' })
  }

  // Obtener usuario autenticado
  public async me(ctx: HttpContext) {
    const { response } = ctx
    try {
      // El usuario viene del middleware JWT
      const user = (ctx as any).jwtUser
      
      if (!user) {
        return response.unauthorized({ message: 'No autenticado' })
      }
      
      return response.ok({
        user: {
          id: user.id,
          nombre: user.nombre,
          email: user.email,
          puntos: user.puntos,
          es_admin: user.es_admin
        }
      })
    } catch (error) {
      return response.unauthorized({ message: 'No autenticado' })
    }
  }

  // Cambiar contraseña
  public async changePassword(ctx: HttpContext) {
    const { request, response } = ctx
    const { password } = request.only(['password'])
    
    try {
      // El usuario viene del middleware JWT
      const user = (ctx as any).jwtUser
      
      if (!user) {
        return response.unauthorized({ message: 'No autenticado' })
      }
      
      // Hash para la contraseña (el modelo ya maneja esto automáticamente)
      user.password = password
      await user.save()
      
      return response.ok({ message: 'Contraseña actualizada exitosamente' })
    } catch (error) {
      return response.badRequest({
        message: 'Error al cambiar contraseña'
      })
    }
  }
}