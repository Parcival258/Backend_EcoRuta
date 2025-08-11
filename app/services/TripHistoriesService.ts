import TripHistory from '#models/trip_history'

export default class TripHistoriesService {
  static async listByUser(userId: number) {
    return TripHistory.query()
      .where('usuario_id', userId)
      .preload('route')
      .orderBy('iniciado_en', 'desc')
  }

  static async findById(userId: number, id: number) {
    return TripHistory.query()
      .where('usuario_id', userId)
      .where('id', id)
      .preload('route')
      .first()
  }

  static async create(userId: number, data: any) {
    return TripHistory.create({
      ...data,
      usuarioId: userId,
    })
  }

  static async update(userId: number, id: number, data: any) {
    const trip = await this.findById(userId, id)
    if (!trip) return null

    trip.merge(data)
    await trip.save()
    return trip
  }

  static async delete(userId: number, id: number) {
    const trip = await this.findById(userId, id)
    if (!trip) return null

    await trip.delete()
    return true
  }
}
