'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */

/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

class IsUserLogged {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle(ctx, next) {
    // call next to advance the request

    const {auth, response} = ctx

    try {
      await auth.check()
    } catch {
      return response.badRequest({
        message: "Invalid or missing token"
      })
    }

    const user = await auth.getUser()

    if (user === null) {
      return response.notFound("User not found")
    }

    ctx.user = user

    await next()
  }
}

module.exports = IsUserLogged
