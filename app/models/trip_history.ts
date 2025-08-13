import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import User from './user.js'
import Route from './routes.js'

export default class TripHistory extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare usuario_id: number

  @column()
  declare ruta_id: number | null

  @column()
  declare modo: string

  @column.dateTime()
  declare iniciado_en: DateTime

  @column.dateTime()
  declare terminado_en: DateTime | null

  @column()
  declare distancia_m: number | null

  @column({columnName: 'co2_ahorrado_g'})
  declare co2_ahorrado_g: number | null

  @column()
  declare path_registrado: any

  @column.dateTime({ autoCreate: true })
  declare creado_en: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare actualizado_en: DateTime

  @belongsTo(() => User, { foreignKey: 'usuario_id' })
  declare user: BelongsTo<typeof User>

  @belongsTo(() => Route, { foreignKey: 'ruta_id' })
  declare route: BelongsTo<typeof Route>
}
