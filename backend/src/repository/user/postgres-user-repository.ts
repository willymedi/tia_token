import { User } from "../../models/user";
import { UserRepository } from "./user-repository";

export class PostgresUserRepository implements UserRepository {
    async getByUsername(username: string): Promise<User | null> {
        return await User.findOne({where: {username}})
    }
    async createUser(user_data: any): Promise<User | null> {
        const user =  new User(user_data)
        return await user.save();
    }
    
    
}