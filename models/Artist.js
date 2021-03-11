const mongoose = require("mongoose");

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

const Artist = mongoose.model("Artist", ArtistSchema);


module.exports = Artist;

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