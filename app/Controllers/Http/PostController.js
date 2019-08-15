'use strict'

//bring in model
const Post = use('App/Models/Post')

//validator
const {validate} = use('Validator')

class PostController {

  async index({request, response, user}) {
    const posts = await Post.query()
      .where('user_id', user.id)
      .forPage(request.get().page !== null ? request.get().page : 1, 20)
      .fetch()

    if (posts === null) {
      return reponse.badRequest({message: "There are no posts available"})
    }

    return response.ok(posts)
  }

  async search({request, response}) {

    const searchParameter = request.input('q')

    const posts = await Post.query()
      .where('title', 'like', '%' + searchParameter + '%')
      .fetch()

    if (posts == null) {
      return reponse.badRequest({message: "There are no posts available"})
    }

    return response.ok(posts)

  }

  async show({response, post}) {

    return response.ok(post)
  }

  async store({request, response, user}) {

    const allParams = request.only(['title', 'body'])

    const validation = await validate(allParams, {
      title: 'required|min:5|max:20',
      body: 'required|min:5'
    })

    if (validation.fails()) {
      return response.badRequest(validation.messages())
    }

    //let post = await Post.store(request.only['title', 'description'])

    // const post = new Post()
    //
    // post.title = request.input('title')
    // post.body = request.input('description')
    // post.user_id = request.input('user_id')

    const post = await user.posts().create({
      title: allParams.title,
      body: allParams.body
    })

    return response.ok(post)
  }

  async delete({response, post}) {
    await post.delete()

    return response.ok(post)
  }

  async update({request, response, post}) {
    const allParams = request.only(Post.allowed)
    const validation = await validate(allParams, {
      title: 'min:5|max:20',
      body: 'min:5'
    })

    if (validation.fails()) {
      return response.badRequest(validation.messages())
    }

    post.merge(allParams)
    await post.save()

    return response.ok(post)
  }

}

module
  .exports = PostController
