const router = require("express").Router();
const bcrypt = require("bcrypt");

const { User, Blog } = require("../models");

router.get("/", async (req, res) => {
  const users = await User.findAll({
    include: {
      model: Blog,
      attributes: { exclude: ["userId"] }
    }
  });
  res.json(users);
});

router.post("/", async (req, res) => {
  const { username, name, password } = req.body;

  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = {
    username,
    name,
    password: passwordHash
  };

  console.log("user:", user);

  const userNew = await User.create(user);
  console.log("user after save: ", userNew);
  res.json(userNew);

});

router.get("/:id", async (req, res) => {
  const user = await User.findByPk(req.params.id, {
    attributes: { exclude: ["password", "createdAt", "updatedAt", "blogs", "id"] },
    include: [
    //     {
    //   model: Blog,
    //   attributes: { exclude: ["userId"] }
    // },
      {
        model: Blog,
        as: "readings",
        attributes: { exclude: ["userId"] },
        through: {
          attributes: ["read", "id"]
        }
      }]
  });

  if (user) {
    res.json(user);
  } else {
    res.status(404).end();
  }
});

router.put("/:username", async (req, res) => {
  const currentUsername = req.params.username;
  const newUsername = req.body.username;
  await User.update({ username: newUsername }, {
    returning: true,
    where: {
      username: currentUsername
    }
  });

  res.json({ message: `username updated to ${newUsername}` });
});

module.exports = router;