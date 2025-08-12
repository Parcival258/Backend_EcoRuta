import jwt from 'jsonwebtoken'
import env from '#start/env'
import type User from '#models/user'

export interface JwtPayload {
  userId: number
  email: string
  iat?: number
  exp?: number
}

export class JwtService {
  private static readonly JWT_SECRET = env.get('APP_KEY') || 'your-super-secret-key'
  private static readonly JWT_EXPIRES_IN = '24h'

  /**
   * Genera un token JWT para el usuario
   */
  static generateToken(user: User): string {
    const payload: Omit<JwtPayload, 'iat' | 'exp'> = {
      userId: user.id,
      email: user.email
    }

    return jwt.sign(payload, this.JWT_SECRET, {
      expiresIn: this.JWT_EXPIRES_IN
    })
  }

  /**
   * Verifica y decodifica un token JWT
   */
  static verifyToken(token: string): JwtPayload {
    try {
      return jwt.verify(token, this.JWT_SECRET) as JwtPayload
    } catch (error) {
      throw new Error('Token inválido o expirado')
    }
  }

  /**
   * Decodifica un token sin verificar (para debugging)
   */
  static decodeToken(token: string): JwtPayload | null {
    try {
      return jwt.decode(token) as JwtPayload
    } catch (error) {
      return null
    }
  }

  /**
   * Extrae el token del header Authorization
   */
  static extractTokenFromHeader(authHeader: string | undefined): string | null {
    if (!authHeader) {
      return null
    }

    const parts = authHeader.split(' ')
    
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
      return null
    }

    return parts[1]
  }
}
