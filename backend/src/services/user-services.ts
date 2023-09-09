import {User} from "../models/user"
import {MissingFieldsError} from "../exceptions/missing-fields-error"
import {UserRepository} from "../repository/user/user-repository"
import { UserExistError } from '../exceptions/user-exist-error'
import { UserNotExistError } from "../exceptions/user-not-exist-error"

export class UserService {

    constructor(private readonly userRepository: UserRepository) {}
    
    async createUser(userData: any): Promise<User| null> {
        console.log(new Date())
        const { username, first_name } = userData;
        if (!username) {
            throw new MissingFieldsError("username")
        }
        if (!first_name) {
            throw new MissingFieldsError("first_name")
        }
        const user_exist = await this.userRepository.getByUsername(username);
        if (user_exist) {
            throw new UserExistError(username)
        }
        return await this.userRepository.createUser({username, first_name}) 
    }

    async getUser(userData: any): Promise<User| null> {
        console.log(new Date())
        const { username} = userData;
        if (!username) {
            throw new MissingFieldsError("username")
        }
        const user_exist = await this.userRepository.getByUsername(username);
        if (!user_exist) {
            throw new UserNotExistError(username)
        }
        return user_exist;
    }


}
