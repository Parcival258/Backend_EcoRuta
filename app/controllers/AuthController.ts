// app/Controllers/Http/AuthController.ts
import { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'

export default class AuthController {
  // Login
  public async login({ auth, request, response }: HttpContext) {
    const { email, password } = request.only(['email', 'password'])

    try {
      const user = await User.verifyCredentials(email, password)
      await auth.use('web').login(user)
      
      return response.ok({
        message: 'Login exitoso',
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
  public async register({ auth, request, response }: HttpContext) {
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
      
      // Login automático después del registro
      await auth.use('web').login(user)
      
      return response.created({
        message: 'Usuario registrado exitosamente',
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

  // salir
  public async logout({ auth, response }: HttpContext) {
    try {
      await auth.use('web').logout()
      return response.ok({ message: 'Logout exitoso' })
    } catch (error) {
      return response.badRequest({ message: 'Error en logout' })
    }
  }

  // Obtener usuario autenticado
  public async me({ auth, response }: HttpContext) {
    try {
      const user = auth.use('web').user
      
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

  // Cambiar contraseña (si queda tiempo)
  public async changePassword({ auth, request, response }: HttpContext) {
    const { password } = request.only(['password'])
    
    try {
      const user = auth.use('web').user
      
      if (!user) {
        return response.unauthorized({ message: 'No autenticado' })
      }
      //hash para la contraseña
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