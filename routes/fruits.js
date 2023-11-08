const express = require("express");
const { Fruit, User } = require("../models/index.js");
const db = require("../db/connection");
const router = express.Router();

router.use(express.json());

//GET /
router.get("/", async (request, response) => {
  const fruit = await Fruit.findAll();
  response.send(fruit);
});

// GET /:id
router.get("/:id", async (request, response) => {
  const id = request.params.id;
  const fruit = await Fruit.findByPk(id);
  response.send(fruit);
});

// POST
router.post("/", async (request, response) => {
  await Fruit.create({
    name: request.body.name,
    color: request.body.color,
  });

  const fruit = await Fruit.findAll();
  response.send(fruit);
});

//PUT
router.put("/:id", async (request, response) => {
  await Fruit.update(
    {
      name: request.body.name,
      color: request.body.color,
    },
    {
      where: {
        id: request.params.id,
      },
    }
  );
  const thisFruit = await Fruit.findByPk(request.params.id);
  response.send(thisFruit);
});

//DELETE
router.delete("/:id", async (request, response) => {
  await Fruit.destroy({
    where: {
      id: request.params.id,
    },
  });
  response.send("Item deleted");
});

module.exports = router;
