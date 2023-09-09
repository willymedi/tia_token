import { TokenUsage } from "../../models/tokenUsage";
import { pool } from '../../databases/postgresql/pg';
import { QueryResult } from 'pg';
import { TokenUsageRepository } from "./token-usage-repository";
import { getAllTokenUsage } from "../../databases/postgresql/query/getAllTokenUsage";

export class PostgresTokenUsageRepository implements TokenUsageRepository {
    async saveTokenUsage(tokenUsageData: any): Promise<TokenUsage | null> {
        const tokenUsage = new TokenUsage(tokenUsageData)
        return await tokenUsage.save()
    }
    async getByUserName(user_id: number): Promise<any | null> {
        const response: QueryResult = await pool.query(getAllTokenUsage, [user_id]);
        return response.rows
    }
   
    
}