import { User } from "../../models/user";

export interface UserRepository {

    getByUsername(username: string): Promise<User| null>;
    createUser(user: any):Promise<User | null>;
}