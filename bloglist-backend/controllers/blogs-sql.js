const blogsSqlRouter = require("express").Router();
const Blog = require("../models/blog");
const { User } = require("../models");

const blogFinder = async (req, res, next) => {
  req.blog = await Blog.findByPk(req.params.id, {
  });
  next();
};

blogsSqlRouter.get("/", async (request, response) => {
  const blogs = await Blog.findAll({
    attributes: { exclude: ["userId"] },
    include: {
      model: User,
      attributes: ["name"]
    }
  });
  response.json(blogs);
});

blogsSqlRouter.get("/:id", blogFinder, async (req, res) => {
  if (req.blog) {
    res.json(req.blog);
  } else {
    res.status(404).end();
  }
});

blogsSqlRouter.post("/", async (request, response) => {
  try {
    const blog = await Blog.create(request.body);
    response.status(201).json(blog);
  } catch (error) {
    return response.status(400).json({ error });
  }
});


blogsSqlRouter.delete("/:id", blogFinder, async (req, res) => {
  if (req.blog) {
    await req.blog.destroy();
  }
  res.status(204).end();
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