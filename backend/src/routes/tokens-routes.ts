import express from 'express'
import { TokenService } from '../services/token-services'
import { PostgresTokenRepository } from '../repository/token/postgres-token-repository';
import { PostgresUserRepository } from '../repository/user/postgres-user-repository';
import {MissingFieldsError} from "../exceptions/missing-fields-error"
import { UserNotExistError } from '../exceptions/user-not-exist-error'
import { TokenUssageService } from '../services/token-usage-services';
import { PostgresTokenUsageRepository } from '../repository/tokenUsage/postgres-token-usage-repository';
import { TokenInvalidError } from '../exceptions/token-invalid-error';
import { DateTime } from 'luxon';
const router = express.Router()

router.get('/generarToken/', async(req, res) => {

    try {
        const username = req.query.cliente as string
        const tokenService = new TokenService(new PostgresTokenRepository(), new PostgresUserRepository())
        const token = await tokenService.generateToken(username)
        if (!token) {
            return res.status(400).json({ error: "No se pudo crear el token" });
        }
        if (!token.expired_at) {
            return res.status(400).json({ error: "No existe fecha de expiracion" });
        }
        const tokenJson = {
            id: token.id,
            token_value: token.token_value,
            user_id: token.user_id,
            valid: token.valid, 
            createdAt: DateTime.fromJSDate(token.createdAt),
            expired_at: DateTime.fromJSDate(token.expired_at)
        }
        return res.status(200).json(tokenJson);
    }
    catch(error){
        if (error instanceof MissingFieldsError) {
            console.error('Missing Fields Error:', error.message);
            return res.status(400).json({ error: error.message });
        }
        if (error instanceof UserNotExistError) {
            return res.status(400).json({error: error.message});
        }
        console.error('Unknown Error:', error);
        return res.status(500).json({ error: 'An unknown error occurred' });
    }
})

router.get('/usarToken/', async(req, res) => {

    try {
        const username = req.query.cliente as string
        const token = req.query.token as string
        const tokenUsageService = new TokenUssageService(new PostgresTokenUsageRepository(), new PostgresTokenRepository(), new PostgresUserRepository())
        const token_usage = await tokenUsageService.useToken(username,  token)
        return res.status(200).json(token_usage);
    }
    catch(error){
        if (error instanceof MissingFieldsError) {
            console.error('Missing Fields Error:', error.message);
            return res.status(400).json({ error: error.message });
        }
        if (error instanceof UserNotExistError) {
            return res.status(400).json({error: error.message});
        }
        if (error instanceof TokenInvalidError) {
            return res.status(400).json({error: error.message});
        }
        console.error('Unknown Error:', error);
        return res.status(500).json({ error: 'An unknown error occurred' });
    }
})

router.get('/tokenUsos/', async(req, res) => {

    try {
        const username = req.query.cliente as string
        const tokenUsageService = new TokenUssageService(new PostgresTokenUsageRepository(), new PostgresTokenRepository(), new PostgresUserRepository())
        const all_token_usage = await tokenUsageService.getAllTokenUsage(username)
        if (!all_token_usage) {
            return res.status(400).json({ error: "Algo paso, volver a intentar" });
        }
        const datosConZonaHoraria = all_token_usage.map((item) => ({
            ...item,
            token_usage_used_at: DateTime.fromJSDate(item.token_usage_used_at),
        }));
        return res.status(200).json(datosConZonaHoraria);
    }
    catch(error){
        if (error instanceof MissingFieldsError) {
            console.error('Missing Fields Error:', error.message);
            return res.status(400).json({ error: error.message });
        }
        if (error instanceof UserNotExistError) {
            return res.status(400).json({error: error.message});
        }
        console.error('Unknown Error:', error);
        return res.status(500).json({ error: 'An unknown error occurred' });
    }
})

export default router