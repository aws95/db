const mongoose = require("mongoose");

const level_1Schema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  level2: [{ type: mongoose.Schema.Types.ObjectId, ref: "Level2" }],
});
const Level_1 = mongoose.model("Level_1", level_1Schema);

module.exports = Level_1;
