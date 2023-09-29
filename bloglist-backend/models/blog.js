require("dotenv").config();
const { Sequelize, Model, DataTypes } = require("sequelize");

const sequelize = new Sequelize(process.env.SQL_DB_URL, {
  dialectOptions: {
  },
});

class Blog extends Model {
}

Blog.init({
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  author: { type: DataTypes.TEXT, allowNull: true },
  title: { type: DataTypes.TEXT, allowNull: false },
  url: { type: DataTypes.TEXT, allowNull: false },
  likes: { type: DataTypes.INTEGER, defaultValue: 0 },
  year: {
    type: DataTypes.INTEGER,
    validate: {
      min: 1991,
      max: new Date().getUTCFullYear() }
  } }, { sequelize, underscored: true, timestamps: false, modelName: "blog" });

module.exports =  Blog;