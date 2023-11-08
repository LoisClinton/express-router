const express = require("express");
const { Fruit, User } = require("../models/index.js");
const db = require("../db/connection");
const router = express.Router();

router.use(express.json());

//GET /
router.get("/", async (request, response) => {
  const user = await User.findAll();
  response.send(user);
});

// GET /:id
router.get("/:id", async (request, response) => {
  const id = request.params.id;
  const user = await User.findByPk(id);
  response.send(user);
});

// POST
router.post("/", async (request, response) => {
  await User.create({
    name: request.body.name,
    age: request.body.age,
  });

  const user = await User.findAll();
  response.send(user);
});

//PUT
router.put("/:id", async (request, response) => {
  await User.update(
    {
      name: await request.body.name,
      age: await request.body.age,
    },
    {
      where: {
        id: await request.params.id,
      },
    }
  );
  const thisUser = await User.findByPk(request.params.id);
  response.send(thisUser);
});

//DELETE
router.delete("/:id", async (request, response) => {
  await User.destroy({
    where: {
      id: await request.params.id,
    },
  });
  console.log("Item deleted");
  response.send(await User.findAll());
});

module.exports = router;
