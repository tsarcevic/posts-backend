'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Post extends Model {

  static get allowed() {
    return ['title', 'body']
  }

  users() {
    return this.belongsTo('App/Models/User')
  }
}

module.exports = Post
