import { Token } from "../../models/token";
import { TokenRepository } from "./token-repository";

export class PostgresTokenRepository implements TokenRepository {
    async createTooken(token_data: any): Promise<Token | null> {
        const token = new Token(token_data)
        return await token.save()
    }
    async getTokenValidByUser(user_id: number): Promise<Token | null> {
        return await Token.findOne({
            where: {valid: true, user_id:user_id}
        })
    }
    async updateTokenValid(token_data: any, token: Token): Promise<Token | null> {
        return await token.update(token_data)
    }
    async getByIdUser(user_id: number): Promise<Token | null> {
        const token = await  Token.findOne({
            where: { user_id: user_id },
        })
        return token;
    }

    async getByIdTokenValue(tokenValue: string): Promise<Token | null> {
        const token = await  Token.findOne({
            where: { token_value: tokenValue, valid: true },
        })
        return token;
    }
    
}