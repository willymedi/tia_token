import {Sequelize} from 'sequelize'

const db = new Sequelize(
    'tia', 'postgres', 'postgres', {
        host: 'localhost',
        port: 5433,
        dialect: 'postgres',
        dialectOptions: {
            useUTC: false, // for reading from database
          },
        timezone: 'America/Guayaquil'
    }
)

export default db
