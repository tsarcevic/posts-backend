'use strict'

const BumblebeeTransformer = use('Bumblebee/Transformer')

/**
 * MediaTransformer class
 *
 * @class MediaTransformer
 * @constructor
 */
class MediaTransformer extends BumblebeeTransformer {
  /**
   * This method is used to transform the data.
   */
  transform(model) {
    return {
      id: model.id,
      path: model.path
      // add your transformation object here
    }
  }
}

module.exports = MediaTransformer
