const express = require("express");
const router = express.Router();
const Model = require("../models/Model");
const mongoose = require("mongoose");

let db = mongoose.connection;

router.get("/", async (req, res) => {
  try {
    let models = await Model.find();
    res.json(models);
  } catch (err) {
    res.json({ message: err });
  }
});

//Create Collection
router.post("/", async (req, res) => {
  const product = req.body.level2.level3.level4;
  const model = {
    title: req.body.title,
    level2: {
      title: req.body.level2.title,
      level3: {
        title: req.body.level2.level3.title,
        level4 = product,
      },
    },
  };
  try {
    const savedModel = await db.collection(req.body.title).insertOne(model);
    res.json(savedModel);
  } catch (err) {
    res.json({ message: err });
  }
});

//get specific product

router.get("/:pooductId", async (req, res) => {
  try {
    let product = await Model.findById(req.params.pooductId);
    res.json(product);
  } catch (err) {
    res.json({ message: err });
  }
});

//delete specific product

router.delete("/:pooductId", async (req, res) => {
  try {
    let removedProduct = await Model.remove({ _id: req.params.pooductId });
    res.json(removedProduct);
  } catch (err) {
    res.json({ message: err });
  }
});

//update specific collection with a new product

router.patch("/", async (req, res) => {
  try {
    const product = req.body.level2.level3.level4;
    const updatedDB = db
      .collection(req.body.title)
      .updateOne(
        { title: req.body.title },
        { $addToSet: { "level2.level3.level4": product } }
      );
    res.json(updatedDB);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
