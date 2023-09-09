import { TokenUsage } from "../models/tokenUsage";
import { UserRepository } from "../repository/user/user-repository";
import { TokenRepository } from "../repository/token/token-repository";
import { TokenUsageRepository } from "../repository/tokenUsage/token-usage-repository";
import { MissingFieldsError } from "../exceptions/missing-fields-error";
import { UserNotExistError } from "../exceptions/user-not-exist-error";
import { TokenInvalidError } from "../exceptions/token-invalid-error";

export class TokenUssageService {

    constructor(private readonly tokenUsageRepository: TokenUsageRepository,
        private readonly tokenRepository: TokenRepository,
        private readonly userRepository: UserRepository) {}
    
    async useToken(username: string, token_value: string): Promise<TokenUsage| null> {
        if (!username) {
            throw new MissingFieldsError("cliente")
        }
        if (!token_value) {
            throw new MissingFieldsError("token")
        }
        const user_exist = await this.userRepository.getByUsername(username);
        if (!user_exist) {
            throw new UserNotExistError(username)
        }
        const token = await this.tokenRepository.getByIdTokenValue(token_value)
        if (!token) {
            throw new TokenInvalidError(token_value)
        }
        const token_usage_data = {
            token_id: token.id,
            used_by: user_exist.id,
            used_at: new Date()
        }
        return await this.tokenUsageRepository.saveTokenUsage(token_usage_data)
    }

    async getAllTokenUsage(username: string): Promise<Array<any> | null> {
        if (!username) {
            throw new MissingFieldsError("cliente")
        }
        const user_exist = await this.userRepository.getByUsername(username);
        if (!user_exist) {
            throw new UserNotExistError(username)
        }
        return await this.tokenUsageRepository.getByUserName(user_exist.id)
    }


}