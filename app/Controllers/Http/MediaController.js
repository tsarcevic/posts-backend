'use strict'

/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */

/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with media
 */


const UploadService = use('App/Services/UploadService')
const Helpers = use('Helpers')

class MediaController {
  /**
   * Show a list of all media.
   * GET media
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({request, response, view}) {
  }

  /**
   * Render a form to be used for creating a new media.
   * GET media/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */

  async store({request, response, user}) {

    const file = request.file('file', {
      allowedExtensions: ['jpg', 'jpeg', 'png'],
      size: '1mb'
    })

    if (!file) {
      return response.badRequest({message: "You haven't sent any file!"})
    }

    const media = await UploadService.uploadImage(user, request, file)

    return response.ok(media)
  }

  /**
   * Display a single media.
   * GET media/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({response, media}) {

    return response.ok(Helpers.resourcesPath(media.path))
  }

  /**
   * Render a form to update an existing media.
   * GET media/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */

  async update({params, request, response}) {
  }

  /**
   * Delete a media with id.
   * DELETE media/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({params, request, response}) {
  }
}

module.exports = MediaController
