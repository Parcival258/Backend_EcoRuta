import UserRewardsService from '#services/UserRewardsService';
import { HttpContext } from '@adonisjs/core/http'


export default class UserRewardsController {
    public async getAll({ response }: HttpContext) {
        const userRewards = await UserRewardsService.getAll();
        return response.ok(userRewards);
    }
    
    public async getById({ params, response }: HttpContext) {
        const userReward = await UserRewardsService.getById(params.id);
        return response.ok(userReward);
    }

    public async create({ request, response }: HttpContext) {
        const data = request.only(['usuario_id', 'recompensa_id', 'canjeado_en', 'estado']);
        const userReward = await UserRewardsService.create(data);
        return response.created(userReward);
    }

    public async update({ params, request, response }: HttpContext) {
        const data = request.only(['usuario_id', 'recompensa_id', 'canjeado_en', 'estado']);
        const userReward = await UserRewardsService.update(params.id, data);
        return response.ok(userReward);
    }

    public async delete({ params, response }: HttpContext) {
        await UserRewardsService.delete(params.id);
        return response.noContent();
    }
}