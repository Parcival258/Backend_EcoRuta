import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'
import User from './user.js'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'

export default class Routes extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare nombre: string
  @column()
  declare descripcion: string
  @column()
  declare modo: string
  @column()
  declare path: string
  @column()
  declare distancia_m: number
  @column({columnName: 'co2_ahorrado_estimado'})
  declare co2_ahorrado_estimado: number
  @column()
  declare creado_por: number | null
  @column()
  declare es_publica: boolean
  @column.dateTime({ autoCreate: true })
    declare creado_en: DateTime
  @column.dateTime({ autoCreate: true, autoUpdate: true })
    declare actualizado_en: DateTime

  @belongsTo(() => User, { foreignKey: 'creado_por' })
  declare user: BelongsTo<typeof User>
 
}
