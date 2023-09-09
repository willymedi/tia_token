import { DataTypes, Model } from 'sequelize';
import db from '../databases/postgresql/database';

class TokenModel extends Model {
    public id!: number;
    public token_value!: string;
    public user_id!: number;
    public createdAt!: Date;
    public expired_at!: Date | null;
    public valid!: boolean;
}

TokenModel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        token_value: {
            type: DataTypes.CHAR(6),
            allowNull: false,
        },
        user_id: {
            type: DataTypes.INTEGER,
            references: {
                model: 'Users',
                key: 'user_id',
            },
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
        },
        expired_at: {
            type: DataTypes.DATE,
            allowNull: true,
        },
        valid: {
            type: DataTypes.BOOLEAN,
            defaultValue: true,
        },
    },
    {
        sequelize: db,
        tableName: 'token',
        modelName: 'Token',
    }
);

export { TokenModel as Token };