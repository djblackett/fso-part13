const router = require("express").Router();
const bcrypt = require("bcrypt");

const { User, Blog } = require("../models");

router.get("/", async (req, res) => {
  const users = await User.findAll({
    attributes: { exclude: ["password", "createdAt", "updatedAt"] },
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

  await User.create(user);
  res.json({ username, name });

});

router.get("/:id", async (req, res) => {

  let where = {};
  if (req.query.read === "true") {
    where = { read: true };
  }
  if (req.query.read === "false") {
    where = { read: false };
  }

  const user = await User.findByPk(req.params.id, {
    attributes: { exclude: ["password", "createdAt", "updatedAt", "blogs", "id"] },
    include: [

      {
        model: Blog,
        as: "readings",
        attributes: { exclude: ["userId"] },
        through: {
          attributes: ["read", "id"],
          where: where
        },
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