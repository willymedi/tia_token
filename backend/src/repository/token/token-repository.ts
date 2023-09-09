import { Token } from "../../models/token";

export interface TokenRepository {

    getTokenValidByUser(user_id: number): Promise<Token| null>;
    createTooken(token_data: any): Promise<Token| null>;
    updateTokenValid(token_data: any, token: Token): Promise<Token| null>;
    getByIdUser(user_id: number): Promise<Token| null>;
    getByIdTokenValue(tokenValue: string): Promise<Token | null>;
}