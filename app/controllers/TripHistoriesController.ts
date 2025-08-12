import type { HttpContext } from '@adonisjs/core/http'
import TripHistoriesService from '#services/TripHistoriesService'

export default class TripHistoriesController {
  async index(ctx: HttpContext) {
    // El usuario viene del middleware JWT
    const user = (ctx as any).jwtUser
    return TripHistoriesService.listByUser(user.id)
  }

  async show(ctx: HttpContext) {
    const { params, response } = ctx
    // El usuario viene del middleware JWT
    const user = (ctx as any).jwtUser
    const trip = await TripHistoriesService.findById(user.id, params.id)
    if (!trip) return response.notFound({ message: 'Viaje no encontrado' })
    return trip
  }

  async store(ctx: HttpContext) {
    const { request, response } = ctx
    // El usuario viene del middleware JWT
    const user = (ctx as any).jwtUser
    
    const data = request.only([
      'ruta_id',
      'modo',
      'iniciado_en',
      'terminado_en',
      'distancia_m',
      'co2_ahorrado_g',
      'path_registrado',
    ])

    if (!data.modo || !data.iniciado_en) {
      return response.badRequest({ message: 'Faltan campos obligatorios: modo, iniciado_en' })
    }

    return TripHistoriesService.create(user.id, data)
  }

  async update(ctx: HttpContext) {
    const { params, request, response } = ctx
    // El usuario viene del middleware JWT
    const user = (ctx as any).jwtUser
    
    const data = request.only([
      'ruta_id',
      'modo',
      'iniciado_en',
      'terminado_en',
      'distancia_m',
      'co2_ahorrado_g',
      'path_registrado',
    ])

    const trip = await TripHistoriesService.update(user.id, params.id, data)
    if (!trip) return response.notFound({ message: 'Viaje no encontrado' })
    return trip
  }

  async destroy(ctx: HttpContext) {
    const { params, response } = ctx
    // El usuario viene del middleware JWT
    const user = (ctx as any).jwtUser
    const deleted = await TripHistoriesService.delete(user.id, params.id)
    if (!deleted) return response.notFound({ message: 'Viaje no encontrado' })
    return { message: 'Viaje eliminado' }
  }
}
