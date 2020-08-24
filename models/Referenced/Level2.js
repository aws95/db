const mongoose = require("mongoose");

const level_2Schema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  level3: [{ type: mongoose.Schema.Types.ObjectId, ref: "Level3" }],
});

const Level_2 = mongoose.model("Level_2", level_2Schema);

module.exports = Level_2;
