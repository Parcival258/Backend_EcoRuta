// app/Controllers/Http/UsersController.ts
import { HttpContext } from '@adonisjs/core/http'
import UserService from '../services/UserServices.js'

export default class UsersController {
  public async index({ response }: HttpContext) {
    const users = await UserService.getAll()
    return response.ok(users)
  }

  public async show({ params, response }: HttpContext) {
    const user = await UserService.getById(params.id)
    return response.ok(user)
  }

  public async store({ request, response }: HttpContext) {
    const data = request.only(['nombre', 'email', 'password'])
    const user = await UserService.create(data)
    return response.created(user)
  }

  public async update({ params, request, response }: HttpContext) {
    const data = request.only(['nombre', 'email', 'password','es_admin','puntos'])
    const user = await UserService.update(params.id, data)
    return response.ok(user)
  }

  public async destroy({ params, response }: HttpContext) {
    await UserService.delete(params.id)
    return response.noContent()
  }
}
