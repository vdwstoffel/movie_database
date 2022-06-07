"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const methodOverride = require("method-override");
const moviedb = require("./public/js/movie_data");
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(methodOverride("_method"));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));


let movieData = [];
//Routes
app.get("/", (req, res) => {
  moviedb.trending().then((movieData) => {
    res.render("index", {
      title: "Movie Database",
      movieData,
      heading: "What's Popular",
    });
  });
});

app.get("/search", (req, res) => {
  res.render("index", {
    title: "Search",
    movieData,
    heading: "Search Results",
    
  });
});

app.post("/search", (req, res) => {
  const title = req.body.titleSearch;
  moviedb.searchMulti(title).then((data) => {
    movieData = data;
    res.redirect("/search");
  });
});

app.get("/movies/top_rated", (req, res) => {
  moviedb.topRatedMovies().then((movieData) => {
    res.render("index", {
      title: "Top Movies",
      movieData,
      heading: "Top Rated Movies",
      
    });
  });
});

app.get("/tv/top_rated", (req, res) => {
  moviedb.topRatedTV().then((movieData) => {
    res.render("index", {
      title: "Top TV",
      movieData,
      heading: "Top Rated TV",
      
    });
  });
});

app.get("/movies/:id", (req, res) => {
  const { id } = req.params;

  // Get the watch Providers
  moviedb.watchProviders(id).then((data) => {
    const providers = [];
    try {
      for (let item of data) {
        providers.push(item);
      }
    } catch {
      //If the movie has no providers just skip
    }

    moviedb.findSimilar(id).then((data) => {
      const similarMovies = [];
      for (let item of data) {
        similarMovies.push(item);
      }

      moviedb.getVideo(id).then((videos) => {
        const videoData = videos[videos.length - 1];

        moviedb.searchMovie(id).then((titleData) => {
          //Check it the title is title or name
          let title;
          if (titleData.title) {
            title = titleData.title;
          } else {
            title = titleData.name;
          }
          res.render("title_info", {
            titleData,
            title,
            providers,
            similarMovies,
            videoData,
            
          });
        });
      });
    });
  });
});

// API's
app.get("/rest/titles", (req, res) => {
  watchList.WatchList.find({}, (err, titles) => {
    if (err) {
      res.send(err);
    } else {
      res.send(titles);
    }
  });
});

app.listen(process.env.PORT || 3000, () => {
  console.log("Server is now live");
});
