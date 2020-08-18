const mongoose = require("mongoose");

const level4Schema = mongoose.Schema({
  sku: {
    type: Number,
    required: true,
  },
  url_key: {
    type: Number,
    required: true,
  },
  fabricant: {
    type: Number,
    required: true,
  },
  type: {
    type: Number,
    required: true,
  },
  nom_jeu_attr: {
    type: Number,
    required: true,
  },
  prix: {
    type: Number,
    required: true,
  },
  prix_special: {
    type: Number,
    required: true,
  },
  visibilite: {
    type: Number,
    required: true,
  },
  statut: {
    type: Number,
    required: true,
  },
  stock_disponible: {
    type: Number,
    required: true,
  },
  disponibilite: {
    type: Number,
    required: true,
  },
});
const level3Schema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  level4: [{ type: mongoose.Schema.Types.ObjectId, ref: "Level4" }],
});
const level2Schema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  level3: [{ type: mongoose.Schema.Types.ObjectId, ref: "Level3" }],
});
const level1Schema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  level2: [{ type: mongoose.Schema.Types.ObjectId, ref: "Level2" }],
});

const Level1 = mongoose.model("Level1", level1Schema);
const Level2 = mongoose.model("Level2", level2Schema);
const Level3 = mongoose.model("Level3", level3Schema);
const Level4 = mongoose.model("Level4", level4Schema);

module.exports = {
  Level1,
  Level2,
  Level3,
  Level4,
};
