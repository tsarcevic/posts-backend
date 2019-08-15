'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Media = use('App/Models/Media')

class IsImageAvailable {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle(ctx, next) {
    const {params, response} = ctx

    if (params.id != null) {
      const media = await Media.find(params.id)

      if (!media) {
        return response.notFound("Image not found")
      }

      ctx.media = media
    }
    // call next to advance the request
    await next()
  }
}

module.exports = IsImageAvailable
