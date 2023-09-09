import {Token} from "../models/token"
import {MissingFieldsError} from "../exceptions/missing-fields-error"
import {TokenRepository} from "../repository/token/token-repository"
import {UserRepository} from "../repository/user/user-repository"
import { UserNotExistError } from '../exceptions/user-not-exist-error'
import * as speakeasy from 'speakeasy';
import { DateTime } from 'luxon';

// Configura la zona horaria deseada, en este caso, 'America/Guayaquil'
const zonaHoraria = 'America/Guayaquil';

const secret = speakeasy.generateSecret({ length: 20 });

function generateOTP(): string {
  const token = speakeasy.totp({
    secret: secret.base32,
    encoding: 'base32',
    digits: 6,
  });

  return token;
}
export class TokenService {

    constructor(private readonly tokenRepository: TokenRepository,
        private readonly userRepository: UserRepository) {}
    
    private async generateNewToken(user_id: number): Promise<Token| null> {
        const token_value = generateOTP();
        const valid = true;
        const createdAt = DateTime.now().setZone(zonaHoraria);
        //const createdAt = new Date();
        //const expired_at = new Date(createdAt.getTime() + 60000); 
        const expired_at =createdAt.plus({ seconds: 60 });
        return await this.tokenRepository.createTooken({ token_value, user_id, valid, createdAt, expired_at });
    }

    async generateToken(username: string): Promise<Token| null> {
        if (!username) {
            throw new MissingFieldsError("username")
        }
        const user_exist = await this.userRepository.getByUsername(username);
        if (!user_exist) {
            throw new UserNotExistError(username)
        }
        const token = await this.tokenRepository.getTokenValidByUser(user_exist.id);
        if (!token) {
            return this.generateNewToken(user_exist.id)
        }
        const current_date = DateTime.now().setZone(zonaHoraria);
        console.log(current_date)
        if (token && token.expired_at && current_date > DateTime.fromJSDate(token.expired_at)) {
            console.log(current_date.toMillis())
            console.log(token.expired_at.getMilliseconds())
            await this.tokenRepository.updateTokenValid({valid:false}, token)
            return this.generateNewToken(user_exist.id)

        }
        return token
    }

}
