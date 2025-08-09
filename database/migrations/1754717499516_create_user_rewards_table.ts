import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'user_rewards'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('usuario_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table
        .integer('recompensa_id')
        .unsigned()
        .references('id')
        .inTable('rewards')
        .onDelete('CASCADE')
      table.timestamp('canjeado_en', { useTz: true }).nullable()
      table.string('estado').notNullable()
      table.unique(['usuario_id', 'recompensa_id'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
