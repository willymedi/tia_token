import { TokenUsage } from "../../models/tokenUsage";

export interface TokenUsageRepository {

    saveTokenUsage(tokenUsageData: any): Promise<TokenUsage | null>;
    getByUserName(user_id: number): Promise<Array<any>| null>;
}