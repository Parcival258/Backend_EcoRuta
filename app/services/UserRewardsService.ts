import UserReward from "#models/user_reward";

export default class UserRewardsService {
    public static async getAll() {
        return await UserReward.all();
    }

    public static async getById(id: number) {
        return await UserReward.findOrFail(id);
    }

    public static async create(data: Partial<UserReward>) {
        return await UserReward.create(data);
    }

    public static async update(id: number, data: Partial<UserReward>) {
        const userReward = await UserReward.findOrFail(id);
        userReward.merge(data);
        await userReward.save();
        return userReward;
    }
    
    public static async delete(id: number) {
        const userReward = await UserReward.findOrFail(id);
        await userReward.delete();
        return userReward;
    }
}