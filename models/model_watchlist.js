"use strict";

const mongoose = require("mongoose");

const watchListSchema = new mongoose.Schema({
  movieId: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  media_type: {
    type: String,
    required: true,
    enum: ["m", "s"]
  },
  genre: {
    type: [String],
  },
  rating: {
    type: Number,
  },
  stream: {
    type: [String],
  },
});

exports.WatchList = mongoose.model("Movie", watchListSchema);