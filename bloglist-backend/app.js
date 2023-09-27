const express = require("express");
const cors = require("cors");
const config = require("./utils/config");
const logger = require("./utils/logger");
require("express-async-errors");
const mongoose = require("mongoose");
const blogsRouter = require("./controllers/blogs");
const middleware = require("./utils/middleware");
const usersRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");
const blogsSqlRouter = require("./controllers/blogs-sql")
const {NODE_ENV} = require("./utils/config");
require("dotenv").config();
const {Sequelize, QueryTypes} = require("sequelize");

logger.info("connecting to", config.DATABASE_URL);

// mongoose.connect(config.DATABASE_URL)
//     .then(() => {
//         logger.info("connected to MongoDB");
//     })
//     .catch((error) => {
//         logger.error("error connecting to MongoDB:", error.message);
//     });


const sequelize = new Sequelize(process.env.SQL_DB_URL);

const main = async () => {
    try {
        await sequelize.authenticate();
        // const blogs = await sequelize.query("SELECT * FROM blogs", {type: QueryTypes.SELECT});
        logger.info("connected to postgres")
        // console.log(blogs);
        // sequelize.close();
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
};

main();


const app = express();
app.use(cors());
// app.use(express.static("bloglist-frontend/build"));
app.use(express.json());
app.use(middleware.requestLogger);


app.use(middleware.tokenExtractor);
// app.use("/blogs", middleware.userExtractor, blogsRouter);
app.use("/blogs", blogsSqlRouter);
app.use("/users", usersRouter);
app.use("/login", loginRouter);

if (config.NODE_ENV === "test") {
    const testingRouter = require("./controllers/testing");
    app.use("/testing", testingRouter);
}


app.get("/health", (req, res) => {
    if (res.statusCode !== 200) {
        res.status(500).send("error");
    }
    res.status(200).send("ok");
});

app.get("/version", (req, res) => {
    res.send("1"); // change this string to ensure a new version deployed
});

app.get("/env", (req, res) => {
    res.json({node_env: NODE_ENV});
});

app.use(express.static("build"));

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;