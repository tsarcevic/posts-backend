'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */

/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class TokenMiddleware {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle({request, response, auth}, next) {
    // call next to advance the request

    try {
      await auth.check()
    } catch {
      return response.badRequest("Invalid or missing token")
    }

    await next()
  }
}

module.exports = TokenMiddleware
