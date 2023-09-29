const jwt = require("jsonwebtoken");
const router = require("express").Router();

const { SECRET } = require("../util/config");
const User = require("../models/user");
const bcrypt = require("bcrypt");
const { Token } = require("../models/token");

router.post("/", async (request, response) => {
  const body = request.body;

  const user = await User.findOne({
    where: {
      username: body.username
    }
  });

  if (!user) {
    response.status(404).json({ error: "username not found" });
    return;
  }

  if (user.disabled) {
    response.status(403).send("user account is disabled");
    return;
  }

  const passwordCorrect = bcrypt.compare(body.password, user.password);
  await console.log("passwordCorrect:", passwordCorrect);

  if (!(user && passwordCorrect)) {
    return response.status(401).json({
      error: "password incorrect"
    });
  }

  const userForToken = {
    username: user.username,
    id: user.id,
  };

  const token = jwt.sign(userForToken, SECRET);
  await Token.create({
    userId: user.id,
    token: token,
  });

  response
    .status(200)
    .send({ token, username: user.username, name: user.name });
});

module.exports = router;