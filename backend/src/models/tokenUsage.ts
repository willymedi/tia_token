import { DataTypes, Model } from 'sequelize';
import db from '../databases/postgresql/database';
import { Token } from './token';
import { User } from './user';
class TokenUsageModel extends Model {
    public id!: number;
    public token_id!: number;
    public used_by!: number;
    public used_at!: Date;
}

TokenUsageModel.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
          },
          token_id: {
            type: DataTypes.INTEGER,
            references: {
              model: 'Token',
              key: 'id',
            },
          },
          used_by: {
            type: DataTypes.INTEGER,
            references: {
              model: 'Users',
              key: 'id',
            },
          },
          used_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW,
          },
        
    },
    {
        sequelize: db,
        tableName: 'tokenusage',
        modelName: 'TokenUsage',
    }
);

TokenUsageModel.belongsTo(Token, { foreignKey: "token_id",  targetKey: "id" });
TokenUsageModel.belongsTo(User, { foreignKey: 'used_by', targetKey: "id"  });
export { TokenUsageModel as TokenUsage };