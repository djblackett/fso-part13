const { Token } = require("../models/token");
const logoutRouter = require("express").Router();

logoutRouter.delete("/", async (req, res) => {
  const token = await Token.destroy({
    where: {
      userId: req.user.id
    }
  });

  if (token) {
    res.sendStatus(200);
  } else {
    res.status(404).json({ error: "something unexpected happened" });
  }

});


module.exports = { logoutRouter };