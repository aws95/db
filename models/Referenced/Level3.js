const mongoose = require("mongoose");

const level_3Schema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  level4: [{ type: mongoose.Schema.Types.ObjectId, ref: "Level4" }],
});

const Level_3 = mongoose.model("Level3", level_3Schema);

module.exports = Level_3;
