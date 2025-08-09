// app/Services/UserService.ts
import User from '#models/user'

export default class UserService {
   //obtener todos los usuarios
  public static async getAll() {
    return await User.all()
  }

   //obtener un usuario por ID
  public static async getById(id: number) {
    return await User.findOrFail(id)
  }

   //crear un nuevo usuario
  public static async create(data: Partial<User>) {
    return await User.create(data)
  }
  
   //actualizar un usuario
  public static async update(id: number, data: Partial<User>) {
    const user = await User.findOrFail(id)
    user.merge(data)
    await user.save()
    return user
  }

   //eliminar un usuario
  public static async delete(id: number) {
    const user = await User.findOrFail(id)
    await user.delete()
    return user
  }
}
