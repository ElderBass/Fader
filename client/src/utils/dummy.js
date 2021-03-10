//route for home --> res.render index (landing page)
var db = require("../models");
var passport = require("../config/passport");

module.exports = function (app) {
  // Handlebars Routes
  //===============================================
  app.get("/id/:id", function (req, res) {
    let id = req.params.id;
    res.redirect("/user?valid=" + id);
  });

  app.get("/user", function (req, res) {
    res.render("index", { user: req.user.id, userName: req.user.first_name });
  });

  app.get("/", function (req, res) {
    res.render("index");
  });

  app.get("/drumpad", function (req, res) {
    if (req.user) {
      res.render("fullDrumpad", {
        user: req.user.id,
        userName: req.user.first_name,
      });
    } else {
      res.render("fullDrumpad");
    }
  });

  //add get route for rendering the 'view only' artist page
  app.get("/artist/:id", function (req, res) {
    db.Artists.findOne({
      where: {
        id: req.params.id,
      },
      order: [[{ model: db.Blogs }, "createdAt", "DESC"]],
      include: [db.Blogs, db.Extras, db.Mixes],
    }).then((data) => {
      if (data.dataValues.Mixes) {
        for (let i = 0; i < data.dataValues.Mixes.length; i++) {
          if (data.dataValues.Mixes[i].id === 1) {
            data.dataValues.Mixes[i].isActive = true;
          }
        }
      }
      if (req.user) {
        res.render("view-profile", {
          artist: data.dataValues,
          blog: data.dataValues.Blogs,
          extras: data.dataValues.Extras,
          mixes: data.dataValues.Mixes,
          user: req.user.id,
          userName: req.user.first_name,
        });
      } else {
        res.render("view-profile", {
          artist: data.dataValues,
          blog: data.dataValues.Blogs,
          extras: data.dataValues.Extras,
          mixes: data.dataValues.Mixes,
        });
      }
    });
  });

  app.get("/user/:id", function (req, res) {
    db.Artists.findOne({
      where: {
        id: req.params.id,
      },
      order: [[{ model: db.Blogs }, "createdAt", "DESC"]],
      include: [db.Blogs, db.Extras, db.Mixes, db.Follows],
    }).then((data) => {
      res.render("profile", {
        artist: data.dataValues,
        blog: data.dataValues.Blogs,
        extras: data.dataValues.Extras,
        mixes: data.dataValues.Mixes,
        follows: data.dataValues.Follows,
        user: data.dataValues.id,
        userName: req.user.first_name,
      });
    });
  });

  //================================================

  // Find all Artists, or by Genre and Location
  //================================================
  app.get("/artists", function (req, res) {
    db.Artists.findAll({}).then(function (dbArtists) {
      let unpack = (dbArtists) => JSON.parse(JSON.stringify(dbArtists));
      if (req.user) {
        res.render("all-artists", {
          artists: unpack(dbArtists),
          user: req.user.id,
          userName: req.user.first_name,
        });
      } else {
        res.render("all-artists", { artists: unpack(dbArtists) });
      }
    });
  });

  app.get("/genre/:genre", function (req, res) {
    db.Artists.findAll({
      where: {
        genre: req.params.genre,
      },
    }).then(function (dbArtists) {
      let unpack = (dbArtists) => JSON.parse(JSON.stringify(dbArtists));
      if (req.user) {
        res.render("search", {
          artists: unpack(dbArtists),
          user: req.user.id,
          userName: req.user.first_name,
        });
      } else {
        res.render("search", { artists: unpack(dbArtists) });
      }
    });
  });

  app.get("/city/:city", function (req, res) {
    db.Artists.findAll({
      where: {
        city: req.params.city,
      },
    }).then(function (dbArtists) {
      let unpack = (dbArtists) => JSON.parse(JSON.stringify(dbArtists));
      if (req.user) {
        res.render("search", {
          artists: unpack(dbArtists),
          user: req.user.id,
          userName: req.user.first_name,
        });
      } else {
        res.render("search", { artists: unpack(dbArtists) });
      }
    });
  });

  // Login and Signup Routes
  //=============================================
  app.post("/login", passport.authenticate("local"), (req, res) => {
    res.json({
      email: req.user.email,
      id: req.user.id,
    });
  });

  app.post("/api/signup", (req, res) => {
    db.Artists.create({
      email: req.body.email,
      password: req.body.password,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      stage_name: req.body.stage_name,
      genre: req.body.genre,
      city: req.body.city,
    })
      .then((data) => {
        res.redirect(307, "/login");
      })
      .catch((err) => {
        res.status(401).json(err);
      });
  });

  // Route for logging user out
  app.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
  });

  //Blog Post routes
  //==================================================
  app.post("/api/artists/blog", function (req, res) {
    db.Blogs.create({
      title: req.body.title,
      body: req.body.body,
      ArtistId: req.body.ArtistId,
    }).then(function (data) {
      res.json(data);
    });
  });

  app.put("/api/artists/blog/:id", function (req, res) {
    let id = parseInt(req.params.id);

    db.Blogs.update(req.body, {
      where: {
        id: id,
      },
    }).then(function (result) {
      res.send(result);
    });
  });

  app.delete("/api/artists/blog/:id", function (req, res) {
    let id = parseInt(req.params.id);

    db.Blogs.destroy({
      where: {
        id: id,
      },
    }).then(function (result) {
      res.end();
    });
  });

  // Extras Routes
  //==========================================================
  app.post("/api/artists/extras", function (req, res) {
    db.Extras.create({
      bandcamp: req.body.bandcamp,
      twitch: req.body.twitch,
      discogs: req.body.discogs,
      bio: req.body.bio,
      ArtistId: req.body.ArtistId,
    }).then(function (data) {
      res.json(data);
    });
  });

  app.put("/artists/extras", function (req, res) {
    db.Extras.update(req.body, {
      where: {
        ArtistId: req.user.id,
      },
    }).then(function (result) {
      res.send(result);
    });
  });

  //Mixes Routes
  //=================================================
  app.post("/api/artists/mixes", function (req, res) {
    let artistId = parseInt(req.body.ArtistId);
    db.Mixes.create({
      url: req.body.url,
      name: req.body.name,
      ArtistId: artistId,
    }).then(function (result) {
      res.json(result.dataValues.ArtistId);
    });
  });

  app.delete("/delete/mix", function (req, res) {
    db.Mixes.destroy({
      where: {
        url: req.body.url,
      },
    }).then(function (result) {
      res.end();
    });
  });

  //Profile Picture PUT route
  //========================================
  app.put("/artists/image", function (req, res) {
    db.Artists.update(req.body, {
      where: {
        id: req.user.id,
      },
    }).then(function (result) {
      res.send(result);
    });
  });

  //Follows Routes
  //=============================================
  app.post("/api/follows/:id", function (req, res){
    db.Follows.create({
      artist_id: req.params.id,
      name: req.body.name,
      ArtistId: req.user.id
    }).then(function(result){
      console.log("result from follows post route")
      console.log(result)
      //need to create a button to this person's page on profile page
      res.json(result);
    })
  })
};
