'use strict'

const BumblebeeTransformer = use('Bumblebee/Transformer')

/**
 * PostTransformer class
 *
 * @class PostTransformer
 * @constructor
 */
class PostTransformer extends BumblebeeTransformer {
  /**
   * This method is used to transform the data.
   */
  transform(model) {
    return {
      id: model.id,
      title: model.title,
      body: model.body
      // add your transformation object here
    }
  }
}

module.exports = PostTransformer
