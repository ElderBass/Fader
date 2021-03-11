const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const Schema = mongoose.Schema;

const ArtistSchema = new Schema({
    firstName: {
        type: String,
        required: true
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
        required: true
    },
    city:  {
        type: String,
        required: true
    },
    image: {
      type: String,
      defaultValue: "../assets/record.png"
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
      required: true
    }
});



ArtistSchema.pre('save', function(next) {
  var user = this;

  // only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next();

  // generate a salt
  bcrypt.genSalt(10, function(err, salt) {
      if (err) return next(err);

      // hash the password using our new salt
      bcrypt.hash(user.password, salt, function(err, hash) {
          if (err) return next(err);
          // override the cleartext password with the hashed one
          user.password = hash;
          next();
      });
  });
});
   
ArtistSchema.methods.comparePassword = function(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
      if (err) return cb(err);
      cb(null, isMatch);
  });
};


const Artist = mongoose.model("Artist", ArtistSchema);

module.exports = Artist;


// ArtistSchema.prototype.validPassword = function(password) {
//   return bcrypt.compareSync(password, this.password);
// };

// ArtistSchema.addHook("beforeCreate", function(user) {
//   user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
// });



      // Giving the Artists model a name of type STRING

//     Artists.prototype.validPassword = function(password) {
//       return bcrypt.compareSync(password, this.password);
//     };
  
//     Artists.addHook("beforeCreate", function(user) {
//       user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
//     });

//     Artists.associate = function(models) {
//       // Associating Artists with Blog posts
//       // When an Artist is deleted, also delete any associated Blogs
//       Artists.hasMany(models.Blogs, {
//         onDelete: "cascade"
//       });
//       Artists.hasMany(models.Extras, {
//         onDelete: "cascade"
//       });
//       Artists.hasMany(models.Mixes, {
//         onDelete: "cascade"
//       });
//       Artists.hasMany(models.Follows, {
//         onDelete: "cascade"
//       })
//     };
  
//     return Artists;
//   };