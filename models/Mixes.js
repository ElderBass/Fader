const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MixesSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  userId: {
      type: String,
      required: true
  },
  mixArr: {
    type: Array,
    defaultValue: []
  },
});



const Mixes = mongoose.model("Mixes", MixesSchema);

module.exports = Mixes;
