const Helpers = use('Helpers')

const User = use('App/Models/User')

module.exports = {
  async uploadImage(user, request, file) {

    const fileName = `${new Date().getTime()}.${file.subtype}`

    await file.move(Helpers.resourcesPath('uploads'), {
      name: fileName
    })

    if (!file.moved()) {
      return response.badRequest({message: "File moving error"})
    }


    const media = await user.medias().create({
      name: fileName,
      size: file.size,
      path: `uploads/${fileName}`
    })

    return media
  }
}
