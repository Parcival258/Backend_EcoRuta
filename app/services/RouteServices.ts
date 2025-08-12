import Route from "../models/routes.js";

export default class RouteServices {
    public static async getAll() {
        return await Route.all()
    }

    //obtener un usuario por ID
    public static async getById(id: number) {
        return await Route.findOrFail(id)
    }

    //crear un nuevo usuario
    public static async create(data: Partial<Route>) {
        return await Route.create(data)
    }

    //actualizar un usuario
    public static async update(id: number, data: Partial<Route>) {
        const ruta = await Route.findOrFail(id)
        ruta.merge(data)
        await ruta.save()
        return ruta
    }

    //eliminar un usuario
    public static async delete(id: number) {
        const ruta = await Route.findOrFail(id)
        await ruta.delete()
        return ruta
    }

}