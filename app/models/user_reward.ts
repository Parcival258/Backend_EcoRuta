import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import User from './user.js'
import Reward from './reward.js'

export default class UserReward extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare usuario_id: number

  @column()
  declare recompensa_id: number

  @column.dateTime()
  declare canjeado_en: DateTime | null

  @column()
  declare estado: string

  @belongsTo(() => User, { foreignKey: 'usuario_id' })
  declare user: BelongsTo<typeof User>

  @belongsTo(() => Reward, { foreignKey: 'recompensa_id' })
  declare reward: BelongsTo<typeof Reward>
}
