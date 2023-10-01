require("dotenv").config();
const express = require("express");
const cors = require("cors");
const config = require("./util/config");
const logger = require("./util/logger");
require("express-async-errors");
const blogsSqlRouter = require("./controllers/blogs-sql");
const usersRouter = require("./controllers/users");
const loginRouter = require("./controllers/login");
const { NODE_ENV } = require("./util/config");
const { Sequelize, QueryTypes } = require("sequelize");
const { errorHandler, unknownEndpoint, requestLogger, tokenExtractor, userExtractor } = require("./util/middleware");
const { authorsRouter } = require("./controllers/authors");
const { readingListsRouter } = require("./controllers/readingLists");
const { logoutRouter } = require("./controllers/logout");

const sequelize = new Sequelize(process.env.SQL_DB_URL);

const app = express();
app.use(cors());

app.use(express.json());
app.use(requestLogger);

// Should I move users and login to before tokenExtactor?
app.use("/users", usersRouter);
app.use("/login", loginRouter);
app.use("/authors", authorsRouter);
app.use(tokenExtractor);
// app.use("/blogs", middleware.userExtractor, blogsRouter);
app.use("/blogs", userExtractor, blogsSqlRouter);


app.use("/authors", authorsRouter);
app.use("/readinglists", userExtractor, readingListsRouter);
app.use("/logout", userExtractor, logoutRouter);

// if (config.NODE_ENV === "test") {
//     const testingRouter = require("./controllers/testing");
//     app.use("/testing", testingRouter);
// }


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
  res.json({ node_env: NODE_ENV });
});

app.use(express.static("build"));

app.use(unknownEndpoint);
app.use(errorHandler);

module.exports = app;