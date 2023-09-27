const {Sequelize, QueryTypes} = require("sequelize");
const logger = require("./utils/logger");

const sequelize = new Sequelize(process.env.SQL_DB_URL);

const main = async () => {
    try {
        await sequelize.authenticate();
        const blogs = await sequelize.query('SELECT * FROM blogs', {type: QueryTypes.SELECT});
        // logger.info("connected to postgres")
        // console.log(blogs);

        // console.log("Executing (default): SELECT * FROM blogs");
        blogs.forEach((blog) => {
            console.log(`${blog.author}: '${blog.title}', ${blog.likes} likes`);
        })


        sequelize.close();
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
};

main();