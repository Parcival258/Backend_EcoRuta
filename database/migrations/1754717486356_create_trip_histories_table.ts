import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'trip_histories'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('usuario_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.integer('ruta_id').unsigned().references('id').inTable('routes').onDelete('CASCADE')
      table.string('modo').notNullable()
      table.timestamp('iniciado_en', { useTz: true }).nullable()
      table.timestamp('terminado_en', { useTz: true }).nullable()
      table.integer('distancia_m').nullable()
      table.decimal('co2_ahorrado_g', 10, 2).nullable()
      table.json('path_registrado').nullable()
      table.timestamp('creado_en', { useTz: true })
      table.timestamp('actualizado_en', { useTz: true })
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
