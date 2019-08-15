'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class PostsSchema extends Schema {
  up() {
    this.create('posts', (table) => {
      table.increments()
      table.string('title')
      table.string('body')
      table.integer('user_id').notNullable().unsigned().references('users.id').onDelete('cascade')
      table.timestamps()
    })
  }

  down() {
    this.drop('posts')
  }
}

module.exports = PostsSchema
