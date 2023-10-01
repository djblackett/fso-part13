const { ReadingList } = require("../models");
const readingListsRouter = require("express").Router();


readingListsRouter.get("/", async (req, res) => {
  const rList = await ReadingList.findAll({
    attributes: ["id", "userId", "blogId", "read"]
  });

  res.json(rList);
});

readingListsRouter.post("/", async (req, res) => {
  const rList = await ReadingList.create(req.body);
  res.json(rList);
});


readingListsRouter.put("/:id", async (req, res) => {
  const user = req.user;
  console.log("user:", user);
  const readingList = await ReadingList.findByPk(req.params.id);
  console.log("reading-list:", readingList);

  if (!readingList) {
    res.status(404).send("reading list not found");
    return;
  }

  if (user.id === readingList.userId) {
    // await ReadingList.update({ read: true }, {
    //   returning: true,
    //   where: {
    //     id: req.params.id
    //   }
    // });

    readingList.read = true;
    await readingList.save();

    res.status(200).send("marked as read");
  } else {
    res.status(403).send("users can only update their own reading lists");
  }
});




module.exports = { readingListsRouter };