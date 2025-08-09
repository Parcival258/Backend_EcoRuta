import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'rewards'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('titulo').notNullable()
      table.text('descripcion').nullable()
      table.integer('costo_puntos').notNullable()
      table.boolean('activo').defaultTo(true)
      table.string('imagen').nullable()
      table.timestamp('creado_en', { useTz: true })
      table.timestamp('actualizado_en', { useTz: true })
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
