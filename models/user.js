require("dotenv").config();
const { Model, DataTypes, Sequelize } = require("sequelize");
const sequelize = new Sequelize(process.env.SQL_DB_URL);

class User extends Model {
}

User.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  username: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  disabled: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  sequelize,
  underscored: true,
  timestamps: true,
  modelName: "user"
});

module.exports = User;
