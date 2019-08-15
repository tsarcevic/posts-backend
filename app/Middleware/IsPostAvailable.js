'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Post = use('App/Models/Post')

class IsPostAvailable {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle(ctx, next) {

    const {params, response, user} = ctx

    if (params.id != null) {
      const post = await Post.find(params.id)

      if (!post) {
        return response.notFound("Post not found")
      }

      if (post.user_id !== user.id) {
        return response.badRequest("Not your post!")
      }

      ctx.post = post
    }
    // call next to advance the request
    await next()
  }
}

module.exports = IsPostAvailable
