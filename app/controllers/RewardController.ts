import RewardServices from "../services/RewardService.js";
import { HttpContext } from '@adonisjs/core/http'

export default class RewardController {
    public async getAll({response}: HttpContext) {
        const reward= await RewardServices.getAll()
        return response.ok(reward)
    }

    public async getById({params, response}: HttpContext){
        const reward= await RewardServices.getById(params.id);
        return response.ok(reward);
    }

    public async create({request, response}: HttpContext){
        const data= request.only(['titulo', 'descripcion', 'costo_puntos','activo','imagen']);
        const reward= await RewardServices.create(data);
        return response.created(reward);
    }

    public async update({params, request, response}: HttpContext){
        const data= request.only(['titulo', 'descripcion', 'costo_puntos','activo','imagen']);
        const reward= await RewardServices.update(params.id, data);
        return response.ok(reward);
    }

    public async delete({params, response}: HttpContext){
        await RewardServices.delete(params.id);
        return response.noContent();
    }
}