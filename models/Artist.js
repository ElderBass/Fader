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
  },
  // mixes: {
  //   type: Array,
  //   defaultValue: []
  // },

});

ArtistSchema.pre("save", function (next) {
  const user = this
  if (this.isModified("password") || this.isNew) {
    bcrypt.genSalt(10, function (saltError, salt) {
      if (saltError) {
        return next(saltError)
      } else {
        bcrypt.hash(user.password, salt, function(hashError, hash) {
          if (hashError) {
            return next(hashError)
          }
          user.password = hash
          next()
        })
      }
    })
  } else {
    return next()
  }
})

ArtistSchema.methods.validatePassword = async function validatePassword(data) {
  return await bcrypt.compare(data, this.password);
};

const Artist = mongoose.model("Artist", ArtistSchema);

module.exports = Artist;
