require("dotenv").config();
const { Model, DataTypes, Sequelize } = require("sequelize");
const sequelize = new Sequelize(process.env.SQL_DB_URL);

class Token extends Model {
}

Token.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: "users", key: "id" },
  },
  token: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: new Date()
  },
}, {
  sequelize,
  underscored: true,
  timestamps: true,
  updatedAt: false,
  modelName: "token"
});

module.exports = { Token };