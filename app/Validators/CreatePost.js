'use strict'

class CreatePost {
  get rules() {
    return {
      'title': 'required|min:5|max:20',
      'description': 'required|min:5'
    }
  }

  get messages() {
    return {
      'required': '{{ field }} is required',
      'min': 'Minimum number for {{field}} is }',
      'max': 'Maximum number for {{ field }} is'
    }
  }

  async fails(error) {
    this.ctx.response.badRequest(error)
  }
}

module.exports = CreatePost
