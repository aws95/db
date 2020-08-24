const mongoose = require("mongoose");
const level_4Schema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  sku: {
    type: String,
    required: true,
  },
  url_key: {
    type: String,
    required: true,
  },
  fabricant: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  nom_jeu_attr: {
    type: String,
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
    type: String,
    required: true,
  },
  statut: {
    type: Boolean,
    required: true,
  },
  stock_disponible: {
    type: Number,
    required: true,
  },
  disponibilite: {
    type: Boolean,
    required: true,
  },
  level_3: {
    type: String,
    required: true,
  },
});

const Level_4 = mongoose.model("Level_4", level_4Schema);

module.exports = Level_4;
