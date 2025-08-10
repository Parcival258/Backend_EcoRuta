// app/Services/AuthService.ts
import User from '#models/user'
import hash from '@adonisjs/core/services/hash'

export default class AuthService {
  // Método para login
  public static async login(email: string, password: string) {
    // Buscar usuario por email
    const user = await User.findBy('email', email)
    
    if (!user) {
      throw new Error('Usuario no encontrado')
    }

    // Verificar contraseña
    const isValidPassword = await hash.verify(user.password, password)
    
    if (!isValidPassword) {
      throw new Error('Contraseña incorrecta')
    }

    return user
  }

  // Método para registro con hash de contraseña
  public static async register(data: {
    nombre: string
    email: string
    password: string
    proveedor?: string
    proveedor_id?: string
  }) {
    // Verificar si el email ya existe
    const existingUser = await User.findBy('email', data.email)
    
    if (existingUser) {
      throw new Error('El email ya está registrado')
    }

    // Hash de la contraseña
    const hashedPassword = await hash.make(data.password)

    // Crear usuario con contraseña hasheada
    const user = await User.create({
      ...data,
      password: hashedPassword,
      es_admin: false,
      puntos: 0
    })

    return user
  }

  // Verificar si un usuario existe por email
  public static async getUserByEmail(email: string) {
    return await User.findBy('email', email)
  }

  // Cambiar contraseña
  public static async changePassword(userId: number, newPassword: string) {
    const user = await User.findOrFail(userId)
    user.password = await hash.make(newPassword)
    await user.save()
    return user
  }
}