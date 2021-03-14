const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const SALT_WORK_FACTOR = 10;

const Schema = mongoose.Schema;

const ArtistSchema = new Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  stageName: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    defaultValue: "../assets/record.png",
  },
  email: {
    type: String,
    required: true,
    unique: true,
    //   validate: {
    //     isEmail: true
    //   }
  },
  password: {
    type: String,
    required: true,
  },
  connections: {
    type: Array,
    defaultValue: [],
  },

  messages: {
    type: Array,
    defaultValue: [],
  },
  about: {
    type: String,
    defaultValue: "",
  },
  following: {
    type: Array,
    defaultValue: [],
  }
});

ArtistSchema.pre("save", async function save(next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(SALT_WORK_FACTOR);
    this.password = await bcrypt.hash(this.password, salt);
    return next();
  } catch (err) {
    return next(err);
  }
});

ArtistSchema.methods.validatePassword = async function validatePassword(data) {
  return bcrypt.compare(data, this.password);
};

const Artist = mongoose.model("Artist", ArtistSchema);

module.exports = Artist;
