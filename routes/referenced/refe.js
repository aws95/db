const express = require("express");
const router = express.Router();
const Level_1 = require("../../models/Referenced/Level1");
const Level_2 = require("../../models/Referenced/Level2");
const Level_3 = require("../../models/Referenced/Level3");
const Level_4 = require("../../models/Referenced/Level4");
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
router.post("/:level", async (req, res) => {
  switch (req.params.level) {
    case "4":
      const product = new Level_4({
        name: req.body.name,
        sku: req.body.sku,
        url_key: req.body.url_key,
        fabricant: req.body.fabricant,
        type: req.body.type,
        nom_jeu_attr: req.body.nom_jeu_attr,
        prix: req.body.prix,
        prix_special: req.body.prix_special,
        visibilite: req.body.visibilite,
        statut: req.body.statut,
        stock_disponible: req.body.stock_disponible,
        disponibilite: req.body.disponibilite,
        level_3: req.body.level_3,
      });
      try {
        const savedModel = await db.collection("products").insertOne(product);
        res.json(savedModel);
      } catch (err) {
        res.json({ message: err });
      }
      break;
    case "3":
      /*try {
        const savedModel = await Level_3.create({
          title: req.body.title,
        });
        db
          .collection("products")
          .findOne({ title: req.body.title })
          .populate("level4")
          .exec(function (err, story) {
            if (err) return handleError(err);
            console.log("The author is %s", story.author.name);
            // prints "The author is Ian Fleming"
          }),
          res.json(savedModel);
      } catch (err) {
        res.json({ message: err });
      }*/
      const oo = await db
       res.json(oo);
      break;
    case "2":
      try {
        const savedModel = await Level_2.create({
          title: req.body.title,
          level3: db.collection("Level_3").findOne({ title: req.body.title }),
        });
        res.json(savedModel);
      } catch (err) {
        res.json({ message: err });
      }
      break;
    case "1":
      try {
        const savedModel = await Level_1.create({
          title: req.body.title,
          level2: db.collection("Level_2").findOne({ title: req.body.title }),
        });
        res.json(savedModel);
      } catch (err) {
        res.json({ message: err });
      }
      break;

    default:
      break;
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

module.exports = router;
