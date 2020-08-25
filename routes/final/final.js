const express = require("express");
const router = express.Router();
const Family = require("../../models/Final/Family");
const Gender = require("../../models/Final/Gender");
const Product = require("../../models/Final/Product");
const Category = require("../../models/Final/Category");
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

//create a product
router.post("/:gender/category/family", async (req, res) => {
  const gender = await db
    .collection("gender")
    .find({ gender: req.params.gender })
    .toArray()
    .then((items) => {
      return items;
    })
    .catch((err) => console.error(`Failed to find documents: ${err}`));
  const category = await db
    .collection("category")
    .find({ category: req.params.category })
    .toArray()
    .then((items) => {
      return items;
    })
    .catch((err) => console.error(`Failed to find documents: ${err}`));
  const family = await db
    .collection("family")
    .find({ family: req.params.family })
    .toArray()
    .then((items) => {
      return items;
    })
    .catch((err) => console.error(`Failed to find documents: ${err}`));
  const product = new Product({
    name: req.body.name,
    id: req.body.id,
    sku: req.body.sku,
    url_key: req.body.url_key,
    fabriquant: req.body.fabriquant,
    type: req.body.type,
    nom_jeu_attr: req.body.nom_jeu_attr,
    prix: req.body.prix,
    prix_special: req.body.prix_special,
    visibilite: req.body.visibilite,
    statut: req.body.statut,
    stock_disponible: req.body.stock_disponible,
    disponibilite: req.body.disponibilite,
    gender: gender,
    category: category,
    family: family,
  });
  try {
    const savedModel = await db.collection("products").insertOne(product);
    res.json(savedModel);
  } catch (err) {
    res.json({ message: err });
  }
});
//create a specific collection
router.post("/:collection", async (req, res) => {
  switch (req.params.collection) {
    case "gender":
      const gender = new Gender({
        gender: req.body.gender,
      });
      try {
        const savedModel = await db.collection("gedner").insertOne(gender);
        res.json(savedModel);
      } catch (err) {
        res.json({ message: err });
      }
      break;
    case "family":
      const family = new Family({
        family: req.body.family,
      });
      try {
        const savedModel = await db.collection("family").insertOne(family);
        res.json(savedModel);
      } catch (err) {
        res.json({ message: err });
      }
      break;
    case "category":
      const category = new Category({
        category: req.body.category,
      });
      try {
        const savedModel = await db.collection("category").insertOne(category);
        res.json(savedModel);
      } catch (err) {
        res.json({ message: err });
      }
      break;
    default:
      break;
  }
});

/*
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

*/

module.exports = router;
