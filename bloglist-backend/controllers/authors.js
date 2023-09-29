const Blog = require("../models/blog");
const { sequelize } = require("../util/db");
const authorsRouter = require("express").Router();

authorsRouter.get("/", async (req, res) => {
  const results = await Blog.findAll({
    attributes: ["author", [sequelize.fn("COUNT", sequelize.col("id")), "articles"], [sequelize.fn("SUM", sequelize.col("likes")), "likes"]],
    group: ["author"],
    order: [
      ["likes", "DESC"]
    ],
    raw: true
  });

  res.json(results);
});


module.exports = { authorsRouter };