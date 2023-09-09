import express from 'express'
import {MissingFieldsError} from "../exceptions/missing-fields-error"
import { UserExistError } from '../exceptions/user-exist-error'
import {UserService} from "../services/user-services"
import {PostgresUserRepository} from "../repository/user/postgres-user-repository"
import { UserNotExistError } from '../exceptions/user-not-exist-error'
const router = express.Router()

router.post('/', async (req, res) => {

    try {
        if (Object.keys(req.body).length === 0) {
            return res.status(400).json({ error: 'El cuerpo de la solicitud está vacío' });
          }
        const userService = new UserService(new PostgresUserRepository());
        const newUser = await userService.createUser(req.body)
        return res.status(201).json(newUser);
    }
    catch(error) {
        if (error instanceof MissingFieldsError) {
            console.error('Missing Fields Error:', error.message);
            return res.status(400).json({ error: error.message });
        }
        if (error instanceof UserExistError) {
            console.error('User exist:', error.message);
            return res.status(400).json({ error: error.message });
        }
        console.error('Unknown Error:', error);
        return res.status(500).json({ error: 'An unknown error occurred' });
    }
})
router.post('/login', async (req, res) => {

    try {
        if (Object.keys(req.body).length === 0) {
            return res.status(400).json({ error: 'El cuerpo de la solicitud está vacío' });
          }
        const userService = new UserService(new PostgresUserRepository());
        const newUser = await userService.getUser(req.body)
        return res.status(200).json(newUser);
    }
    catch(error) {
        if (error instanceof MissingFieldsError) {
            console.error('Missing Fields Error:', error.message);
            return res.status(400).json({ error: error.message });
        }
        if (error instanceof UserNotExistError) {
            console.error('User exist:', error.message);
            return res.status(400).json({ error: error.message });
        }
        console.error('Unknown Error:', error);
        return res.status(500).json({ error: 'An unknown error occurred' });
    }
})

export default router