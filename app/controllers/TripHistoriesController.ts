import type { HttpContext } from '@adonisjs/core/http'
import TripHistoriesService from '#services/TripHistoriesService'

export default class TripHistoriesController {
  async index({ auth }: HttpContext) {
    return TripHistoriesService.listByUser(auth.user!.id)
  }

  async show({ params, auth, response }: HttpContext) {
    const trip = await TripHistoriesService.findById(auth.user!.id, params.id)
    if (!trip) return response.notFound({ message: 'Viaje no encontrado' })
    return trip
  }

  async store({ request, auth, response }: HttpContext) {
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

    return TripHistoriesService.create(auth.user!.id, data)
  }

  async update({ params, request, auth, response }: HttpContext) {
    const data = request.only([
      'ruta_id',
      'modo',
      'iniciado_en',
      'terminado_en',
      'distancia_m',
      'co2_ahorrado_g',
      'path_registrado',
    ])

    const trip = await TripHistoriesService.update(auth.user!.id, params.id, data)
    if (!trip) return response.notFound({ message: 'Viaje no encontrado' })
    return trip
  }

  async destroy({ params, auth, response }: HttpContext) {
    const deleted = await TripHistoriesService.delete(auth.user!.id, params.id)
    if (!deleted) return response.notFound({ message: 'Viaje no encontrado' })
    return { message: 'Viaje eliminado' }
  }
}
