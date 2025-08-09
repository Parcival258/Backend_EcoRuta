import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import UserReward from './user_reward.js'

export default class Reward extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare titulo: string

  @column()
  declare descripcion: string

  @column()
  declare costo_puntos: number

  @column()
  declare activo: boolean

  @column()
  declare imagen: string | null

  @column.dateTime({ autoCreate: true })
  declare creado_en: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare actualizado_en: DateTime

  @hasMany(() => UserReward, { foreignKey: 'recompensa_id' })
  declare userRewards: HasMany<typeof UserReward>
}
