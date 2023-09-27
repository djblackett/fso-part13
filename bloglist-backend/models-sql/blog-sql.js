require('dotenv').config()
const {Sequelize, Model, DataTypes} = require('sequelize')

const sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialectOptions: {

        // ssl: {
        //     require: true,
        //     rejectUnauthorized: false
        // }
    },
});

class Blog extends Model {
}

Blog.init({
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    author: {type: DataTypes.TEXT, allowNull: true},
    title: {type: DataTypes.TEXT, allowNull: false},
    url: {type: DataTypes.TEXT, allowNull: false},
    likes: {type: DataTypes.INTEGER, default: 0}
}, {sequelize, underscored: true, timestamps: false, modelName: 'blog'})

Blog.sync()

module.exports = { Blog }