const mongoose = require("mongoose");

const familySchema = mongoose.Schema({
  family: {
    type: String,
    required: true,
  },
});

const Family = mongoose.model("Family", familySchema);

module.exports = Family;
