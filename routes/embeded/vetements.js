const express = require("express");
const router = express.Router();
const Model = require("../../models/Embeded/Vetements");
const mongoose = require("mongoose");

let db = mongoose.connection;
//get a specific collection
router.get("/:collection", async (req, res) => {
  try {
    let collection = await db
      .collection(req.params.collection)
      .find()
      .stream()
      .on("data", function (doc) {
        res.status(200).json(doc);
      });
  } catch (err) {
    res.json({ message: err });
  }
});

//create a specific collection
router.post("/", async (req, res) => {
  const product = req.body.level2.level3.level4;
  const model = new Model({
    title: req.body.title,
    level2: {
      title: req.body.level2.title,
      level3: {
        title: req.body.level2.level3.title,
        level4: [product],
      },
    },
  });
  try {
    const savedModel = await db.collection(req.body.title).insertOne(model);
    res.json(savedModel);
  } catch (err) {
    res.json({ message: err });
  }
});

//get specific product from a specific collection

router.get("/:collection/:sku", async (req, res) => {
  try {
    let collection = await db
      .collection(req.params.collection)
      .find()
      .stream()
      .on("data", function (doc) {
        let search = doc.level2[0].level3[0].level4.find(
          (product) => product.sku == req.params.sku
        );
        res.status(200).json(search);
      });
  } catch (err) {
    res.json({ message: err });
  }
});

//delete specific product from a specific colection

router.delete("/:collection/:collectionID/:_id", async (req, res) => {
  try {
    await db.collection(req.params.collectionID).updateOne(
      { _id: mongoose.Types.ObjectId(req.params.collectionID) },
      {
        $pull: {
          "level2.0.level3.0.level4": {
            _id: mongoose.Types.ObjectId(req.params._id),
          },
        },
      }
    );
    res.send("product removed from DB!");
  } catch (err) {
    res.json({ message: err });
  }
});

//update specific collection's level

router.patch("/:collectionID/:level", async (req, res) => {
  switch (req.params.level) {
    case "4":
      try {
        const product = req.body.level2.level3.level4;
        const model = new Model({
          title: req.body.title,
          level2: {
            title: req.body.level2.title,
            level3: {
              title: req.body.level2.level3.title,
              level4: [product],
            },
          },
        });
        await db.collection(req.body.title).updateOne(
          { _id: mongoose.Types.ObjectId(req.params.collectionID) },
          {
            $push: {
              "level2.0.level3.0.level4": model.level2[0].level3[0].level4[0],
            },
          }
        );
        res.send("product added to DB!");
      } catch (err) {
        res.json({ message: err });
      }
      break;
    case "3":
      try {
        const level_3 = req.body.level2.level3;
        const model = new Model({
          title: req.body.title,
          level2: {
            title: req.body.level2.title,
            level3: [level_3],
          },
        });
        await db.collection(req.body.title).updateOne(
          { _id: mongoose.Types.ObjectId(req.params.collectionID) },
          {
            $push: {
              "level2.0.level3": model.level2[0].level3[0],
            },
          }
        );
        res.send("level 3 modified!");
      } catch (err) {
        res.json({ message: err });
      }
      break;
    default:
      try {
        const level_2 = req.body.level2;
        const model = new Model({
          title: req.body.title,
          level2: [level_2],
        });
        await db.collection(req.body.title).updateOne(
          { _id: mongoose.Types.ObjectId(req.params.collectionID) },
          {
            $push: {
              level2: model.level2[0],
            },
          }
        );
        res.send("level 2 modified!");
      } catch (err) {
        res.json({ message: err });
      }
  }
});

//add product to a specific level's category

router.patch("/:collectionID/:level/:category", async (req, res) => {
  try {
    const product = req.body.level2.level3.level4;
    const model = new Model({
      title: req.body.title,
      level2: {
        title: req.body.level2.title,
        level3: {
          title: req.body.level2.level3.title,
          level4: [product],
        },
      },
    });
    let add = await db.collection(req.body.title).updateOne(
      {
        _id: mongoose.Types.ObjectId(req.params.collectionID),
        "level2.0.level3.title": req.params.category,
      },
      {
        $push: {
          "level2.0.level3.$.level4": model.level2[0].level3[0].level4[0],
        },
      }
    );
    res.send("product added to DB!");
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
