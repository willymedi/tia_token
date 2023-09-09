import { DataTypes, Model } from 'sequelize';
import db from '../databases/postgresql/database';
class UserModel extends Model {
    public id!: number;
    public username!: string;
    public first_name!: string;
}

UserModel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
          },
          username: {
            type: DataTypes.STRING(255),
            allowNull: false,
            unique: true,
          },
          first_name: {
            type: DataTypes.STRING(255),
          }
    },
    {
        sequelize: db,
        tableName: 'users',
        modelName: 'User',
    }
);
export { UserModel as User };