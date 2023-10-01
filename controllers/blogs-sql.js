const blogsSqlRouter = require("express").Router();
const Blog = require("../models/blog");
const { User } = require("../models");
const { Op } = require("sequelize");

const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id, {
    include: {
      model: User,
      attributes: ["name", "username"]
    }
  });
  next();
};

blogsSqlRouter.get("/", async (req, res) => {

  const { search } = req.query;
  let queryOptions = {};
  let where = {};
  if (search) {
    queryOptions.title = {
      [Op.iLike]: `%${search}%`  // Use the Op.like operator for LIKE queries
    };
    queryOptions.author = {
      [Op.iLike]: `%${search}%`
    };

    where = {
      [Op.or]: [{ title: queryOptions.title }, { author: queryOptions.author }]
    };
  }

  const blogs = await Blog.findAll({
    order: [
      ["likes", "DESC"]
    ],
    attributes: { exclude: ["userId"] },
    include: {
      model: User,
      attributes: [ "name", "username"]
    },
    where
  });
  res.json(blogs);
});

blogsSqlRouter.get("/:id", blogFinder, async (req, res) => {
  if (req.blog) {
    res.json(req.blog);
  } else {
    res.status(404).end();
  }
});

blogsSqlRouter.get("/", async (req, res) => {

  const { search } = req.query;


  let queryOptions = {};
  if (search) {
    queryOptions.title = {
      [Op.substring]: `${search}`  // Use the Op.like operator for LIKE queries
    };
  }

  const blogs = await Blog.findAll({
    attributes: { exclude: ["userId"] },
    include: {
      model: User,
      attributes: ["name", "username"]
    },
    where: queryOptions
  });

  console.log(blogs);
  res.json(blogs);
});

blogsSqlRouter.post("/", async (request, response) => {
  try {
    const user = request.user;
    const blog = await Blog.create({ ...request.body, userId: user.id });
    response.status(201).json(blog);
  } catch (error) {
    return response.status(400).json({ error });
  }
});


blogsSqlRouter.delete("/:id", blogFinder, async (req, res) => {
  console.log(req.blog);
  console.log(req.user);
  if (req.blog && req.user) {
    if (req.blog.userId === req.user.id) {
      await req.blog.destroy();
      res.status(204).end();
    } else {
      res.status(403).send("Users can only delete blogs created by them.");
    }
  } else {
    res.status(404).send("Blog not found");
  }
});


blogsSqlRouter.put("/:id", blogFinder, async (req, res) => {
  if (req.blog) {
    req.blog.likes = req.blog.likes + 1;
    await req.blog.save();
    res.json({ likes: req.blog.likes });
  } else {
    const error = new Error("No blog with id " + req.params.id + " found");
    return res.status(404).json({ error: error.message });
  }
});

module.exports = blogsSqlRouter;