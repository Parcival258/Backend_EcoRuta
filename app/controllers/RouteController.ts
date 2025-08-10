import RouteServices  from "../services/RouteServices.js";
import { HttpContext } from '@adonisjs/core/http'

export default class RouteController {

    public async getAll({response}: HttpContext) {
        const routes= await RouteServices.getAll()
        return response.ok(routes)
    }

    public async getById({params, response}: HttpContext) {
        const route = await RouteServices.getById(params.id)
        return response.ok(route)
    }

    public async create({request, response}: HttpContext) {
        const data = request.only(['nombre', 'descripcion', 'modo','path','distancia_m','co2_ahorrado_estimado','creado_por'])
        const route = await RouteServices.create(data)
        return response.created(route)
    }
    
    public async update({params, request, response}: HttpContext) {
        const data = request.only(['nombre', 'descripcion', 'modo','path','distancia_m','co2_ahorrado_estimado','creado_por'])
        const route = await RouteServices.update(params.id, data)
        return response.ok(route)
    }

    public async delete({params, response}: HttpContext) {
        await RouteServices.delete(params.id)
        return response.noContent()
    }
}