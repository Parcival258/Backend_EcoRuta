import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'users'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('email').notNullable().unique()
      table.string('password').notNullable()
      table.string('nombre').notNullable()
      table.string('proveedor').nullable()
      table.string('proveedor_id').nullable()
      table.boolean('es_admin').defaultTo(false)
      table.integer('puntos').defaultTo(0)
      table.timestamp('creado_en', { useTz: true })
      table.timestamp('actualizado_en', { useTz: true })
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
