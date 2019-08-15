'use strict'

const User = use('App/Models/User')
const Mail = use('Mail')

const {validate} = use('Validator')
const crypto = require('crypto')


class UserController {

  async store({request, response, auth}) {

    const {username, email, password} = request.only(['username', 'email', 'password'])

    const validation = await validate(request.all(), {
      username: 'required|min:5|max:20',
      email: 'required|min:5|max:20|email',
      password: 'required|min:5|max:20',
    })

    if (validation.fails()) {
      return response.badRequest(validation.messages())
    }

    const token = await crypto.randomBytes(10).toString('hex')

    const user = await User.create({
      username: username,
      email: email,
      password: password,
      validationToken: token,
      isEnabled: false
    })

    await auth.attempt(email, password)

    await Mail.send('email', {user}, (message) => {
      message
        .from('activation@tomislav.com')
        .to(email)
    })

    //const loggedUser = await auth.attempt(user.email, user.password)

    return response.ok({message: "Validation mail has ben sent"})
  }

  async login({request, response, auth}) {
    const {email, password} = request.only(['email', 'password'])

    const validation = await validate(request.all(), {
      email: 'required|email',
      password: 'required',
    })

    if (validation.fails()) {
      return response.badRequest("Bad request")
    }

    try {
      const loggedUser = await auth.attempt(email, password)
      if (loggedUser) {
        const user =
          await User.findBy('email', email)

        if (user.isEnabled === 0) {
          return response.unauthorized({message: "You have to validate your account"})
        }

        return response.ok(loggedUser)
      } else {
        return response.badRequest({message: "User does not exist"})
      }
    } catch (error) {
      return response.badRequest({message: "User does not exist"})
    }

  }

  async getInfo({response, user, transform}) {
    const loggedUser = await User.query()
      .where('id', user.id)
      .with('posts', (p) => {
        p.orderBy('created_at', 'desc')
      })
      .with('medias')
      .first()

    //return loggedUser

    return response.ok(await transform.include(['posts', 'medias']).item(loggedUser, 'UserTransformer'))
  }

  async validateMail({response, params}) {
    const user = await User.query()
      .where("validationToken", params.token)
      .first()

    if (user === null) {
      return response.badRequest({message: "Token is invalid or already validated"})
    } else {
      user.merge({
        isEnabled: true,
        validationToken: null
      })
      await user.save()

      return response.ok(user)
    }
  }
}

module.exports = UserController
