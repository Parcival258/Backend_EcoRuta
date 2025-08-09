import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, belongsTo } from '@adonisjs/lucid/orm'
import type { HasMany, BelongsTo } from '@adonisjs/lucid/types/relations'
import TripHistory from './trip_history.js'
import User from './user.js'

export default class Route extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare nombre: string

  @column()
  declare descripcion: string

  @column()
  declare modo: string

  @column()
  declare path: any

  @column()
  declare distancia_m: number

  @column()
  declare co2_ahorrado_estimado_g: number | null

  @column()
  declare creado_por: number | null

  @column()
  declare es_publica: boolean

  @column.dateTime({ autoCreate: true })
  declare creado_en: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare actualizado_en: DateTime

  @hasMany(() => TripHistory, { foreignKey: 'ruta_id' })
  declare tripHistories: HasMany<typeof TripHistory>

  @belongsTo(() => User, { foreignKey: 'creado_por' })
  declare creator: BelongsTo<typeof User>
}
