import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'
import { JwtService } from '#services/jwt_service'
import User from '#models/user'

/**
 * JWT Auth middleware para autenticar solicitudes usando JWT tokens
 */
export default class JwtAuthMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    const { request, response } = ctx

    try {
      // Extraer el token del header Authorization
      const authHeader = request.header('Authorization')
      const token = JwtService.extractTokenFromHeader(authHeader)

      if (!token) {
        return response.unauthorized({
          message: 'Token de acceso requerido'
        })
      }

      // Verificar el token
      const payload = JwtService.verifyToken(token)

      // Buscar el usuario
      const user = await User.find(payload.userId)

      if (!user) {
        return response.unauthorized({
          message: 'Usuario no encontrado'
        })
      }

      // Agregar el usuario al contexto de forma personalizada
      // Usamos una propiedad personalizada para evitar conflictos con el sistema de auth de AdonisJS
      ;(ctx as any).jwtUser = user

      return next()
    } catch (error) {
      return response.unauthorized({
        message: 'Token inválido o expirado'
      })
    }
  }
}
