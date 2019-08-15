'use strict'

const BumblebeeTransformer = use('Bumblebee/Transformer')

/**
 * UserTransformer class
 *
 * @class UserTransformer
 * @constructor
 */
class UserTransformer extends BumblebeeTransformer {

  static get availableInclude() {
    return ['posts', 'medias']
  }

  /**
   * This method is used to transform the data.
   */
  transform(model) {
    return {
      id: model.id,
      username: model.username

      // add your transformation object here
    }
  }

  includePosts(model) {
    return this.collection(model.getRelated('posts'), 'PostTransformer')
  }

  includeMedias(model) {
    return this.collection(model.getRelated('medias'), 'MediaTransformer')
  }

}

module.exports = UserTransformer

