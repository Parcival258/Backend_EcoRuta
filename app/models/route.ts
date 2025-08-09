import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, beforeSave } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import TripHistory from './trip_history.js'
import UserReward from './user_reward.js'
import Hash from '@adonisjs/core/services/hash'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare email: string

  //asi evito ataque de hombre en medio (o eso entiendo)
  @column({ serializeAs: null })
  declare password: string

  @column()
  declare nombre: string

  @column()
  declare proveedor: string | null

  @column()
  declare proveedor_id: string | null

  @column()
  declare es_admin: boolean

  @column()
  declare puntos: number

  @column.dateTime({ autoCreate: true })
  declare creado_en: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare actualizado_en: DateTime

  @hasMany(() => TripHistory, { foreignKey: 'usuario_id' })
  declare tripHistories: HasMany<typeof TripHistory>

  @hasMany(() => UserReward, { foreignKey: 'usuario_id' })
  declare userRewards: HasMany<typeof UserReward>

  //aqui hago el hash par la contraseña
  @beforeSave()
  static async hashPassword(user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }
}