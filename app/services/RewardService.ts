import Reward from '../models/reward.js';

export default class RewardService {
    public static async getAll(){
        return await Reward.all();
    }

    public static async getById(id:number){
        return await Reward.findOrFail(id);
    }

    public static async create(data:Partial<Reward>){
        return await Reward.create(data)
    }

    public static async update(id:number, data:Partial<Reward>){
        const reward =await Reward.findOrFail(id);
        reward.merge(data);
        await reward.save();
        return reward;
    }

    public static async delete(id:number){
        const ruta = await Reward.findOrFail(id);
        await ruta.delete();
        return ruta;
    }
}