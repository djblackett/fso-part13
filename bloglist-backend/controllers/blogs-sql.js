const blogsSqlRouter = require('express').Router();
const { Blog }  = require("../models-sql/blog-sql");

blogsSqlRouter.get("/", async (request, response) => {
    const blogs = await Blog.findAll();
    response.json(blogs);
});

blogsSqlRouter.post("/", async (request, response) => {

    const body = request.body;
    // const user = request.user;

    const blogObj = {
        title: body.title,
        author: body.author,
        url: body.url,
        // user: user._id.toString()
    };

    // console.log(blogObj);
    //
    // console.log(typeof user.id);

    try {
        const blog = await Blog.create(request.body);
        // const result = await blog.save();

        // user.blogs = user.blogs.concat(result._id);
        // await user.save();
        // console.log(result);
        response.status(201).json(blog);
    } catch (error) {
        return response.status(400).json({error})
    }
})


blogsSqlRouter.delete("/:id", async (req, res) => {
    try {
        await Blog.destroy({
            where: {
                id: req.params.id
            }
        })
    } catch (error) {
        return res.status(404).json({error})
    }
});

module.exports = { blogsSqlRouter }