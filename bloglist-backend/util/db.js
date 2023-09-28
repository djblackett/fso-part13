const Sequelize = require("sequelize");
const { SQL_DB_URL } = require("./config");

const sequelize = new Sequelize(SQL_DB_URL);

const connectToDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log("connected to the database");
  } catch (err) {
    console.log("failed to connect to the database");
    return process.exit(1);
  }

  return null;
};

module.exports = { connectToDatabase, sequelize };