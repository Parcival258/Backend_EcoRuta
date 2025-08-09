import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'routes'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('nombre').notNullable()
      table.text('descripcion').nullable()
      table.string('modo').notNullable()
      table.json('path').nullable()
      table.integer('distancia_m').nullable()
      table.decimal('co2_ahorrado_estimado', 10, 2).nullable()
      table.integer('creado_por').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.boolean('es_publica').defaultTo(false)
      table.timestamp('creado_en', { useTz: true })
      table.timestamp('actualizado_en', { useTz: true })
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
