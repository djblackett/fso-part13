const http = require("http");
require("dotenv").config();
const app = require("./app"); // the actual Express application
const config = require("./util/config");
const logger = require("./util/logger");
const {connectToDatabase} = require("./util/db");


const server = http.createServer(app);

const start = async () => {
  await connectToDatabase();
  server.listen(config.PORT, () => {
    logger.info(`Server running on port ${config.PORT}`);
  })
};

start();