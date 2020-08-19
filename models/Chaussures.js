const mongoose = require("mongoose");

const level3Schema = mongoose.Schema({
  produit: {
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
  date_dispo: {
    type: Date,
    required: false,
  },
  cree_le: {
    type: Date,
    required: true,
  },
  mise_a_jour_a: {
    type: Date,
    required: true,
  },
  sites_web: {
    type: String,
    required: true,
  },
});
const level2Schema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  level3: [level3Schema],
});
const level1Schema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  level2: [level2Schema],
});

const Chaussures = mongoose.model("Chaussures", level1Schema);

module.exports = Chaussures;
