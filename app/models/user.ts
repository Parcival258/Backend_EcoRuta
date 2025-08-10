import { DateTime } from 'luxon'
import { BaseModel, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import TripHistory from './trip_history.js'
import UserReward from './user_reward.js'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import { compose } from '@adonisjs/core/helpers'
import hash from '@adonisjs/core/services/hash'
import Routes from './routes.js'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email'],
  passwordColumnName: 'password',
})

export default class User extends compose(BaseModel, AuthFinder) {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare email: string

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

  @hasMany(()=> Routes, { foreignKey: 'usuario_id' })
  declare routes: HasMany<typeof Routes>
}