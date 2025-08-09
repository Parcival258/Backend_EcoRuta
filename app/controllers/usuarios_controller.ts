import type { HttpContext } from '@adonisjs/core/http'
import User from '#models/user'
import hash from '@adonisjs/core/services/hash'
import vine from '@vinejs/vine'

// Validador inline
const createUserValidator = vine.compile(
  vine.object({
    email: vine
      .string()
      .email()
      .unique(async (db, value) => {
        const user = await db.from('users').where('email', value).first()
        return !user
      }),
    password: vine.string().minLength(6).optional(),
    nombre: vine.string().minLength(2).maxLength(100),
    proveedor: vine.string().optional().nullable(),
    proveedor_id: vine.string().optional().nullable(),
    es_admin: vine.boolean().optional(),
    puntos: vine.number().min(0).optional(),
  })
)

export default class UsersController {
  
    //Crear un nuevo usuario
  async store({ request, response }: HttpContext) {
    try {
      // Validar los datos de entrada
      const payload = await request.validateUsing(createUserValidator)

      // Hashear la contraseña si se proporciona
      if (payload.password) {
        payload.password = await hash.make(payload.password)
      }

      // Crear el usuario
      const user = await User.create({
        email: payload.email,
        password: payload.password,
        nombre: payload.nombre,
        proveedor: payload.proveedor || null,
        proveedor_id: payload.proveedor_id || null,
        es_admin: payload.es_admin || false,
        puntos: payload.puntos || 0,
      })

      // Retornar el usuario creado sin la contraseña
      const userResponse = user.serialize({
        fields: {
          omit: ['password'],
        },
      })

      return response.status(201).json({
        message: 'Usuario creado exitosamente',
        data: userResponse,
      })
    } catch (error) {
      // Si es error de validación
      if (error.messages) {
        return response.status(422).json({
          message: 'Error de validación',
          errors: error.messages,
        })
      }

      // Si es error de duplicación (email único)
      if (error.code === '23505' || error.errno === 1062) {
        return response.status(409).json({
          message: 'El email ya está registrado',
        })
      }

      // Error genérico
      return response.status(500).json({
        message: 'Error interno del servidor',
        error: error.message,
      })
    }
  }

   //Obtener todos los usuarios
  async index({ response }: HttpContext) {
    try {
      const users = await User.query()
        .select(
          'id',
          'email',
          'nombre',
          'proveedor',
          'es_admin',
          'puntos',
          'creado_en',
          'actualizado_en'
        )
        .orderBy('creado_en', 'desc')

      return response.json({
        message: 'Usuarios obtenidos exitosamente',
        data: users,
      })
    } catch (error) {
      return response.status(500).json({
        message: 'Error al obtener usuarios',
        error: error.message,
      })
    }
  }

    //Obtener un usuario específico   
  async show({ params, response }: HttpContext) {
    try {
      const user = await User.query()
        .where('id', params.id)
        .select(
          'id',
          'email',
          'nombre',
          'proveedor',
          'es_admin',
          'puntos',
          'creado_en',
          'actualizado_en'
        )
        .firstOrFail()

      return response.json({
        message: 'Usuario encontrado',
        data: user,
      })
    } catch (error) {
      return response.status(404).json({
        message: 'Usuario no encontrado',
      })
    }
  }

   //Actualizar un usuario
  async update({ params, request, response }: HttpContext) {
    try {
      const user = await User.findOrFail(params.id)

      // Validar datos (puedes crear un updateUserValidator separado)
      const payload = await request.validateUsing(createUserValidator)

      // Hashear contraseña si se proporciona
      if (payload.password) {
        payload.password = await hash.make(payload.password)
      }

      // Actualizar usuario
      user.merge({
        email: payload.email || user.email,
        password: payload.password || user.password,
        nombre: payload.nombre || user.nombre,
        proveedor: payload.proveedor !== undefined ? payload.proveedor : user.proveedor,
        proveedor_id: payload.proveedor_id !== undefined ? payload.proveedor_id : user.proveedor_id,
        es_admin: payload.es_admin !== undefined ? payload.es_admin : user.es_admin,
        puntos: payload.puntos !== undefined ? payload.puntos : user.puntos,
      })

      await user.save()

      const userResponse = user.serialize({
        fields: {
          omit: ['password'],
        },
      })

      return response.json({
        message: 'Usuario actualizado exitosamente',
        data: userResponse,
      })
    } catch (error) {
      if (error.messages) {
        return response.status(422).json({
          message: 'Error de validación',
          errors: error.messages,
        })
      }

      if (error.code === 'E_ROW_NOT_FOUND') {
        return response.status(404).json({
          message: 'Usuario no encontrado',
        })
      }

      return response.status(500).json({
        message: 'Error al actualizar usuario',
        error: error.message,
      })
    }
  }

   //Eliminar un usuario
  async destroy({ params, response }: HttpContext) {
    try {
      const user = await User.findOrFail(params.id)
      await user.delete()

      return response.json({
        message: 'Usuario eliminado exitosamente',
      })
    } catch (error) {
      if (error.code === 'E_ROW_NOT_FOUND') {
        return response.status(404).json({
          message: 'Usuario no encontrado',
        })
      }

      return response.status(500).json({
        message: 'Error al eliminar usuario',
        error: error.message,
      })
    }
  }
}
